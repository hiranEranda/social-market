const tokenContract_721 = require("../../../contract/artifacts/contracts/TokenContract721.sol/TokenContract721.json");
const marketContract_721 = require("../../../contract/artifacts/contracts/MarketContract721.sol/MarketContract721.json");
const Moralis = require("moralis-v1");
const { ethers } = require("ethers");

const tokenContractInstance = async (contractAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  // Contract Instance
  const contractInstance = new ethers.Contract(
    contractAddress,
    tokenContract_721.abi,
    signer
  );
  return contractInstance;
};

const marketContractInstance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  // Contract Instance
  const contractInstance = new ethers.Contract(
    process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_721,
    marketContract_721.abi,
    signer
  );

  return contractInstance;
};

const getNameAndSymbol = async (address = null) => {
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721)
    : (contractAddress = address);
  try {
    const contract = await tokenContractInstance(contractAddress);

    const name = await contract.name();
    const symbol = await contract.symbol();
    return { name, symbol };
  } catch (error) {
    // //console.log(error);
  }
};

// mint function
const mintNft = async (metadataUrl, address = null) => {
  // configure the required contract address
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721)
    : (contractAddress = address);

  try {
    const contract = await tokenContractInstance(contractAddress);
    // //console.log(contract);

    var tx = await contract.createItem(metadataUrl);
    let receipt = await tx.wait(2);
    // //console.log(receipt);
    let sumEvent = receipt.events.pop();
    var hexString = sumEvent.args.tokenId._hex;

    var yourNumber = parseInt(hexString, 16);
    // //console.log(yourNumber);
  } catch (error) {
    // //console.log(error);
  }
  // //console.log(yourNumber);
  return yourNumber;
};

//marketplace interactions
const ensureMarketplaceIsApproved = async (tokenId, address = null) => {
  // configure the required contract address
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721)
    : (contractAddress = address);

  const contract = await tokenContractInstance(contractAddress);
  let receipt = null;
  const user = await Moralis.User.current();

  const approvedAddress = await contract.getApproved(tokenId);
  if (
    approvedAddress != process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_721
  ) {
    var tx = await contract.approve(
      process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_721,
      tokenId,
      {
        from: user.get("ethAddress"),
      }
    );
    receipt = await tx.wait(2);
  }
  return receipt;
};

const changePrice = async (uid, tokenId, tokenAddress, newPrice) => {
  const contract = await marketContractInstance();
  //console.log(contract);
  try {
    const response = await contract.changePrice(
      uid,
      tokenId,
      tokenAddress,
      newPrice
    );
    await response.wait(2);
    return { status: true };
  } catch (err) {
    return { status: false, message: err.message };
  }
};

// add item to marketplace
const addItemToMarket = async (
  nftId,
  askingPrice,
  collection,
  nftFileMetadataPath,
  address = null
) => {
  // configure the required contract address
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721)
    : (contractAddress = address);

  const t = await tokenContractInstance(contractAddress);
  // //console.log("get approved: ", await t.getApproved(nftId));

  const user = await Moralis.User.current();
  const contract = await marketContractInstance();

  try {
    const response = await contract.addItemToMarket(
      nftId,
      contractAddress,
      askingPrice.toString(),
      collection,
      nftFileMetadataPath,
      {
        from: user.get("ethAddress"),
        gasLimit: 750000,
      }
    );
    // //console.log(response);

    let receipt = await response.wait(2);

    return receipt;
  } catch (error) {
    // //console.log(error);
    return { status: false, message: error.message };
  }
};

const getCreatorAndRoyalty = async (item) => {
  // console.log(item);
  const params = {
    tokenId: parseInt(item.tokenId),
    tokenAddress: item.tokenAddress,
  };
  try {
    const data = await Moralis.Cloud.run("SM_getCreatorAndRoyalty", params);
    return data[0];
  } catch (error) {
    // //console.log("from getCreatorAndRoyalty");
    // //console.log(error);
  }
};

// buy an item
const buyItem = async (item, authenticate) => {
  const contract = await marketContractInstance();
  const user = await Moralis.User.current();
  if (!user) {
    authenticate();
    return {
      status: false,
      message: "Log in before purchasing",
    };
  }

  let data = await getCreatorAndRoyalty(item);
  // console.log(data);

  if (!user.attributes.accounts.includes(item.ownerOf)) {
    try {
      var overrides = {
        gasLimit: 750000,
        from: user.get("ethAddress"),
        value: item.askingPrice,
      };
      let royaltyPercentage = data.attributes.royalty;
      let royaltyFee = (parseInt(item.askingPrice) * royaltyPercentage) / 100;
      const response = await contract.buyItem(
        item.uid,
        data.attributes.ethAddress,
        royaltyFee.toString(),
        overrides
      );
      await response.wait(2);
      return {
        status: true,
        message: "Transaction successful",
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Transaction failed",
      };
    }
  } else {
    // alert("Can't purchased by the same person who minted the item");
    return {
      status: false,
      message: "Can't purchased by the current owner",
    };
  }
};

const burn = async (address = null, tokenId, params) => {
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721)
    : (contractAddress = address);
  try {
    const contract = await tokenContractInstance(contractAddress);
    //console.log(contract);
    var overrides = {
      gasLimit: 750000,
    };

    const res = await contract.burn(parseInt(tokenId), overrides);
    await res.wait(2);
    await Moralis.Cloud.run("burn721", params);

    return { status: true, message: "1 token burned" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export {
  addItemToMarket,
  ensureMarketplaceIsApproved,
  mintNft,
  buyItem,
  getNameAndSymbol,
  getCreatorAndRoyalty,
  changePrice,
  burn,
};
