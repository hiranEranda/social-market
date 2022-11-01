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
  let collection = values.collection;
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
  let nftId = null;
  try {
    setLoading1(false);
    //console.log(collectionAddress);

    nftId = await contract.mintNft(nftFileMetadataPath, collectionAddress);
    //console.log(nftId);
    const user = await Moralis.User.current();
    const params = {
      userAddress: user.get("ethAddress").toString(),
      tokenAddress: collectionAddress.toLowerCase(),
      title: values.title,
      category: values.collection,
      description: values.description,
      nftFilePath: nftFilePath,
      nftId: nftId,
      type: "erc721",
      royalty: parseFloat(values.royalty),
    };
    //console.log(params);
    if (params.nftId != undefined || params.nftId != null) {
      setLoading2(false);

      await Moralis.Cloud.run("SM_setCreators", params);
      const params2 = {
        ownerOf: user.get("ethAddress").toString(),
        tokenAddress: collectionAddress.toLowerCase(),
        tokenId: nftId.toString(),
        uri: nftFileMetadataPath,
      };
      try {
        await Moralis.Cloud.run("SM_initNftTables721", params2);
      } catch (error) {
        //console.log(error.message);
        return { state: true, message: error.message };
      }
    }

    try {
      await contract.ensureMarketplaceIsApproved(nftId, collectionAddress);
      setLoading3(false);

      if (addToMarket) {
        try {
          const res = await contract.addItemToMarket(
            nftId,
            askingPrice,
            collection,
            nftFileMetadataPath,
            collectionAddress
          );
          if (res.status) {
            setLoading4(false);
            // return { state: true, message: "Your NFT is created" };
          } else {
            return { state: false, message: res.message };
          }
        } catch (e) {
          return { state: false, message: e.message };
        }
      }
      return { state: true, message: "Your NFT is created" };
    } catch (error) {
      //console.log(error);
      return { state: false, message: error.message };
    }
  } catch (error) {
    //console.log(error);
    return { state: false, message: error.message };
  }
};

export default create;
