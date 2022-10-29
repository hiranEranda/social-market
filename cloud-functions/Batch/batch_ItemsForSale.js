Moralis.Cloud.beforeSave("SM_ItemsForSaleBatch", async (request) => {
  logger.info("cloud before save SM_ItemsForSaleBatch");

  // init data
  const amount = request.object.get("amount");
  const tokenId = request.object.get("tokenId");
  const tokenAddress = request.object.get("tokenAddress");
  const ownerOf = request.object.get("ownerOf");
  const uid = request.object.get("uid");

  // init sellersObject
  const userQuery = new Moralis.Query(Moralis.User);
  userQuery.equalTo("ethAddress", request.object.get("ownerOf").toLowerCase());
  const userObject = await userQuery.first({ useMasterKey: true });

  if (userObject) {
    logger.info("set user object");
    request.object.set("user", userObject);
    request.object.set("amount", amount);
  }

  // find the nft in SM_NFTOwners1155 table
  const query1 = new Moralis.Query("SM_NFTOwners1155");
  query1.equalTo("tokenId", tokenId);
  query1.equalTo("tokenAddress", tokenAddress);
  query1.equalTo("owner", ownerOf);
  query1.equalTo("uid", null);
  const NFTOwner = await query1.first();

  if (NFTOwner) {
    logger.info("updated SM_NFTOwners1155");
    NFTOwner.set("uid", uid);
    NFTOwner.set("isOnSale", true);
    await NFTOwner.save();
  } else {
    logger.info("ping from ItemSold");
  }
});
