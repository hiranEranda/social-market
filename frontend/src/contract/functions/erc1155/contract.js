const tokenContract_1155 = require("../../../contract/artifacts/contracts/TokenContract1155.sol/TokenContract1155.json");
const marketContract_1155 = require("../../../contract/artifacts/contracts/MarketContract1155.sol/MarketContract1155.json");

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
  const contractInstance = new ethers.Contract(contractAddress, tokenContract_1155.abi, signer);
  return contractInstance;
};

const marketContractInstance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  // Contract Instance
  const contractInstance = new ethers.Contract(
    process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_1155,
    marketContract_1155.abi,
    signer
  );

  return contractInstance;
};

// mint function
const mintNft = async (amount, metadataUrl, address = null) => {
  // //console.log("mint 1155");
  // configure the required contract address
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_1155)
    : (contractAddress = address);

  try {
    const contract = await tokenContractInstance(contractAddress);

    const user = await Moralis.User.current();
    var tx = await contract.mintNft(user.get("ethAddress"), amount, metadataUrl);
    let receipt = await tx.wait(2);
    let sumEvent = receipt.events.pop();
    var hexString = sumEvent.args.id._hex;
    var yourNumber = parseInt(hexString, 16);
  } catch (error) {
    // //console.log(error);
  }
  // //console.log(yourNumber);
  return yourNumber;
};

// lazy mint function
const lazyMint = async (askingPrice, creator, metadataUrl, isCustomToken, address = null) => {
  // //console.log("mint 1155");
  // configure the required contract address
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_1155)
    : (contractAddress = address);

  try {
    const contract = await tokenContractInstance(contractAddress);

    const user = await Moralis.User.current();

    var overrides = {
      gasLimit: 750000,
      from: user.get("ethAddress"),
      value: askingPrice,
    };

    if (!isCustomToken) {
      var tx = await contract.lazyMint(user.get("ethAddress"), metadataUrl, askingPrice, creator, overrides);
      let receipt = await tx.wait(2);
      let sumEvent = receipt.events.pop();
      var hexString = sumEvent.args.id._hex;
      var yourNumber = parseInt(hexString, 16);
    } else {
      let erc20 = await erc20Contract();

      let ttx = await erc20.approve(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_1155, askingPrice);
      let res = await ttx.wait(2);

      var tx = await contract.lazyMintCustom(
        user.get("ethAddress"),
        metadataUrl,
        askingPrice,
        creator,
        process.env.REACT_APP_PAYTOKEN_CONTRACT_ADDRESS,
        {
          gasLimit: 750000,
          from: user.get("ethAddress"),
        }
      );
      let receipt = await tx.wait(2);
      let sumEvent = receipt.events.pop();
      var hexString = sumEvent.args.id._hex;
      var yourNumber = parseInt(hexString, 16);
    }
  } catch (error) {
    // //console.log(error);
  }
  console.log(yourNumber);
  return yourNumber;
};

//marketplace interactions
const ensureMarketplaceIsApproved = async (address = null) => {
  // configure the required contract address
  let contractAddress = null;
  address === null
    ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_1155)
    : (contractAddress = address);
  console.log(contractAddress);
  const contract = await tokenContractInstance(contractAddress);
  try {
    const user = await Moralis.User.current();
    //console.log("approvalChecking");
    const isApproved = await contract.isApprovedForAll(
      user.get("ethAddress"),
      process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_1155
    );

    if (!isApproved) {
      const receipt = await contract.setApprovalForAll(process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_1155, true);
      return receipt;
    }
  } catch (error) {
    // //console.log(error.message);
  }
};

// add item to marketplace
const addItemToMarket = async (nftId, askingPrice, metadataUrl, amount, address = null) => {
  // configure the required contract address
  let contractAddress = null;
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);

  const user = await Moralis.User.current();
  const contract = await marketContractInstance();

  try {
    const response = await contract.addItemToMarket(nftId, contractAddress, askingPrice, metadataUrl, amount, {
      from: user.get("ethAddress"),
      gasLimit: 750000,
    });

    let receipt = await response.wait(2);

    return receipt;
  } catch (error) {
    //console.log(error);
    return { status: false, message: error.message };
  }
};

