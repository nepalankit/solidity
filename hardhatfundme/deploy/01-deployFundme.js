// function deployfunc()
// {
// console.log("hi")
// }

const { network } = require("hardhat")
const{networkConfig, developmentChain}=require("../helper-hardhat-config")

// module.exports.default=deployfunc

module.exports=async({getNamedAccounts,deployments})=>{
 const{deploy,log}=deployments
 const{deployer}=await getNamedAccounts()
 const chainId= network.config.chainId

let ethUsdPriceFeedAddress

if(developmentChain.includes(network.name))
{
    const ethUsdAggregrator=await deployments.get("MockV3Aggregrator")
    ethUsdPriceFeedAddress=ethUsdAggregrator.address
}
else{

}
 const fundMe=await deploy("FundMe",{
    from:deployer,
    args:[  ethUsdPriceFeedAddress   ],//price feed address,
    log:true,
 })

}


module.exports.tags=["all","Fundme"]