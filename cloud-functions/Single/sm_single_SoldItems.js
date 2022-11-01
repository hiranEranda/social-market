Moralis.Cloud.beforeSave("SM_SoldItemsSingle", async (request) => {
  logger.info("cloud before save SM_SoldItemsSingle");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.equalTo("uid", request.object.get("uid"));
  query.equalTo("tokenId", request.object.get("tokenId"));
  const item = await query.first();
  if (item) {
    request.object.set("item", item);
    item.set("isSold", true);
    item.set("isOnSale", false);
    await item.save();

    const userQuery = new Moralis.Query(Moralis.User);
    userQuery.equalTo("accounts", request.object.get("buyer").toLowerCase());
    const userObject = await userQuery.first({ useMasterKey: true });
    if (userObject) {
      request.object.set("user", userObject);
    }

    const query = new Moralis.Query("SM_NFTOwners721");
    query.equalTo("uid", request.object.get("uid"));
    query.equalTo("tokenId", request.object.get("tokenId"));
    const items = await query.first();

    logger.info("Buyer address", request.object.get("buyer"));

    items.set("ownerObject", userObject);
    items.set("isOnSale", false);
    items.set("owner", request.object.get("buyer"));
    await items.save();
  }
});
