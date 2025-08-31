// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BatchCertificate is ERC721URIStorage, Ownable {
    struct Batch {
        address productor;
        string metadataURI;
        string[] certifications; // CIDs de evidencia de certificación
    }

    uint256 private _nextBatchId = 1;
    mapping(uint256 => Batch) private batches;

    event BatchMinted(uint256 indexed batchId, address indexed productor, string metadataURI);
    event CertificationAdded(uint256 indexed batchId, string evidenceCID);

    constructor() ERC721("BatchSoulbound", "BSB") Ownable(msg.sender) {}

    // 🔒 Mint batch solo owner
    function mintBatchSBT(address productor, string memory metadataURI) external onlyOwner returns (uint256) {
        uint256 batchId = _nextBatchId++;
        _mint(productor, batchId);
        _setTokenURI(batchId, metadataURI);

        batches[batchId] = Batch({
            productor: productor,
            metadataURI: metadataURI,
            certifications: new string[](0)
        });

        emit BatchMinted(batchId, productor, metadataURI);
        return batchId;
    }

    // 🔒 Agregar certificación/evidencia solo owner
    function addCertification(uint256 batchId, string memory evidenceCID) external onlyOwner {
        require(ownerOf(batchId) != address(0), "Batch does not exist");
        batches[batchId].certifications.push(evidenceCID);
        emit CertificationAdded(batchId, evidenceCID);
    }

    function getBatchMetadata(uint256 batchId) external view returns (string memory) {
        require(ownerOf(batchId) != address(0), "Batch does not exist");
        return batches[batchId].metadataURI;
    }

    function getCertifications(uint256 batchId) external view returns (string[] memory) {
        require(ownerOf(batchId) != address(0), "Batch does not exist");
        return batches[batchId].certifications;
    }

}