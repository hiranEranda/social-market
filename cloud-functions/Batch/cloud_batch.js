Moralis.Cloud.define("SM_initNftTables1155", async (request) => {
  logger.info("SM_initNftTables1155");

  const userQuery = new Moralis.Query(Moralis.User);
  userQuery.equalTo("ethAddress", request.params.ownerOf.toLowerCase());
  const userObject = await userQuery.first({ useMasterKey: true });

  const SM_NFTOwners1155 = Moralis.Object.extend("SM_NFTOwners1155");
  const nftOwner1155 = new SM_NFTOwners1155();
  nftOwner1155.set("tokenId", request.params.tokenId);
  nftOwner1155.set("tokenAddress", request.params.tokenAddress);
  nftOwner1155.set("owner", request.params.ownerOf);
  nftOwner1155.set("ownerObject", userObject);
  nftOwner1155.set("amount", request.params.amount);
  nftOwner1155.set("created", true);
  nftOwner1155.set("uri", request.params.uri);
  nftOwner1155.set("uid", null);
  nftOwner1155.set("isOnSale", false);
  await nftOwner1155.save();
});

// listing items for sale (batch items)
Moralis.Cloud.define("SM_getItemsBatch", async (request) => {
  const query = new Moralis.Query("SM_ItemsForSaleBatch");
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
    "ownerOf",
    "tokenUri",
    "amount"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      amount: queryResults[i].attributes.amount,
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.tokenUri,
      ownerOf: queryResults[i].attributes.ownerOf,
    });
  }
  return results;
});

// view an 1155 item from the market
Moralis.Cloud.define("SM_viewItem1155", async (request) => {
  logger.info("SM_viewItem1155 called");

  const query = new Moralis.Query("SM_ItemsForSaleBatch");
  query.notEqualTo("isSold", true);
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("uid", request.params.uid);
  query.equalTo("tokenAddress", request.params.tokenAddress);

  query.select(
    "id",
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "ownerOf",
    "tokenUri",
    "amount"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      amount: queryResults[i].attributes.amount,
      objId: queryResults[i].id,
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.tokenUri,
      ownerOf: queryResults[i].attributes.ownerOf,
    });
  }
  return results;
});

// for 1155 user details in marketplace
Moralis.Cloud.define("SM_getUserDetails", async (request) => {
  const q = new Moralis.Query("SM_NFTOwners1155");
  q.equalTo("owner", request.params.owner);
  q.equalTo("uid", request.params.uid);
  q.notEqualTo("uid", null);
  q.select("ownerObject.username", "ownerObject.avatar");
  const res = await q.find({ useMasterKey: true });
  return res;
});

// for 1155 user details in info batch
Moralis.Cloud.define("SM_viewUserDetails", async (request) => {
  const q = new Moralis.Query("SM_NFTOwners1155");
  q.equalTo("tokenAddress", request.params.tokenAddress);
  q.equalTo("tokenId", request.params.tokenId.toString());
  q.equalTo("created", true);
  q.select("ownerObject.username", "ownerObject.avatar");
  const res = await q.find({ useMasterKey: true });
  return res;
});

///////////////////////////////// For Internal Profile View ///////////////////////////////////////////////////
// get user's created items
Moralis.Cloud.define("SM_getUserCreatedItems1155", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user created items..user's created items");

  const query = new Moralis.Query("SM_NFTOwners1155");
  query.equalTo("owner", request.params.ethAddress);
  query.equalTo("created", true);
  query.equalTo("uid", null);

  const queryResults = await query.find({ useMasterKey: true });

  return queryResults;
});

// view user's created items
Moralis.Cloud.define("SM_viewUserCreatedItems1155", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user created items..user's created items");

  const query = new Moralis.Query("SM_NFTOwners1155");
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("tokenAddress", request.params.tokenAddress);
  query.equalTo("created", true);
  query.equalTo("uid", null);

  const queryResults = await query.find({ useMasterKey: true });

  return queryResults;
});

// listing user's items for sale on profile (batch items)
Moralis.Cloud.define("SM_getUserItemsBatch", async (request) => {
  const query = new Moralis.Query("SM_ItemsForSaleBatch");
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
    "ownerOf",
    "tokenUri",
    "amount"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      amount: queryResults[i].attributes.amount,
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.tokenUri,
      ownerOf: queryResults[i].attributes.ownerOf,
    });
  }
  return results;
});

// getting collection data for a user
Moralis.Cloud.define("SM_getCollectionData", async (request) => {
  const query = new Moralis.Query("SM_ItemsForSaleBatch");
  query.notEqualTo("isSold", true);
  query.equalTo("isOnSale", true);
  if (!request.params.isAll) {
    query.equalTo("ownerOf", request.params.ethAddress);
  }
  query.equalTo("tokenAddress", request.params.tokenAddress);
  query.descending("block_timestamp");
  query.select(
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "ownerOf",
    "tokenUri",
    "amount"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      amount: queryResults[i].attributes.amount,
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.tokenUri,
      ownerOf: queryResults[i].attributes.ownerOf,
    });
  }
  return results;
});

