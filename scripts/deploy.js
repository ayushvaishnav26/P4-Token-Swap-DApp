const hre = require("hardhat");

async function main() {
  // ✅ Logging start
  console.log("🚀 Starting TokenSwap deploy script...");

  const tokenAAddress = "0x30c15916EbF133F943D8d8Cc5df5bb86ADad192F";
  const tokenBAddress = "0xD08361BB7A1F20c89C4A94c3964Dd399Cd08798D";

  console.log("⏳ Getting contract factory...");
  const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");

  console.log("⏳ Deploying TokenSwap contract...");
  const tokenSwap = await TokenSwap.deploy(tokenAAddress, tokenBAddress);

  console.log("⏳ Waiting for deployment confirmation...");
  await tokenSwap.waitForDeployment();

  console.log("✅ TokenSwap deployed successfully!");
  console.log(`🔗 Contract Address: ${tokenSwap.target}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
