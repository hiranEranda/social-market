Moralis.Cloud.define("SM_getContractAvatar", async (request) => {
  const query = new Moralis.Query("SM_ContractOwners");
  logger.info("getAvatar");
  logger.info(request.params.tokenAddress);
  query.equalTo("collectionAddress", request.params.tokenAddress);

  const queryResults = await query.find();

  return queryResults;
});

Moralis.Cloud.define("SM_getCreatorAndRoyalty", async (request) => {
  const query = new Moralis.Query("SM_Creator");
  query.equalTo("tokenId", request.params.tokenId);
  query.equalTo("tokenAddress", request.params.tokenAddress);
  query.select("tokenAddress", "tokenId", "royalty", "ethAddress");
  const queryResults = await query.find();
  logger.info(queryResults);
  return queryResults;
});

Moralis.Cloud.define("SM_setCreators", async (request) => {
  logger.info(request.params);
  logger.info("setCreators");
  const Creator = Moralis.Object.extend("SM_Creator");
  const creator = new Creator();
  creator.set("ethAddress", request.params.userAddress);
  creator.set("nftName", request.params.title);
  creator.set("category", request.params.category);
  creator.set("royalty", request.params.royalty);
  creator.set("description", request.params.description);
  creator.set("image", request.params.nftFilePath);
  creator.set("tokenId", request.params.nftId);
  creator.set("contractType", request.params.type);
  creator.set("tokenAddress", request.params.tokenAddress);
  await creator.save();
});

Moralis.Cloud.define("SM_setContractOwners", async (request) => {
  logger.info(request.params);
  logger.info("setContractOwners");
  const ContractOwners = Moralis.Object.extend("SM_ContractOwners");
  const contractOwners = new ContractOwners();
  contractOwners.set("userAddress", request.params.userAddress);
  contractOwners.set("collectionAddress", request.params.collectionAddress);
  contractOwners.set("name", request.params.name);
  contractOwners.set("symbol", request.params.symbol);
  contractOwners.set("description", request.params.description);
  contractOwners.set("Avatar", request.params.Avatar);
  contractOwners.set("collectionType", request.params.collectionType);
  await contractOwners.save();
});

// Getting nft creator data
Moralis.Cloud.define("SM_getCreator", async (request) => {
  const query = new Moralis.Query("SM_Creator");
  logger.info(request.params.tokenId);
  logger.info(request.params.tokenAddress);

  query.equalTo("tokenId", parseInt(request.params.tokenId));
  query.equalTo("tokenAddress", request.params.tokenAddress);
  const result = await query.first();
  const query2 = new Moralis.Query(Moralis.User);
  query2.equalTo("accounts", result.attributes.ethAddress);
  const user = await query2.find({ useMasterKey: true });
  return user;
});

// get user's created items
Moralis.Cloud.define("SM_getUserDesignedItems", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("get user designed items..user's created items");

  const query = new Moralis.Query("SM_Creator");
  query.equalTo("ethAddress", request.params.ethAddress);
  query.select(
    "nftName",
    "description",
    "image",
    "ethAddress",
    "tokenAddress",
    "tokenId"
  );
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    // if (!queryResults[i].attributes.user) continue;
    results.push({
      nftName: queryResults[i].attributes.nftName,
      description: queryResults[i].attributes.description,
      image: queryResults[i].attributes.image,
      tokenAddress: queryResults[i].attributes.tokenAddress,
      ethAddress: queryResults[i].attributes.ethAddress,
      tokenId: queryResults[i].attributes.tokenId,
    });
  }
  return results;
});

Moralis.Cloud.define("SM_popularCreators", async (request) => {
  const query = new Moralis.Query("SM_SoldItemsSingle");
  query.select("seller", "askingPrice");
  const queryResults = await query.find({ useMasterKey: true });

  var results = [];

  for (let i = 0; i < queryResults.length; i++) {
    const query = new Moralis.Query(Moralis.User);
    query.equalTo("ethAddress", queryResults[i].attributes.seller);
    const user = await query.first({ useMasterKey: true });

    results.push({
      seller: queryResults[i].attributes.seller,
      askingPrice: queryResults[i].attributes.askingPrice,
      user: user.attributes,
    });
  }

  const query2 = new Moralis.Query("SM_SoldItemsBatch");
  query2.select("seller", "askingPrice");
  const queryResults2 = await query2.find({ useMasterKey: true });

  for (let i = 0; i < queryResults2.length; i++) {
    const query = new Moralis.Query(Moralis.User);
    query.equalTo("ethAddress", queryResults2[i].attributes.seller);
    const user = await query.first({ useMasterKey: true });

    results.push({
      seller: queryResults2[i].attributes.seller,
      askingPrice: queryResults2[i].attributes.askingPrice,
      user: user.attributes,
    });
  }

  return results;
});
Moralis.Cloud.define("FetchJson", async (request) => {
  return Moralis.Cloud.httpRequest({
    method: "GET",
    url: request.params.url,
  });
});

Moralis.Cloud.define("SM_getUser", async (request) => {
  const query2 = new Moralis.Query(Moralis.User);
  query2.equalTo("ethAddress", request.params.ethAddress);
  const user = await query2.find({ useMasterKey: true });
  return user;
});
