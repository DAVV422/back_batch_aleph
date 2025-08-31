const { run } = require("hardhat");

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log(`Verifying contracts on network: ${network.name} (chainId: ${network.chainId})`);

  // Verificar BatchCertificate (sin argumentos en el constructor)
  console.log("\n🔍 Verifying BatchCertificate...");
  try {
    await run("verify:verify", {
      address: process.env.BATCH_CERTIFICATE_ADDRESS,
      constructorArguments: [],
    });
    console.log("✅ BatchCertificate verified successfully!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ BatchCertificate already verified");
    } else {
      console.log("❌ Error verifying BatchCertificate:", error.message);
    }
  }

  // Verificar TraceabilityRegistry (con argumento en el constructor)
  console.log("\n🔍 Verifying TraceabilityRegistry...");
  try {
    await run("verify:verify", {
      address: process.env.TRACEABILITY_REGISTRY_ADDRESS,
      constructorArguments: [process.env.BATCH_CERTIFICATE_ADDRESS],
    });
    console.log("✅ TraceabilityRegistry verified successfully!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ TraceabilityRegistry already verified");
    } else {
      console.log("❌ Error verifying TraceabilityRegistry:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification failed:", error);
    process.exit(1);
  });