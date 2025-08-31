// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IBatchSBT.sol"; // Importamos la interfaz

contract TraceabilityRegistry is Ownable {
    IBatchSBT public batchSBT;

    struct TraceEvent {
        uint8 etapa;
        bytes32 eventHash;
        uint256 timestamp;
        string evidenceCID;
    }

    mapping(uint256 => TraceEvent[]) private _events;

    event BatchRegistered(uint256 indexed batchId, address indexed productor, string metadataURI);
    event EventAdded(uint256 indexed batchId, uint8 etapa, bytes32 eventHash, uint256 timestamp, string evidenceCID);

    // ✅ Constructor corregido
    constructor(address batchSBTAddress) Ownable(msg.sender) {
        batchSBT = IBatchSBT(batchSBTAddress);
    }

    function registerBatch(address productor, string memory metadataURI) external onlyOwner returns (uint256) {
        uint256 batchId = batchSBT.mintBatchSBT(productor, metadataURI);
        emit BatchRegistered(batchId, productor, metadataURI);
        return batchId;
    }

    function addEvent(uint256 batchId, uint8 etapa, bytes32 eventHash, uint256 timestamp, string memory evidenceCID) external onlyOwner {
        require(batchSBT.ownerOf(batchId) != address(0), "Batch does not exist");
        _events[batchId].push(TraceEvent(etapa, eventHash, timestamp, evidenceCID));
        batchSBT.addCertification(batchId, evidenceCID);
        emit EventAdded(batchId, etapa, eventHash, timestamp, evidenceCID);
    }

    function getEvents(uint256 batchId) external view returns (TraceEvent[] memory) {
        return _events[batchId];
    }

    function setBatchSBT(address _addr) external onlyOwner {
        batchSBT = IBatchSBT(_addr);
    }
}