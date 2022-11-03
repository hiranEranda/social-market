const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("721 Token contract deployment", function () {
  let Token, token, Marketplace, marketplace, yourNumber, marketplaceAddress;
  it("Should return new Item Id and sender", async function () {
    Token = await ethers.getContractFactory("TokenContract721");
    token = await Token.deploy("Banana", "BNN");
    await token.deployed();
    // expect(await token.create()).to.equal("Hello, world!");
  });

  describe("Token Contract functions", function () {
    it("direct mint test", async function () {
      const createItem = await token.createItem("sds", 30000, false);

      // wait until the transaction is mined
      let receipt = await createItem.wait();
      let sumEvent = receipt.events.pop();
      var hexString = sumEvent.args.tokenId._hex;

      yourNumber = parseInt(hexString, 16);
      console.log("tokenId: ", yourNumber);
    });
    it("lazy mint test 1", async function () {
      const createItem = await token.createItem("sds", 30000, true);

      let receipt = await createItem.wait();
    });
    it("lazy mint test 2", async function () {
      const createItem = await token.createItem("sds", 30000, true);

      let receipt = await createItem.wait();
    });
    it("get id", async function () {
      const id = await token.getId();
      const createId = parseInt(id, 16);

      console.log("current create id: " + createId);
    });
    it("Lazy mint test mint function", async function () {
      const mint = await token.lazyMint(2, {
        value: (30000).toString(),
        from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      });

      let receipt = await mint.wait();
      let sumEvent = receipt.events.pop();
      var hexString = sumEvent.args.tokenId._hex;

      yourNumber = parseInt(hexString, 16);
      console.log("lazy mint tokenId: ", yourNumber);
    });
  });

  // describe("Market contract deployment", function () {
  //   it("Should deploy marketplace contract", async function () {
  //     Marketplace = await ethers.getContractFactory("MarketContract721");
  //     marketplace = await Marketplace.deploy();
  //     await marketplace.deployed();
  //     marketplaceAddress = marketplace.address;
  //     console.log("Marketplace address: ", marketplaceAddress);
  //   });
  // });

  // describe("Token Contract functions", function () {
  //   it("Should mint nft and return tokenId", async function () {
  //     const createItem = await token.createItem("Hola!");

  //     // wait until the transaction is mined
  //     let receipt = await createItem.wait();
  //     let sumEvent = receipt.events.pop();
  //     var hexString = sumEvent.args.tokenId._hex;

  //     yourNumber = parseInt(hexString, 16);
  //     console.log("tokenId: ", yourNumber);
  //   });
  //   it("Should give approval to tokenId", async function () {
  //     const approve = await token.getApproved(yourNumber);
  //   });
  //   it("Should give transfer approval to marketplace contract", async function () {
  //     const approve = await token.approve(marketplaceAddress, yourNumber);

  //     // wait until the transaction is mined
  //     let receipt = await approve.wait();
  //   });
  // });

  // describe("Market functions", function () {
  //   it("Should add item to market", async function () {
  //     const add = await marketplace.addItemToMarket(
  //       yourNumber,
  //       token.address,
  //       (1000).toString(),
  //       "rarible",
  //       "www.google.com"
  //     );
  //     // wait until the transaction is mined
  //     let receipt = await add.wait();
  //   });
  // it("Should change price of the item", async function () {
  //   const add = await marketplace.changePrice(
  //     0,
  //     yourNumber,
  //     token.address,
  //     (20000000).toString()
  //   );
  //   // wait until the transaction is mined
  //   let receipt = await add.wait();
  //   // let sumEvent = receipt.events.pop();
  //   // var hexString = sumEvent.args.tokenId._hex;

  //   // newPrice = parseInt(hexString, 16);
  //   // console.log("tokenId: ", newPrice);
  // });
  // it("Should burn the item", async function () {
  //   const burn = await token.burn("1");
  //   // wait until the transaction is mined
  //   let receipt = await burn.wait();
  //   let res = await token.totalSupply();
  //   console.log(res);
  // });

  // it("Should buy item from market", async function () {
  //   let val = (20000000).toString();
  //   const add = await marketplace.buyItem(
  //     0,
  //     "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  //     (200).toString(),
  //     {
  //       value: val,
  //       from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  //     }
  //   );

  //   // wait until the transaction is mined
  //   let receipt = await add.wait();
  // });
  // it("return service fee", async function () {
  //   const add = await marketplace.getServiceFee();
  //   console.log(add);
  // });
  // it("change service fee", async function () {
  //   const add = await marketplace.setServiceFee(250);

  //   // wait until the transaction is mined
  //   let receipt = await add.wait();
  // });
  // it("return service fee", async function () {
  //   const add = await marketplace.getServiceFee();
  //   console.log(add);
  // });
  // });
});

