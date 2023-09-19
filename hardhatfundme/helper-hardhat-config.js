
const networkConfig={
    11155111:{
        name:"sepolia",
        ethUsdPriceFeed:"0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    137:{
        name:"polygon",
        ethUsdPriceFeed:"0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    },
}

const developmentChain=["hardhat","localhost"]
const DECIMALS=8
const INITIAL_ANSWER=200000000

module.exports={
    networkConfig,
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
}