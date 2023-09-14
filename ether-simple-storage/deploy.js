const ethers=require('ethers')
const fs=require('fs')
require("dotenv").config()
async function main()
{
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const wallet=new  ethers.Wallet(process.env.PRIVATE_KEY,provider)

    const abi=fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8");
    const binary=fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8");
    const contractFactory=new ethers.ContractFactory(abi,binary,wallet);
    console.log("DEPLOYING PLEASE WAIT...")
    const contract=await contractFactory.deploy();
    await contract.deploymentTransaction().wait(1);
    console.log(`contract Address:${await contract.getAddress()}`)

    //get number
    const currentFavouriteNumber=await  contract.retrieve(); //from abi
    //retrieve is a view function so doesnot cost
    console.log(`current number:${currentFavouriteNumber.toString()}`)
    //calling the function => transactionReponse
    const transactionReponse=await contract.store("17")
    //wait for the transaction response to finish =>transaction Receipt
    const transactionReceipt=await transactionReponse.wait(1);
    const updatedFavouriteNumber=await contract.retrieve();
    console.log(`updated number:${updatedFavouriteNumber}`)

}
main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error)
    process.exit(1);
})