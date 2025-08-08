const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const tokenA = await hre.ethers.getContractAt("TokenA", "0x30c15916EbF133F943D8d8Cc5df5bb86ADad192F");
  const balance = await tokenA.balanceOf(signer.address);
  console.log("🪙 Your TokenA Balance:", hre.ethers.formatUnits(balance, 18));
}

main().catch(console.error);
