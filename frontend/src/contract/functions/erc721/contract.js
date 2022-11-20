const tokenContract_721 = require("../../../contract/artifacts/contracts/TokenContract721.sol/TokenContract721.json");
const marketContract_721 = require("../../../contract/artifacts/contracts/MarketContract721.sol/MarketContract721.json");
const Moralis = require("moralis-v1");
const { ethers } = require("ethers");

let erc20abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const erc20Contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  // Contract Instance
  const erc20Contract = new ethers.Contract(process.env.REACT_APP_PAYTOKEN_CONTRACT_ADDRESS, erc20abi, signer);
  return erc20Contract;
};

const tokenContractInstance = async (contractAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  // Contract Instance
  const contractInstance = new ethers.Contract(contractAddress, tokenContract_721.abi, signer);
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
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);
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
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);

  try {
    const contract = await tokenContractInstance(contractAddress);

    var tx = await contract.directMint(metadataUrl);
    let receipt = await tx.wait(2);
    let sumEvent = receipt.events.pop();
    var hexString = sumEvent.args.tokenId._hex;
    var nftId = parseInt(hexString, 16);
    console.log("nftId: ", nftId);
  } catch (error) {
    console.log(error);
  }
  return nftId;
};

// lazy mint function
const lazyMintNft = async (metadataUrl, address = null, creator, askingPrice, isCustomToken) => {
  // configure the required contract address
  let contractAddress = null;
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);

  try {
    const contract = await tokenContractInstance(contractAddress);
    console.log(contract);
    const user = await Moralis.User.current();

    var overrides = {
      gasLimit: 750000,
      from: user.get("ethAddress"),
      value: askingPrice,
    };

    if (!isCustomToken) {
      var tx = await contract.lazyMint(creator, askingPrice, metadataUrl, overrides);
      let receipt = await tx.wait(2);
      let sumEvent = receipt.events.pop();
      var hexString = sumEvent.args.tokenId._hex;
      var nftId = parseInt(hexString, 16);
      console.log("nftId: ", nftId);
    } else {
      let erc20 = await erc20Contract();

      let ttx = await erc20.approve(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721, askingPrice);
      let res = await ttx.wait(2);

      var tx = await contract.lazyMintCustom(
        creator,
        askingPrice,
        metadataUrl,
        process.env.REACT_APP_PAYTOKEN_CONTRACT_ADDRESS,
        {
          gasLimit: 750000,
          from: user.get("ethAddress"),
        }
      );
      let receipt = await tx.wait(2);
      let sumEvent = receipt.events.pop();
      var hexString = sumEvent.args.tokenId._hex;
      var nftId = parseInt(hexString, 16);
      console.log("nftId: ", nftId);
    }
  } catch (error) {
    console.log(error);
  }
  return nftId;
};

//marketplace interactions
const ensureMarketplaceIsApproved = async (tokenId, address = null) => {
  // configure the required contract address
  let contractAddress = null;
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);

  try {
    const contract = await tokenContractInstance(contractAddress);
    console.log(contract);
    let receipt = null;
    const user = await Moralis.User.current();
    try {
      var approvedAddress = await contract.getApproved(tokenId.toString());
    } catch (error) {
      console.log(error);
    }

    if (approvedAddress != process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_721) {
      try {
        console.log("methana");
        var tx = await contract.approve(process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_721, tokenId, {
          from: user.get("ethAddress"),
        });
      } catch (error) {
        console.log(error);
      }
      console.log(receipt);

      // receipt = await tx.wait(2);
    }
    return receipt;
  } catch (error) {
    console.log(error);
  }
};

const changePrice = async (uid, tokenId, tokenAddress, newPrice) => {
  const contract = await marketContractInstance();
  //console.log(contract);
  try {
    const response = await contract.changePrice(uid, tokenId, tokenAddress, newPrice);
    await response.wait(2);
    return { status: true };
  } catch (err) {
    return { status: false, message: err.message };
  }
};

// add item to marketplace
const addItemToMarket = async (nftId, askingPrice, collection, nftFileMetadataPath, address = null) => {
  // configure the required contract address
  let contractAddress = null;
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);

  const t = await tokenContractInstance(contractAddress);
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
  const user = await Moralis.User.current();

  const params = {
    tokenId: parseInt(item.tokenId),
    tokenAddress: item.tokenAddress,
  };
  try {
    const data = await Moralis.Cloud.run("SM_getCreatorAndRoyalty", params);
    console.log(data);
    if (data.length === 0) {
      let royalty = {
        attributes: {
          royalty: 0,
          ethAddress: user.get("ethAddress"),
        },
      };
      return royalty;
    } else {
      return data[0];
    }
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
  console.log(data.attributes.royalty);

  if (!user.attributes.accounts.includes(item.ownerOf)) {
    try {
      let royaltyPercentage = data.attributes.royalty;
      let royaltyFee = (parseInt(item.askingPrice) * royaltyPercentage) / 100;
      console.log(royaltyFee);

      if (!item.isCustomToken) {
        console.log("eth");
        var overrides = {
          gasLimit: 750000,
          from: user.get("ethAddress"),
          value: item.askingPrice,
        };
        const response = await contract.buyItem(item.uid, data.attributes.ethAddress, royaltyFee.toString(), overrides);
        await response.wait(2);
        return {
          status: true,
          message: "Transaction successful",
        };
      } else {
        console.log("smkt");
        var overrides = {
          gasLimit: 750000,
          from: user.get("ethAddress"),
        };
        let erc20 = await erc20Contract();

        let ttx = await erc20.approve(process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_721, item.askingPrice);
        let res = await ttx.wait(2);

        const response = await contract.buyItemWithTokens(
          item.uid,
          data.attributes.ethAddress,
          royaltyFee.toString(),
          process.env.REACT_APP_PAYTOKEN_CONTRACT_ADDRESS,
          overrides
        );
        await response.wait(2);
        return {
          status: true,
          message: "Transaction successful",
        };
      }
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
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);
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
  lazyMintNft,
  buyItem,
  getNameAndSymbol,
  getCreatorAndRoyalty,
  changePrice,
  burn,
};
