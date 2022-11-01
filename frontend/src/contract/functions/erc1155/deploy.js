import { ContractFactory } from "ethers";

const tokenContract_1155 = require("../../../contract/artifacts/contracts/TokenContract1155.sol/TokenContract1155.json");

const Moralis = require("moralis-v1");
const { ethers } = require("ethers");

const deploy1155 = async (image, values) => {
  // Deploy Contract
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const factory = new ContractFactory(
    tokenContract_1155.abi,
    tokenContract_1155.bytecode,
    signer
  );
  // If your contract requires constructor args, you can specify them here
  const contract = await factory.deploy(
    values.name,
    values.symbol.toUpperCase()
  );
  let receipt = await contract.deployTransaction.wait();
  // contract details
  const user = await Moralis.User.current();
  const data = image;
  const nftFile = new Moralis.File(data.name, data);
  try {
    await nftFile.saveIPFS();
  } catch (error) {
    // //console.log(error);
    return alert(error.message);
  }
  const nftFilePath = nftFile.ipfs();
  const params = {
    userAddress: user.get("ethAddress").toString(),
    collectionAddress: receipt.contractAddress.toString().toLowerCase(),
    name: values.name.toUpperCase(),
    symbol: values.symbol.toUpperCase(),
    description: values.description,
    collectionType: "erc1155",
    Avatar: nftFilePath,
  };
  // //console.log(params);
  await Moralis.Cloud.run("SM_setContractOwners", params);
  return receipt.contractAddress;
};

export default deploy1155;
