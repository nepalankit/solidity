const { assert } = require("chai")
const {deployments, ethers,getNamedAccounts}=require("hardhat")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
describe ("fundMe",async function(){
    let fundMe
    let MockV3Aggregator

    beforeEach(async function(){
        const{deployer}=await getNamedAccounts()
        await deployments.fixture(["all"])
        fundMe=await ethers.getContractAtFromArtifact("FundMe",deployer)
        MockV3Aggregator=await ethers.getContractAt("MockV3Aggregator",deployer)
   
 })
    describe("constructor",async function(){

isCallTrace("sets the aggregrator addresses correctly",async function(){
    const response=await fundMe.pricefeed()
    assert.equal(response,MockV3Aggregator.address)
})
    })
})