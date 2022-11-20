const Moralis = require("moralis-v1");
const contract = require("./contract");
// create an item functions
const create = async (
  values,
  image,
  collectionAddress,
  addToMarket,
  isLazy,
  setLoading1,
  setLoading2,
  setLoading3,
  setLoading4,
  isCustomToken
) => {
  console.log(values);
  let collection = values.collection;
  let list_price = values.price;

  try {
    var askingPrice = Moralis.Units.ETH(list_price);
  } catch (error) {
    console.log(error.message);
    return { state: false, message: "Invalid decimal value. Min: 0.0000001" };
  }

  const data = image;
  const nftFile = new Moralis.File(data.name, data);
  try {
    await nftFile.saveIPFS();
  } catch (error) {
    return { state: false, message: error.message };
  }

  function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
  }

  let encoded_title = toBinary(values.title);
  let encoded_description = toBinary(values.description);

  // console.log(encoded);

  const nftFilePath = nftFile.ipfs();
  const metadata = {
    name: encoded_title,
    category: values.collection,
    description: encoded_description,
    image: nftFilePath,
  };

  const nftFileMetadata = new Moralis.File("metadata.json", {
    base64: btoa(JSON.stringify(metadata)),
  });

  await nftFileMetadata.saveIPFS();
  const nftFileMetadataPath = nftFileMetadata.ipfs();

  try {
    setLoading1(false);
    //console.log(collectionAddress);
    if (!isLazy) {
      var nftId = await contract.mintNft(nftFileMetadataPath, collectionAddress);
    } else {
      var nftId = null;
    }

    //console.log(nftId);
    const user = await Moralis.User.current();
    const params = {
      userAddress: user.get("ethAddress").toString(),
      tokenAddress: collectionAddress.toLowerCase(),
      title: values.title,
      category: values.collection,
      description: values.description,
      nftFilePath: nftFilePath,
      nftId: nftId,
      // createdId: ids.createdId,
      askingPrice: askingPrice,
      type: "erc721",
      royalty: parseFloat(values.royalty),
      isLazy: isLazy,
      isCustomToken: isCustomToken,
    };
    //console.log(params);
    if (params.nftId !== undefined) {
      setLoading2(false);

      await Moralis.Cloud.run("SM_setCreators", params);
      if (nftId === null) {
        var params2 = {
          ownerOf: user.get("ethAddress").toString(),
          creator: user.get("ethAddress").toString(),
          tokenAddress: collectionAddress.toLowerCase(),
          tokenId: nftId,
          // createdId: ids.createdId.toString(),
          uri: nftFileMetadataPath,
          isLazy: isLazy,
          isCustomToken: isCustomToken,

          askingPrice: askingPrice,
        };
      } else {
        var params2 = {
          ownerOf: user.get("ethAddress").toString(),
          creator: user.get("ethAddress").toString(),
          tokenAddress: collectionAddress.toLowerCase(),
          tokenId: nftId.toString(),
          // createdId: ids.createdId.toString(),
          uri: nftFileMetadataPath,
          isLazy: isLazy,
          isCustomToken: isCustomToken,

          askingPrice: askingPrice,
        };
      }
      try {
        if (!isLazy) {
          await Moralis.Cloud.run("SM_initNftTables721", params2);
        } else {
          await Moralis.Cloud.run("SM_initLazyNftTables721", params2);
        }
      } catch (error) {
        console.log(error.message);
        return { state: true, message: error.message };
      }
    }

    try {
      if (!isLazy) {
        await contract.ensureMarketplaceIsApproved(nftId, collectionAddress);
        setLoading3(false);

        if (addToMarket) {
          try {
            const res = await contract.addItemToMarket(
              nftId,
              askingPrice,
              collection,
              nftFileMetadataPath,
              collectionAddress
            );
            if (res.status) {
              setLoading4(false);
              // return { state: true, message: "Your NFT is created" };
            } else {
              return { state: false, message: res.message };
            }
          } catch (e) {
            console.log(e);

            return { state: false, message: e.message };
          }
        }
      }

      return { state: true, message: "Your NFT is created" };
    } catch (error) {
      console.log(error);
      return { state: false, message: error.message };
    }
  } catch (error) {
    console.log(error);
    return { state: false, message: error.message };
  }
};

export default create;
