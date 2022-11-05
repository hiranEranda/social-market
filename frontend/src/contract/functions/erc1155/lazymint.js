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
  try {
    var nftId = await contract.lazyMint(
      askingPrice,
      owner,
      nftFileMetadataPath,
      isCustomToken,
      collectionAddress.toString().toLowerCase()
    );
    const user = await Moralis.User.current();

    var params2 = {
      ownerOf: user.get("ethAddress").toString(),
      tokenAddress: collectionAddress.toLowerCase(),
      tokenId: nftId.toString(),
      uri: nftFileMetadataPath,
      amount: "1",
      isOnSale: false,
      askingPrice: askingPrice,
      isLazy: true,
    };
    console.log(params2);
    try {
      await Moralis.Cloud.run("SM_initNftTables1155", params2);
    } catch (error) {
      console.log(error.message);
      return { state: true, message: error.message };
    }

    try {
      const query = new Moralis.Query("SM_NFTLazy1155");
      query.equalTo("objectId", id);
      const obj = await query.first();

      let newAmount = parseInt(obj.attributes.amount) - 1;
      if (newAmount === 0) {
        obj.set("isMinted", true);
        obj.set("amount", newAmount.toString());
        console.log(newAmount);
        await obj.save();
      } else {
        obj.set("amount", newAmount.toString());
        await obj.save();
      }
    } catch (error) {
      console.log(error.message);
      return { state: true, message: error.message };
    }

    try {
      await contract.ensureMarketplaceIsApproved(collectionAddress);
    } catch (error) {
      console.log(error.message);
      return { state: true, message: error.message };
    }
  } catch (error) {
    console.log(error);
  }
};
export default lazyMint;
