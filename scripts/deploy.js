const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("🚀 Deploying to Lisk network");
  console.log("Deployer address:", deployer.address);
  
  // Obtener balance corregido para ethers v6
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  // 1. Deploy BatchCertificate
  console.log("\n📦 1. Deploying BatchCertificate...");
  const BatchCertificate = await ethers.getContractFactory("BatchCertificate");
  const batchCertificate = await BatchCertificate.deploy();
  
  console.log("Transaction hash:", batchCertificate.deploymentTransaction().hash);
  await batchCertificate.waitForDeployment();
  const batchCertificateAddress = await batchCertificate.getAddress();
  console.log("✅ BatchCertificate deployed to:", batchCertificateAddress);

  // 2. Deploy TraceabilityRegistry
  console.log("\n📦 2. Deploying TraceabilityRegistry...");
  const TraceabilityRegistry = await ethers.getContractFactory("TraceabilityRegistry");
  const traceabilityRegistry = await TraceabilityRegistry.deploy(batchCertificateAddress);
  
  console.log("Transaction hash:", traceabilityRegistry.deploymentTransaction().hash);
  await traceabilityRegistry.waitForDeployment();
  const traceabilityRegistryAddress = await traceabilityRegistry.getAddress();
  console.log("✅ TraceabilityRegistry deployed to:", traceabilityRegistryAddress);

  // 3. Configurar permisos (opcional)
  console.log("\n⚙️ 3. Configuring permissions...");
  
  // Si quieres que TraceabilityRegistry pueda mintear tokens
  // const transferTx = await batchCertificate.transferOwnership(traceabilityRegistryAddress);
  // await transferTx.wait();
  // console.log("✅ Ownership transferred to TraceabilityRegistry");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("=========================================");
  console.log("BatchCertificate:", batchCertificateAddress);
  console.log("TraceabilityRegistry:", traceabilityRegistryAddress);
  console.log("=========================================");

  // Guardar addresses en un archivo para referencia
  const fs = require('fs');
  const network = await ethers.provider.getNetwork();
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId,
    timestamp: new Date().toISOString(),
    contracts: {
      BatchCertificate: batchCertificateAddress,
      TraceabilityRegistry: traceabilityRegistryAddress
    },
    deployer: deployer.address
  };

  const filename = `deployment-${network.name}-${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));

  console.log("\n📄 Deployment info saved to", filename);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });