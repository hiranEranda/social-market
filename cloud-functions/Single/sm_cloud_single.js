Moralis.Cloud.define("SM_initNftTables721", async (request) => {
  logger.info("SM_initNftTables721");

  const userQuery = new Moralis.Query(Moralis.User);
  userQuery.equalTo("ethAddress", request.params.ownerOf.toLowerCase());
  const userObject = await userQuery.first({ useMasterKey: true });

  const SM_NFTOwners721 = Moralis.Object.extend("SM_NFTOwners721");
  const nftOwner721 = new SM_NFTOwners721();
  nftOwner721.set("uid", null);
  nftOwner721.set("isOnSale", false);
  nftOwner721.set("ownerObject", userObject);
  nftOwner721.set("owner", request.params.ownerOf);
  nftOwner721.set("tokenId", request.params.tokenId);
  nftOwner721.set("tokenAddress", request.params.tokenAddress);
  nftOwner721.set("createdId", request.params.createdId);
  nftOwner721.set("askingPrice", request.params.askingPrice.toString());
  nftOwner721.set("created", true);
  nftOwner721.set("uri", request.params.uri);
  await nftOwner721.save();
});

Moralis.Cloud.afterSave("_User", async (request) => {
  if (request.object.get("username") && request.object.get("confirmed")) {
    const UserDetails = Moralis.Object.extend("UserDetails");
    const userDetail = new UserDetails();
    userDetail.set("username", request.object.get("username"));
    await userDetail.save();
  }
});

// listing items for sale (single items)
Moralis.Cloud.define("SM_getItemsSingle", async (request) => {
  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.notEqualTo("isSold", true);
  query.equalTo("isOnSale", true);
  query.equalTo("confirmed", true);
  query.descending("block_timestamp");
  query.select(
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "user.username",
    "user.avatar",
    "uri"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (!queryResults[i].attributes.user) continue;
    results.push({
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.uri,
      ownerOf: queryResults[i].attributes.ownerOf,
      sellerUsername: queryResults[i].attributes.user.attributes.username,
      sellerAvatar: queryResults[i].attributes.user.attributes.avatar,
    });
  }
  return results;
});

// filter collections single
Moralis.Cloud.define("SM_filterCollections", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("collection filters");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.notEqualTo("isSold", true);
  query.equalTo("isOnSale", true);
  query.equalTo("confirmed", true);
  query.equalTo("collection", request.params.collection);
  query.descending("block_timestamp");
  query.select(
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "user.username",
    "user.avatar",
    "uri"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (!queryResults[i].attributes.user) continue;
    results.push({
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.uri,
      ownerOf: queryResults[i].attributes.ownerOf,
      sellerUsername: queryResults[i].attributes.user.attributes.username,
      sellerAvatar: queryResults[i].attributes.user.attributes.avatar,
    });
  }
  return results;
});

// view an item from the market
Moralis.Cloud.define("SM_viewItem", async (request) => {
  logger.info("view item called");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.notEqualTo("isSold", true);
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("tokenAddress", request.params.tokenAddress);

  query.select(
    "id",
    "collection",
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "user.username",
    "user.avatar",
    "uri"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (!queryResults[i].attributes.user) continue;
    results.push({
      transaction: queryResults[i].attributes.transaction_hash,
      objId: queryResults[i].id,
      collection: queryResults[i].attributes.collection,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.uri,
      ownerOf: queryResults[i].attributes.ownerOf,
      sellerUsername: queryResults[i].attributes.user.attributes.username,
      sellerAvatar: queryResults[i].attributes.user.attributes.avatar,
    });
  }
  return results;
});

// view an item from profile
Moralis.Cloud.define("SM_viewItemInfo", async (request) => {
  logger.info("view item called");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.notEqualTo("isSold", false);
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("tokenAddress", request.params.tokenAddress);

  query.select(
    "collection",
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "user.username",
    "user.avatar",
    "uri"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (!queryResults[i].attributes.user) continue;
    results.push({
      transaction: queryResults[i].attributes.transaction_hash,
      collection: queryResults[i].attributes.collection,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.uri,
      ownerOf: queryResults[i].attributes.ownerOf,
      sellerUsername: queryResults[i].attributes.user.attributes.username,
      sellerAvatar: queryResults[i].attributes.user.attributes.avatar,
    });
  }
  return results;
});

