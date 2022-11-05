const Moralis = require("moralis-v1");
const contract = require("./contract");
// create an item functions

const lazyMint = async (
  nftFileMetadataPath,
  collectionAddress,
  askingPrice,
  id,
  owner,
  isCustomToken
) => {
  //   console.log(collectionAddress);

  // return 0;
  try {
    var nftId = await contract.lazyMintNft(
      nftFileMetadataPath,
      collectionAddress.toString().toLowerCase(),
      owner,
      askingPrice,
      isCustomToken
    );
    const user = await Moralis.User.current();

    var params2 = {
      ownerOf: user.get("ethAddress").toString(),
      tokenAddress: collectionAddress.toString().toLowerCase(),
      tokenId: nftId.toString(),
      // createdId: ids.createdId.toString(),
      uri: nftFileMetadataPath,
      askingPrice: askingPrice,
    };

    try {
      await Moralis.Cloud.run("SM_initNftTables721", params2);
    } catch (error) {
      console.log(error.message);
      return { state: true, message: error.message };
    }

    try {
      const query = new Moralis.Query("SM_NFTLazy721");
      query.equalTo("objectId", id);
      const obj = await query.first();
      obj.set("isMinted", true);
      await obj.save();
    } catch (error) {
      console.log(error.message);
      return { state: true, message: error.message };
    }
  } catch (error) {
    console.log(error);
  }
};

export default lazyMint;