// describe("1155 Token contract", function () {
//   let Token,
//     token,
//     Marketplace,
//     marketplace,
//     yourNumber,
//     marketplaceAddress,
//     _uri1,
//     _uri2,
//     _uri3;
//   it("Should deploy the contract", async function () {
//     Token = await ethers.getContractFactory("TokenContract1155");
//     token = await Token.deploy("Banana", "BNN");
//     await token.deployed();
//   });
//   describe("1155 token functions", function () {
//     it("Should create 3 items", async function () {
//       const createItem1 = await token.createItem(
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//         5,
//         "www.1.com"
//       );
//       let receipt1 = await createItem1.wait();
//       let sumEvent = receipt1.events.pop();
//       var hexString = sumEvent.args.id._hex;
//       yourNumber = parseInt(hexString, 16);
//       console.log("tokenId: ", yourNumber);

//       const createItem2 = await token.createItem(
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//         2,
//         "www.2.com"
//       );
//       let receipt2 = await createItem2.wait();
//       sumEvent = receipt2.events.pop();

//       var hexString = sumEvent.args.id._hex;
//       yourNumber = parseInt(hexString, 16);
//       console.log("tokenId: ", yourNumber);
//       const createItem3 = await token.createItem(
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//         3,
//         "www.3.com"
//       );
//       let receipt3 = await createItem3.wait();
//       sumEvent = receipt3.events.pop();

//       var hexString = sumEvent.args.id._hex;
//       yourNumber = parseInt(hexString, 16);
//       console.log("tokenId: ", yourNumber);
//     });

//     it("Should return uris of the items", async function () {
//       _uri1 = await token.uri(1);
//       // let receipt1 = await _uri1.wait();

//       _uri2 = await token.uri(2);
//       // let receipt2 = await _uri2.wait();

//       _uri3 = await token.uri(3);
//       // let receipt3 = await _uri3.wait();

//       console.log(_uri1);
//       console.log(_uri2);
//       console.log(_uri3);
//     });
//     it("Should return the balance of the token", async function () {
//       let tx = await token.balanceOf(
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//         1
//       );
//       console.log("balance: ", tx);
//     });
//   });

//   describe("Market contract deployment", function () {
//     it("Should deploy marketplace contract", async function () {
//       Marketplace = await ethers.getContractFactory("MarketContract1155");
//       marketplace = await Marketplace.deploy();
//       await marketplace.deployed();
//       marketplaceAddress = marketplace.address;
//       console.log("Marketplace address: ", marketplaceAddress);
//     });
//     it("Should approve marketplace contract to transfer funds", async function () {
//       const tx = await token.setApprovalForAll(marketplaceAddress, true);
//     });
//   });

//   describe("Marketplace functions", () => {
//     it("Should add item to market", async () => {
//       const add = await marketplace.addItemToMarket(
//         yourNumber,
//         token.address,
//         "20000",
//         _uri3,
//         1
//       );
//       // wait until the transaction is mined
//       let receipt = await add.wait();
//     });
//     it("Should buy item from market", async function () {
//       const add = await marketplace.buyItem(
//         0,
//         1,
//         1000,
//         "0x8CE8be50b1326Dac9C3e0c98c39cCe0b38cbB77d",
//         { value: 20000 }
//       );

//       // wait until the transaction is mined
//       let receipt = await add.wait();
//     });
//     it("change service fee", async function () {
//       const add = await marketplace.setServiceFee(250);

//       // wait until the transaction is mined
//       let receipt = await add.wait();
//     });
//     it("Should add item to market", async () => {
//       const add = await marketplace.addItemToMarket(
//         yourNumber,
//         token.address,
//         "20000",
//         _uri3,
//         1
//       );
//       // wait until the transaction is mined
//       let receipt = await add.wait();
//     });
//     it("Should buy item from market", async function () {
//       const add = await marketplace.buyItem(
//         0,
//         1,
//         1000,
//         "0x8CE8be50b1326Dac9C3e0c98c39cCe0b38cbB77d",
//         { value: 20000 }
//       );

//       // wait until the transaction is mined
//       let receipt = await add.wait();
//     });
//   });
// });