// view an item from profile removed721
Moralis.Cloud.define("SM_viewItemInfo1", async (request) => {
  logger.info("view item called");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.notEqualTo("isSold", true);
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("tokenAddress", request.params.tokenAddress);

  query.select(
    "collection",
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "user.username",
    "user.avatar",
    "uri"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (!queryResults[i].attributes.user) continue;
    results.push({
      transaction: queryResults[i].attributes.transaction_hash,
      collection: queryResults[i].attributes.collection,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.uri,
      ownerOf: queryResults[i].attributes.ownerOf,
      sellerUsername: queryResults[i].attributes.user.attributes.username,
      sellerAvatar: queryResults[i].attributes.user.attributes.avatar,
    });
  }
  return results;
});

// Getting user
Moralis.Cloud.define("SM_getUser", async (request) => {
  const query = new Moralis.Query(Moralis.User);
  query.equalTo("ethAddress", request.params.ethAddress);
  const user = await query.first({ useMasterKey: true });
  return user;
});

// Getting user
Moralis.Cloud.define("SM_getUser2", async (request) => {
  const query = new Moralis.Query("SM_NFTOwners721");
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("tokenAddress", request.params.tokenAddress);
  const user = await query.first({ useMasterKey: true });
  return user;
});

///////////////////////////////// For Internal Profile View ///////////////////////////////////////////////////
// get sold items
Moralis.Cloud.define("SM_getSoldItems", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get sold items");

  const query = new Moralis.Query("SM_SoldItemsSingle");
  query.equalTo("seller", request.params.ethAddress);
  query.equalTo("confirmed", true);
  query.descending("block_timestamp");
  query.select(
    "askingPrice",
    "uid",
    "tokenId",
    "user.username",
    "user.avatar",
    "user.ethAddress"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    // if (!queryResults[i].attributes.user) continue;
    results.push({
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      boughtPrice: queryResults[i].attributes.askingPrice,
      buyerUsername: queryResults[i].attributes.user.attributes.username,
      buyerAvatar: queryResults[i].attributes.user.attributes.avatar,
      buyerEthAddress: queryResults[i].attributes.user.attributes.ethAddress,
    });
  }
  return results;
});

// get sold items data
Moralis.Cloud.define("SM_getSoldItemsData", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get sold items");

  const query = new Moralis.Query("SM_NFTOwners721");
  query.equalTo("tokenId", request.params.tokenId);
  query.descending("createdAt");
  query.select(
    "uri",
    "owner",
    "tokenAddress,ownerObject.username,ownerObject.avatar"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    // if (!queryResults[i].attributes.user) continue;
    results.push({
      uri: queryResults[i].attributes.uri,
      ownerEthAddress: queryResults[i].attributes.owner,
      ownerUsername: queryResults[i].attributes.ownerObject.attributes.username,
      ownerAvatar: queryResults[i].attributes.ownerObject.attributes.avatar,
      tokenAddress: queryResults[i].attributes.tokenAddress,
    });
  }
  return results;
});

// get user's items in marketplace
Moralis.Cloud.define("SM_getUserItems", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user items..user items in marketplace");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.notEqualTo("isSold", true);
  query.equalTo("isOnSale", true);
  query.equalTo("confirmed", true);
  query.equalTo("ownerOf", request.params.ethAddress);
  query.descending("block_timestamp");
  query.select(
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "user.username",
    "user.avatar",
    "uri"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (!queryResults[i].attributes.user) continue;
    results.push({
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.uri,
      ownerOf: queryResults[i].attributes.ownerOf,
      sellerUsername: queryResults[i].attributes.user.attributes.username,
      sellerAvatar: queryResults[i].attributes.user.attributes.avatar,
    });
  }
  return results;
});

// get user's created items
Moralis.Cloud.define("SM_getUserBoughtItems", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user bought items..user's bought items");

  const query = new Moralis.Query("SM_NFTOwners721");
  query.equalTo("owner", request.params.ethAddress);
  query.equalTo("isOnSale", false);
  query.notEqualTo("uid", null);
  query.select(
    "uri",
    "ownerObject.username",
    "ownerObject.avatar",
    "owner",
    "uid",
    "tokenAddress",
    "tokenId"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      uri: queryResults[i].attributes.uri,
      owner: queryResults[i].attributes.owner,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      username: queryResults[i].attributes.ownerObject.attributes.username,
      userAvatar: queryResults[i].attributes.ownerObject.attributes.avatar,
    });
  }
  return results;
});

