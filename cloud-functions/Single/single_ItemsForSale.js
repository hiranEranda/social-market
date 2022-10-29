Moralis.Cloud.beforeSave("SM_ItemsForSaleSingle", async (request) => {
  const userQuery = new Moralis.Query(Moralis.User);
  logger.info("cloud before save SM_ItemsForSaleSingle");

  userQuery.equalTo("ethAddress", request.object.get("ownerOf").toLowerCase());
  const userObject = await userQuery.first({ useMasterKey: true });
  if (userObject) {
    request.object.set("user", userObject);
  }

  const SM_NFTOwners721 = Moralis.Object.extend("SM_NFTOwners721");
  const nftOwner721 = new SM_NFTOwners721();

  const query = new Moralis.Query("SM_NFTOwners721");
  query.equalTo("tokenId", request.object.get("tokenId"));
  query.equalTo("tokenAddress", request.object.get("tokenAddress"));
  const obj = await query.first();
  if (obj) {
    logger.info("Bought item adding to market again");
    obj.set("isOnSale", true);
    obj.set("uid", request.object.get("uid"));
    await obj.save();
  } else {
    logger.info("New item adding to market");
    // nftOwner721.set("tokenId", request.object.get("tokenId"));
    // nftOwner721.set("tokenAddress", request.object.get("tokenAddress"));
    // nftOwner721.set("owner", request.object.get("ownerOf"));
    // nftOwner721.set("ownerObject", userObject);
    // nftOwner721.set("uri", request.object.get("uri"));
    nftOwner721.set("uid", request.object.get("uid"));
    nftOwner721.set("isOnSale", true);
    await nftOwner721.save();
    logger.info("uid: " + request.object.get("uid"));
    logger.info("tokenId: " + request.object.get("tokenId"));
    logger.info("added to DB");
  }

  logger.info("Items successfully added to the SM_ItemsForSaleSingle table");
});
