const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const {expect,assert}=require("chai")
const {ethers}=require("hardhat")

describe("SimpleStorage",function(){
  let simpleStorage,simpleStorageFactory
  beforeEach(async function (){


    simpleStorageFactory=await ethers.getContractFactory("SimpleStorage")
     simpleStorage=await simpleStorageFactory.deploy()
  })

    it("Should start with a favourite number of 0"
    ,async function(){

      const currentvalue=await simpleStorage.retrieve()
      const expectedvalue="0"
      assert.equal(currentvalue.toString(),expectedvalue)

    })
    it("Should update when we call store,",async function(){


      const expectedvalue="87"
      const transactionResponse=await simpleStorage.store(expectedvalue)
      await transactionResponse.wait(1)

      const currentvalue=await simpleStorage.retrieve()
      assert.equal(currentvalue.toString(),expectedvalue)
    })

})