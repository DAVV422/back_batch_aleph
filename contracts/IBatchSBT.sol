// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBatchSBT {
    function mintBatchSBT(address productor, string memory metadataURI) external returns (uint256);
    function addCertification(uint256 batchId, string memory evidenceCID) external;
    function ownerOf(uint256 tokenId) external view returns (address);
}