const {ethers,run,network}=require("hardhat")


async function main()

{
  const SimpleStorageFactory=await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying please wait...")
  const simpleStorage=await SimpleStorageFactory.deploy()
  await simpleStorage.getDeployedCode()
  console.log(`Deployed Contract at ${await simpleStorage.getAddress()}`)

 if (network.config.chainId===11155111 && process.env.ETHERSCAN_API)
 {
  await simpleStorage.deploymentTransaction().wait(6)
  await verify(simpleStorage.address,[])
 }
 const currentvalue=await simpleStorage.retrieve()
 console.log(`Current value is ${currentvalue}`)


 // update value

const transactionResponse=await simpleStorage.store(87)
await transactionResponse.wait(1)
const updatedvalue=await simpleStorage.retrieve()
console.log(`Updated value is ${updatedvalue}`)

}
//autoverify after deploying
async function verify(contractAddress,args)
{
    console.log("VERifying CONtract...")
    try{

      await run("verify:verify",{
        address:contractAddress,
        constructorArguments:args,
      }) //see using yarn hardhat verify --help
    }
    catch(error)
    {
      if(error.message.toLowerCase().includes("already verified"))
      {
        console.log("Already Verified")
      }
      else{
        console.log(error)
      }
    }
}

main().then(()=>process.exit(0))
.catch((error)=>{
  console.log(error)
  process.exit(1)
})