// get sold items
Moralis.Cloud.define("SM_getSoldItemsBatch", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get sold items");

  const query = new Moralis.Query("SM_SoldItemsBatch");
  query.equalTo("seller", request.params.ethAddress);
  query.equalTo("confirmed", true);
  query.descending("block_timestamp");
  query.select(
    "askingPrice",
    "uid",
    "tokenId",
    "user.username",
    "user.avatar",
    "user.ethAddress",
    "item.tokenUri",
    "item.tokenAddress"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      boughtPrice: queryResults[i].attributes.askingPrice,
      buyerUsername: queryResults[i].attributes.user.attributes.username,
      buyerAvatar: queryResults[i].attributes.user.attributes.avatar,
      buyerEthAddress: queryResults[i].attributes.user.attributes.ethAddress,
      uri: queryResults[i].attributes.item.attributes.tokenUri,
      tokenAddress: queryResults[i].attributes.item.attributes.tokenAddress,
    });
  }
  return results;
});

// get user bought items 1155
Moralis.Cloud.define("SM_getUserBoughtItems1155", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user bought items..user's bought items");

  const query = new Moralis.Query("Bought1155");
  query.equalTo("owner", request.params.ethAddress);
  query.equalTo("isAddedToMarket", false);
  query.select(
    "amount",
    "id",
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
      id: queryResults[i].id,
      uri: queryResults[i].attributes.uri,
      amount: queryResults[i].attributes.amount,
      owner: queryResults[i].attributes.owner,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      tokenId: queryResults[i].attributes.tokenId,
      uid: queryResults[i].attributes.uid,
      username: queryResults[i].attributes.ownerObject.attributes.username,
      userAvatar: queryResults[i].attributes.ownerObject.attributes.avatar,
    });
  }
  return results;
});
///////////////////////////////// For Internal Profile View ///////////////////////////////////////////////////

// getting transaction history
Moralis.Cloud.define("SM_getOwners", async (request) => {
  const query = new Moralis.Query("SM_NFTOwners1155");
  query.equalTo("tokenId", request.params.tokenId.toString());
  query.equalTo("tokenAddress", request.params.tokenAddress);
  query.descending("createdAt");
  query.select(
    "owner",
    "ownerObject.username",
    "ownerObject.avatar",
    "ownerObject.ethAddress",
    "tokenAddress",
    "amount"
  );
  const queryResults = await query.find({ useMasterKey: true });
  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      owner: queryResults[i].attributes.owner,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      amount: queryResults[i].attributes.amount,
      username: queryResults[i].attributes.ownerObject.attributes.username,
      avatar: queryResults[i].attributes.ownerObject.attributes.avatar,
      ethAddress: queryResults[i].attributes.ownerObject.attributes.ethAddress,
    });
  }
  return results;
});

// remove item from market
Moralis.Cloud.define("SM_removeItem1155", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("SM_removeItem1155");

  const query = new Moralis.Query("SM_ItemsForSaleBatch");
  query.equalTo("objectId", request.params.id);

  const obj = await query.first({ useMasterKey: true });
  obj.set("isOnSale", false);
  await obj.save({ useMasterKey: true });
  return obj;
});

// add removed item to market
Moralis.Cloud.define("SM_addItem1155", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("SM_addItem1155");

  const query = new Moralis.Query("SM_ItemsForSaleBatch");
  query.equalTo("objectId", request.params.objectId);

  const obj = await query.first({ useMasterKey: true });
  obj.set("isOnSale", true);
  obj.set("askingPrice", request.params.newPrice);
  await obj.save();
});

// listing items for sale (batch items)
Moralis.Cloud.define("SM_getUserRemovedItems1155", async (request) => {
  const query = new Moralis.Query("SM_ItemsForSaleBatch");
  query.equalTo("isOnSale", false);
  query.equalTo("isSold", false);
  query.equalTo("confirmed", true);
  query.descending("block_timestamp");
  query.select(
    "id",
    "ownerOf",
    "transaction_hash",
    "block_timestamp",
    "uid",
    "tokenAddress",
    "tokenId",
    "askingPrice",
    "ownerOf",
    "tokenUri",
    "amount"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    results.push({
      amount: queryResults[i].attributes.amount,
      objId: queryResults[i].id,
      transaction: queryResults[i].attributes.transaction_hash,
      timestamp: queryResults[i].attributes.block_timestamp,
      uid: queryResults[i].attributes.uid,
      tokenId: queryResults[i].attributes.tokenId,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      askingPrice: queryResults[i].attributes.askingPrice,
      tokenUri: queryResults[i].attributes.tokenUri,
      ownerOf: queryResults[i].attributes.ownerOf,
    });
  }
  return results;
});

// add removed item to market
Moralis.Cloud.define("SM_burn1155", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("burn");

  const query = new Moralis.Query("SM_ItemsForSaleBatch");
  query.equalTo("uid", request.params.uid);

  const obj = await query.first({ useMasterKey: true });
  let amount = parseInt(obj.attributes.amount) - 1;
  if (amount === 0) {
    obj.destroy();
  } else {
    obj.set("amount", amount.toString());
    await obj.save();
  }

  const query1 = new Moralis.Query("SM_NFTOwners1155");
  query1.equalTo("uid", request.params.uid);

  const obj1 = await query1.first({ useMasterKey: true });
  let amount1 = parseInt(obj1.attributes.amount) - 1;
  if (amount1 === 0) {
    obj1.destroy();
  } else {
    obj1.set("amount", amount1.toString());
    await obj1.save();
  }
});
