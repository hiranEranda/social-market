const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const TokenContract721 = await hre.ethers.getContractFactory(
    "TokenContract721"
  );
  const tokenContract721 = await TokenContract721.deploy(
    "CreativeVault 721",
    "VLT"
  );
  await tokenContract721.deployed();
  console.log("tokenContract721 deployed to:", tokenContract721.address);
  // We get the contract to deploy
  const TokenContract1155 = await hre.ethers.getContractFactory(
    "TokenContract1155"
  );
  const tokenContract1155 = await TokenContract1155.deploy(
    "CreativeVault 1155",
    "VLT"
  );
  await tokenContract1155.deployed();
  console.log("tokenContract1155 deployed to:", tokenContract1155.address);
  // We get the contract to deploy
  const MarketContract721 = await hre.ethers.getContractFactory(
    "MarketContract721"
  );
  const marketContract721 = await MarketContract721.deploy();
  await marketContract721.deployed();
  console.log("marketContract721 deployed to:", marketContract721.address);
  // We get the contract to deploy
  const MarketContract1155 = await hre.ethers.getContractFactory(
    "MarketContract1155"
  );
  const marketContract1155 = await MarketContract1155.deploy();
  await marketContract1155.deployed();
  console.log("marketContract1155 deployed to:", marketContract1155.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
