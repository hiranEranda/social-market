require("@nomicfoundation/hardhat-toolbox");
const secrets = require("./secrets.json");

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: secrets.url_rinkeby,
      accounts: [secrets.key],
    },
    ropsten: {
      url: secrets.url_ropsten,
      accounts: [secrets.key],
    },
    goerli: {
      url: secrets.url_goerli,
      accounts: [secrets.key],
    },
  },
};
