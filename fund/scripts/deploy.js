
const hre = require("hardhat");

async function main() {

  const [owner, from1, from2, from3] = await hre.ethers.getSigners()
  const coffee = await hre.ethers.getContractFactory("coffee")
  const contract = await coffee.deploy(); //instance of contract
  await contract.deployed()
  console.log("address of contract", contract.address)

  const addresses = [owner.address, from1.address];
  console.log("Before deploying coffee")
  await consoleBalance(addresses);
  const amount = { value: hre.ethers.parseEther("1") }
  await contract.connect(from1).buyCoffee("from1", "very nice", amount)
}
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt)

}
async function consoleBalance(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance`, await getBalance(address))
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = meme.timestamp;
    const name = memo.name;
    const from = memo.address;
    const message = memo.message;
    console.log(`At ${timestamp},name:${name},from:${from},message ${message}`)

  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
