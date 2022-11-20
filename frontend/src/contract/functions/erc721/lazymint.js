const Moralis = require("moralis-v1");
const contract = require("./contract");
// create an item functions

const lazyMint = async (values, nftFileMetadataPath, collectionAddress, askingPrice, id, owner, isCustomToken) => {
  try {
    var nftId = await contract.lazyMintNft(
      nftFileMetadataPath,
      collectionAddress.toString().toLowerCase(),
      owner,
      askingPrice,
      isCustomToken
    );
    const params = {
      userAddress: values.owner.toLowerCase().toString(),
      tokenAddress: values.tokenAddress.toLowerCase().toString(),
      title: values.name,
      category: values.category,
      description: values.description,
      nftFilePath: nftFileMetadataPath,
      nftId: nftId,
      // createdId: ids.createdId,
      askingPrice: values.askingPrice,
      type: "erc721",
      royalty: parseFloat(values.royalty),
      isLazy: values.isLazy,
      isCustomToken: isCustomToken,
    };
    console.log(params);

    const user = await Moralis.User.current();

    var params2 = {
      ownerOf: user.get("ethAddress").toString(),
      tokenAddress: collectionAddress.toString().toLowerCase(),
      tokenId: nftId.toString(),
      // createdId: ids.createdId.toString(),
      uri: nftFileMetadataPath,
      askingPrice: askingPrice,
      isLazy: true,
      isCustomToken: isCustomToken,
      creator: values.owner.toLowerCase().toString(),
    };

    try {
      await Moralis.Cloud.run("SM_setCreators", params);
      await Moralis.Cloud.run("SM_initNftTables721", params2);
    } catch (error) {
      console.log(error.message);
      return { state: false, message: error.message };
    }

    try {
      const query = new Moralis.Query("SM_NFTLazy721");
      query.equalTo("objectId", id);
      const obj = await query.first();
      obj.set("isMinted", true);
      await obj.save();
    } catch (error) {
      console.log(error.message);
      return { state: false, message: error.message };
    }
    return { state: true, message: "Minting complete" };
  } catch (error) {
    console.log(error);
    return { state: false, message: "Transaction failed" };
  }
};

export default lazyMint;
