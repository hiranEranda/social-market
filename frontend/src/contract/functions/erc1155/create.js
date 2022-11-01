const Moralis = require("moralis-v1");
const contract = require("./contract");
// create an item functions
const create = async (
  values,
  image,
  collectionAddress,
  addToMarket,
  setLoading1,
  setLoading2,
  setLoading3,
  setLoading4
) => {
  // //console.log(values);
  let list_price = values.price;
  const askingPrice = Moralis.Units.ETH(list_price);
  const data = image;
  const nftFile = new Moralis.File(data.name, data);
  try {
    await nftFile.saveIPFS();
  } catch (error) {
    return { state: false, message: error.message };
  }
  const nftFilePath = nftFile.ipfs();
  const metadata = {
    name: values.title,
    category: values.collection,
    description: values.description,
    image: nftFilePath,
  };
  const nftFileMetadata = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });
  await nftFileMetadata.saveIPFS();
  const nftFileMetadataPath = nftFileMetadata.ipfs();
  // //console.log(nftFileMetadataPath);
  let nftId = null;
  try {
    setLoading1(false);
    nftId = await contract.mintNft(
      values.amount,
      nftFileMetadataPath,
      collectionAddress
    );
    //console.log(nftId);
    const user = await Moralis.User.current();

    const params1 = {
      userAddress: user.get("ethAddress").toString(),
      tokenAddress: collectionAddress.toLowerCase(),
      title: values.title,
      category: values.collection,
      description: values.description,
      nftFilePath: nftFilePath,
      nftId: nftId,
      type: "erc1155",
      royalty: parseFloat(values.royalty),
    };

    if (params1.nftId != undefined || params1.nftId != null) {
      setLoading2(false);
      await Moralis.Cloud.run("SM_setCreators", params1);

      const params2 = {
        ownerOf: user.get("ethAddress").toString(),
        tokenAddress: collectionAddress.toLowerCase(),
        tokenId: nftId.toString(),
        uri: nftFileMetadataPath,
        amount: values.amount.toString(),
        isOnSale: false,
      };
      try {
        await Moralis.Cloud.run("SM_initNftTables1155", params2);
      } catch (error) {
        //console.log(error.message);
        return { state: true, message: error.message };
      }
    }

    try {
      await contract.ensureMarketplaceIsApproved(collectionAddress);
      setLoading3(false);
      if (addToMarket) {
        try {
          const res = await contract.addItemToMarket(
            nftId,
            askingPrice,
            nftFileMetadataPath,
            values.amount,
            collectionAddress
          );
          if (res.status) {
            setLoading4(false);

            return { state: true, message: "Your NFT is created" };
          } else {
            return { state: false, message: res.message };
          }
        } catch (e) {
          return { state: false, message: e.message };
        }
      }
      return { state: true, message: "Your NFT is created" };
    } catch (error) {
      // //console.log(error);
      return { state: false, message: error.message };
    }
  } catch (error) {
    return { state: false, message: error.message };
  }
};

export default create;
