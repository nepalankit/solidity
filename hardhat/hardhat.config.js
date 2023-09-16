require("@nomicfoundation/hardhat-toolbox");
require ("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL=process.env.SEPOLIA_RPC_URL || "https://eth-sepolia"
const privateKey=process.env.PRIVATE_KEY || "key"
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API || "key"
const COINMARKETCAP_API_KEY=process.env.COINMARKETCAP_API_KEY || "key"
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    sepolia:{
      url:SEPOLIA_RPC_URL,
      accounts:[privateKey],
      chainId:11155111.,
    },
    localhost:{
      url:"http:127.0.0.1:8545/",
      chainId:31337,
    }
  },
  solidity: "0.8.8",
  etherscan:{
    apikey:{

      sepolia:ETHERSCAN_API_KEY,
    },
    gasReporter: {
      enabled: true,
      currency: "USD", // currency to show
      outputFile: "gas-report.txt", // optional
      noColors: true, //optional
      coinmarketcap: COINMARKETCAP_API_KEY, //to fetch gas data
      token: "ETH" 
    
    },
  },
};
