const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.LISK_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ABIs de tus contratos (exporta los JSON de compilación Hardhat/Foundry)
const batchAbi = require("./../abi/BatchCertificate.json");
const traceAbi = require("./../abi/TraceabilityRegistry.json");

// Direcciones de contratos desplegados
const batchAddress = process.env.BATCH_CONTRACT;
const traceAddress = process.env.TRACE_CONTRACT;

const batchContract = new ethers.Contract(batchAddress, batchAbi, wallet);
const traceContract = new ethers.Contract(traceAddress, traceAbi, wallet);

module.exports = { provider, wallet, batchContract, traceContract };
