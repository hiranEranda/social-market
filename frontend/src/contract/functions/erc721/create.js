const Moralis = require("moralis-v1");
const contract = require("./contract");
// create an item functions
const create = async (
  values,
  image,
  collectionAddress,
  addToMarket,
  isLazy,
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

  try {
    setLoading1(false);
    //console.log(collectionAddress);

    var ids = await contract.mintNft(
      nftFileMetadataPath,
      askingPrice.toString(),
      isLazy,
      collectionAddress
    );
    //console.log(nftId);
    const user = await Moralis.User.current();
    const params = {
      userAddress: user.get("ethAddress").toString(),
      tokenAddress: collectionAddress.toLowerCase(),
      title: values.title,
      category: values.collection,
      description: values.description,
      nftFilePath: nftFilePath,
      nftId: ids.nftId,
      createdId: ids.createdId,
      askingPrice: askingPrice,
      type: "erc721",
      royalty: parseFloat(values.royalty),
      isLazy: isLazy,
    };
    //console.log(params);
    if (params.nftId !== undefined) {
      setLoading2(false);

      await Moralis.Cloud.run("SM_setCreators", params);
      if (ids.nftId === null) {
        var params2 = {
          ownerOf: user.get("ethAddress").toString(),
          tokenAddress: collectionAddress.toLowerCase(),
          tokenId: ids.nftId,
          createdId: ids.createdId.toString(),
          uri: nftFileMetadataPath,
          isLazy: isLazy,
          askingPrice: askingPrice,
        };
      } else {
        var params2 = {
          ownerOf: user.get("ethAddress").toString(),
          tokenAddress: collectionAddress.toLowerCase(),
          tokenId: ids.nftId.toString(),
          createdId: ids.createdId.toString(),
          uri: nftFileMetadataPath,
          isLazy: isLazy,
          askingPrice: askingPrice,
        };
      }
      try {
        if (!isLazy) {
          await Moralis.Cloud.run("SM_initNftTables721", params2);
        } else {
          await Moralis.Cloud.run("SM_initLazyNftTables721", params2);
        }
      } catch (error) {
        console.log(error.message);
        return { state: true, message: error.message };
      }
    }

    try {
      if (!isLazy) {
        await contract.ensureMarketplaceIsApproved(
          ids.nftId,
          collectionAddress
        );
      }
      setLoading3(false);

      if (addToMarket && !isLazy) {
        try {
          const res = await contract.addItemToMarket(
            ids.nftId,
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
          console.log(e);

          return { state: false, message: e.message };
        }
      } else {
        setLoading4(false);
      }
      return { state: true, message: "Your NFT is created" };
    } catch (error) {
      console.log(error);
      return { state: false, message: error.message };
    }
  } catch (error) {
    console.log(error);
    return { state: false, message: error.message };
  }
};

export default create;
