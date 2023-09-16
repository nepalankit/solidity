const {task}=require("hardhat/config")

task("block-number","prints the current block  number").setAction(
    async(taskArgs,hre)=>{
       const blocknumber= await hre.ethers.provider.getBlockNumber()
   console.log(`current blocknumber${blocknumber}`)
   
    }
)