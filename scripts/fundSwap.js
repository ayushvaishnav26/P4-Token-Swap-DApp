const hre = require("hardhat");

async function main() {
  const tokenBAddress = "0xD08361BB7A1F20c89C4A94c3964Dd399Cd08798D"; // ✅ TKB
  const tokenSwapAddress = "0xf7CdDC7416B213B1B24e1ECA0D6C693eD292c2A7"; // ✅ Your deployed TokenSwap

  const [deployer] = await hre.ethers.getSigners();

  const TokenB = await hre.ethers.getContractAt("TokenB", tokenBAddress);
  const tx = await TokenB.transfer(tokenSwapAddress, hre.ethers.parseUnits("1000", 18));
  await tx.wait();

  console.log("✅ TokenB funded to TokenSwap contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