// get user's removed items
Moralis.Cloud.define("SM_getUserRemovedItems", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user removed items");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.equalTo("ownerOf", request.params.ethAddress);
  query.equalTo("isOnSale", false);
  query.equalTo("isSold", false);

  query.select(
    "id",
    "collection",
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "user.username",
    "user.avatar",
    "uri"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (!queryResults[i].attributes.user) continue;
    results.push({
      transaction: queryResults[i].attributes.transaction_hash,
      objId: queryResults[i].id,
      collection: queryResults[i].attributes.collection,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.uri,
      ownerOf: queryResults[i].attributes.ownerOf,
      sellerUsername: queryResults[i].attributes.user.attributes.username,
      sellerAvatar: queryResults[i].attributes.user.attributes.avatar,
    });
  }
  return results;
});
///////////////////////////////// For Internal Profile View ///////////////////////////////////////////////////

// getting transaction history
Moralis.Cloud.define("SM_getHistory721", async (request) => {
  const query = new Moralis.Query("SM_SoldItemsSingle");
  logger.info("get history");
  logger.info(request.params.tokenId.toString());
  query.equalTo("tokenId", request.params.tokenId.toString());
  query.descending("createdAt");
  query.select(
    "askingPrice",
    "user.username",
    "user.avatar",
    "user.ethAddress",
    "item.tokenAddress"
  );
  const queryResults = await query.find({ useMasterKey: true });
  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    if (
      queryResults[i].attributes.item.attributes.tokenAddress ===
      request.params.tokenAddress
    ) {
      results.push({
        boughtPrice: queryResults[i].attributes.askingPrice,
        buyerUsername: queryResults[i].attributes.user.attributes.username,
        buyerAvatar: queryResults[i].attributes.user.attributes.avatar,
        buyerEthAddress: queryResults[i].attributes.user.attributes.ethAddress,
      });
    }
  }
  if (results.length > 0) {
    return { history: { state: true, data: results } };
  } else {
    return { history: { state: false, data: "Just minted" } };
  }
});

// get user's created items
Moralis.Cloud.define("SM_getUserCreatedItems721", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user created items..user's created items");

  const query = new Moralis.Query("SM_NFTOwners721");
  query.equalTo("owner", request.params.ethAddress);
  query.equalTo("created", true);
  query.equalTo("uid", null);

  const queryResults = await query.find({ useMasterKey: true });

  return queryResults;
});

// view user's created items
Moralis.Cloud.define("SM_viewUserCreatedItems721", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user created items..user's created items");

  const query = new Moralis.Query("SM_NFTOwners721");
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("tokenAddress", request.params.tokenAddress);
  query.equalTo("created", true);
  query.equalTo("uid", null);

  const queryResults = await query.find({ useMasterKey: true });

  return queryResults;
});

// remove item from market
Moralis.Cloud.define("SM_removeItem721", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("SM_removeItem721");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.equalTo("objectId", request.params.id);

  const obj = await query.first({ useMasterKey: true });
  obj.set("isOnSale", false);
  await obj.save({ useMasterKey: true });
  return obj;
});

// add removed item to market
Moralis.Cloud.define("SM_addItem721", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("SM_addItem721");

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.equalTo("objectId", request.params.objectId);

  const obj = await query.first({ useMasterKey: true });
  obj.set("isOnSale", true);
  obj.set("askingPrice", request.params.newPrice);
  await obj.save();
});

// add removed item to market
Moralis.Cloud.define("SM_burn721", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("SM_burn721");
  logger.info(request.params.uid);

  const query = new Moralis.Query("SM_ItemsForSaleSingle");
  query.equalTo("uid", request.params.uid);
  const obj = await query.first({ useMasterKey: true });
  obj.destroy();

  const query1 = new Moralis.Query("SM_NFTOwners721");
  query1.equalTo("uid", request.params.uid);
  const obj1 = await query1.first({ useMasterKey: true });
  obj1.set("isOnSale", false);
  obj1.destroy();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
