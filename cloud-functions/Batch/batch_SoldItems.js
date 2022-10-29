Moralis.Cloud.beforeSave("SM_SoldItemsBatch", async (request) => {
  logger.info("cloud before save SM_SoldItemsBatch");

  // set buyer user object in soldItem object
  const userQuery = new Moralis.Query(Moralis.User);
  userQuery.equalTo("accounts", request.object.get("buyer").toLowerCase());
  const userObject = await userQuery.first({ useMasterKey: true });
  if (userObject) {
    request.object.set("user", userObject);
  }
  const query1 = new Moralis.Query("SM_ItemsForSaleBatch");
  query1.equalTo("uid", request.object.get("uid"));
  query1.equalTo("tokenId", request.object.get("tokenId"));
  const item = await query1.first();
  if (item) {
    request.object.set("item", item);
  }
});

Moralis.Cloud.define("updateData", async (request) => {
  const query1 = new Moralis.Query("SM_ItemsForSaleBatch");
  query1.equalTo("uid", request.params.uid);
  query1.equalTo("tokenId", request.params.tokenId);
  const item = await query1.first();

  //init token address and uri
  const TokenAddress = request.params.tokenAddress;
  const TokenUri = request.params.tokenUri;
  const tokenId = request.params.tokenId;
  const buyer = request.params.buyer;
  const seller = request.params.seller;
  const uid = request.params.uid;
  const amountOfBuyer = request.params.amountOfBuyer;
  const amountOfSeller = request.params.amountOfSeller;

  // NFTOwners table update : seller's data
  const q = new Moralis.Query("SM_NFTOwners1155");
  q.equalTo("tokenId", tokenId);
  q.equalTo("tokenAddress", TokenAddress);
  q.equalTo("owner", seller);
  q.equalTo("uid", uid);
  const NFTOwner = await q.first();

  if (
    amountOfSeller > 0 &&
    (amountOfSeller !== undefined || amountOfSeller !== null)
  ) {
    logger.info("update amount in ItemsForSale_Batch");
    item.set("amount", amountOfSeller.toString());
    await item.save();

    NFTOwner.set("amount", amountOfSeller.toString());
    await NFTOwner.save();

    logger.info("amountOfSeller: " + amountOfSeller);
    logger.info("amountOfBuyer: " + amountOfBuyer);
  } else {
    logger.info("sold out");
    item.set("amount", "0");
    item.set("isSold", true);
    await item.save();

    logger.info("Owner doesn't exist anymore, object destroyed");
    NFTOwner.destroy();
  }

  // set buyer user object in soldItem object
  const userQuery = new Moralis.Query(Moralis.User);
  userQuery.equalTo("accounts", buyer);
  const userObject = await userQuery.first({ useMasterKey: true });

  // check if the buyer already have this token and has put on sale
  const query3 = new Moralis.Query("SM_NFTOwners1155");
  query3.equalTo("tokenId", tokenId);
  query3.equalTo("tokenAddress", TokenAddress);
  query3.equalTo("owner", buyer);
  const obj3 = await query3.first();

  // check if the buyer already have this token and hasn't put on sale
  const query4 = new Moralis.Query("SM_NFTOwners1155");
  query4.equalTo("tokenId", tokenId);
  query4.equalTo("tokenAddress", TokenAddress);
  query4.equalTo("owner", buyer);
  query4.equalTo("uid", null);
  const obj4 = await query4.first();

  if (!obj3) {
    // create new record in SM_NFTOwners1155 table for buyer
    const SM_NFTOwners1155 = Moralis.Object.extend("SM_NFTOwners1155");
    const nftOwner1155 = new SM_NFTOwners1155();
    nftOwner1155.set("tokenId", tokenId);
    nftOwner1155.set("tokenAddress", TokenAddress);
    nftOwner1155.set("owner", buyer);
    nftOwner1155.set("ownerObject", userObject);
    nftOwner1155.set("amount", "1");
    nftOwner1155.set("uri", TokenUri);
    nftOwner1155.set("uid", null);
    nftOwner1155.set("isOnSale", false);
    nftOwner1155.set("created", false);
    await nftOwner1155.save();
  } else if (obj4) {
    obj4.set("amount", amountOfBuyer.toString());
    await obj4.save();
  } else {
    // create new record in SM_NFTOwners1155 table for buyer
    const SM_NFTOwners1155 = Moralis.Object.extend("SM_NFTOwners1155");
    const nftOwner1155 = new SM_NFTOwners1155();
    nftOwner1155.set("tokenId", tokenId);
    nftOwner1155.set("tokenAddress", TokenAddress);
    nftOwner1155.set("owner", buyer);
    nftOwner1155.set("ownerObject", userObject);
    nftOwner1155.set("amount", "1");
    nftOwner1155.set("uri", TokenUri);
    nftOwner1155.set("uid", null);
    nftOwner1155.set("isOnSale", false);
    nftOwner1155.set("created", false);

    await nftOwner1155.save();
  }
});