const getCreatorAndRoyalty = async (item) => {
  //console.log(item);
  const user = await Moralis.User.current();

  const params = {
    tokenId: parseInt(item.tokenId),
    tokenAddress: item.tokenAddress,
  };
  try {
    const data = await Moralis.Cloud.run("SM_getCreatorAndRoyalty", params);

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

const getBalance = async (address = null, owner, tokenId) => {
  let contractAddress = null;
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);
  try {
    const contract = await tokenContractInstance(contractAddress);
    const totalSupply = await contract.totalSupply(tokenId);
    const amount = await contract.balanceOf(owner, tokenId);

    return {
      amount: parseInt(amount._hex, 16),
      totalSupply: parseInt(totalSupply._hex, 16),
    };
  } catch (error) {
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
  if (!user.attributes.accounts.includes(item.ownerOf)) {
    try {
      var overrides = {
        gasLimit: 750000,
        from: user.get("ethAddress"),
        value: item.askingPrice,
      };

      let royaltyPercentage = data.attributes.royalty;
      let royaltyFee = (parseInt(item.askingPrice) * royaltyPercentage) / 100;

      if (!item.isCustomToken) {
        console.log("regular");
        var response = await contract.buyItem(item.uid, 1, royaltyFee, data.attributes.ethAddress, overrides);
      } else {
        console.log("erc20Contract");

        let erc20 = await erc20Contract();

        let ttx = await erc20.approve(
          process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS_1155,
          item.askingPrice.toString()
        );
        let res = await ttx.wait(2);

        var response = await contract.buyItemWithTokens(
          item.uid,
          1,
          royaltyFee.toString(),
          data.attributes.ethAddress,
          process.env.REACT_APP_PAYTOKEN_CONTRACT_ADDRESS,
          {
            gasLimit: 750000,
            from: user.get("ethAddress"),
          }
        );
      }
      console.log(response);

      const receipt = await response.wait(2);
      if (receipt.status === 1) {
        console.log("after");
        const buyer = await getBalance(item.tokenAddress, user.get("ethAddress"), item.tokenId);
        //console.log(buyer);
        const seller = await getBalance(item.tokenAddress, item.ownerOf, item.tokenId);
        //console.log(seller);

        const params = {
          tokenAddress: item.tokenAddress,
          tokenUri: item.tokenUri,
          tokenId: item.tokenId,
          buyer: user.get("ethAddress"),
          seller: item.ownerOf,
          uid: item.uid,
          amountOfBuyer: buyer.amount.toString(),
          amountOfSeller: seller.amount.toString(),
        };

        await Moralis.Cloud.run("updateData", params);

        // check if the buyer already have this token and has put on sale
        const query3 = new Moralis.Query("SM_Bought1155");
        query3.equalTo("tokenId", item.tokenId);
        query3.equalTo("tokenAddress", item.tokenAddress);
        query3.equalTo("owner", user.get("ethAddress").toLowerCase());
        const obj3 = await query3.first();

        // check if the buyer already have this token and hasn't put on sale
        const query4 = new Moralis.Query("SM_Bought1155");
        query4.equalTo("tokenId", item.tokenId);
        query4.equalTo("tokenAddress", item.tokenAddress);
        query4.equalTo("owner", user.get("ethAddress").toLowerCase());
        query4.equalTo("isAddedToMarket", false);
        query4.notEqualTo("isSold", true);
        const obj4 = await query4.first();

        // init sellersObject
        const userQuery = new Moralis.Query(Moralis.User);
        userQuery.equalTo("ethAddress", user.get("ethAddress").toLowerCase());
        const userObject = await userQuery.first({ useMasterKey: true });

        if (!obj3) {
          // create new record in SM_Bought1155 table for buyer
          // create new record in SM_Bought1155 table for buyer
          const SM_Bought1155 = Moralis.Object.extend("SM_Bought1155");
          const SM_bought1155 = new SM_Bought1155();

          SM_bought1155.set("tokenId", item.tokenId);
          SM_bought1155.set("tokenAddress", item.tokenAddress);
          SM_bought1155.set("isCustomToken", item.isCustomToken);
          SM_bought1155.set("owner", user.get("ethAddress").toLowerCase());
          SM_bought1155.set("ownerObject", userObject);
          SM_bought1155.set("amount", buyer.amount.toString());
          SM_bought1155.set("uri", item.tokenUri);
          SM_bought1155.set("isAddedToMarket", false);
          SM_bought1155.set("uid", item.uid);
          await SM_bought1155.save();
        } else if (obj4) {
          obj4.set("amount", buyer.amount.toString());
          await obj4.save();
        } else {
          // create new record in NFTOwners1155 table for buyer
          const SM_Bought1155 = Moralis.Object.extend("SM_Bought1155");
          const SM_bought1155 = new SM_Bought1155();

          SM_bought1155.set("tokenId", item.tokenId);
          SM_bought1155.set("isCustomToken", item.isCustomToken);
          SM_bought1155.set("tokenAddress", item.tokenAddress);
          SM_bought1155.set("owner", user.get("ethAddress").toLowerCase());
          SM_bought1155.set("ownerObject", userObject);
          SM_bought1155.set("amount", buyer.amount.toString());
          SM_bought1155.set("uri", item.tokenUri);
          SM_bought1155.set("isAddedToMarket", false);
          SM_bought1155.set("uid", item.uid);
          await SM_bought1155.save();
        }

        return {
          status: true,
          message: "Transaction successful. Wait until transaction is mined..",
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

const burn = async (address = null, tokenId, params) => {
  let contractAddress = null;
  address === null ? (contractAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS_721) : (contractAddress = address);

  const contract = await tokenContractInstance(contractAddress);
  //  //console.log(contract);
  var overrides = {
    gasLimit: 750000,
  };

  const user = await Moralis.User.current();
  try {
    const res = await contract.burn(user.get("ethAddress").toLowerCase(), parseInt(tokenId), 1, overrides);

    await res.wait(2);

    await Moralis.Cloud.run("burn1155", params);

    return { status: true, message: "1 token burned" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export {
  addItemToMarket,
  ensureMarketplaceIsApproved,
  mintNft,
  lazyMint,
  buyItem,
  getNameAndSymbol,
  getBalance,
  changePrice,
  burn,
};
