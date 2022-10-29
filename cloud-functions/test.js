Moralis.Cloud.define("test", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("burn");

  const query = new Moralis.Query("SM_ItemsForSaleBatch");
  query.equalTo("uid", request.params.uid);

  const obj = await query.first({ useMasterKey: true });
  let amount = parseInt(obj.attributes.amount) - 1;
  if (amount === 0) {
    obj.set("isSold", true);
    obj.set("isOnSale", false);
  } else {
    obj.set("amount", amount.toString());
  }
  await obj.save();

  const query1 = new Moralis.Query("SM_NFTOwners1155");
  query1.equalTo("uid", request.params.uid);

  const obj1 = await query1.first({ useMasterKey: true });
  let amount1 = parseInt(obj1.attributes.amount) - 1;
  if (amount1 === 0) {
    obj1.destroy();
  } else {
    obj1.set("amount", amount1.toString());
  }
  await obj1.save();

  return obj1;
});
