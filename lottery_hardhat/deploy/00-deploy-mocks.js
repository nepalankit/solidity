const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config")
const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9 //1000000000
module.exports = async function ({ getNamesAccounts, deployments }) {

    const { deploy, log } = deployments;
    const { deployer } = await getNamesAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("local network detected ! Deploying mockss...")
    }

    await deploy("VRFCoordinatorV2Mock", {
        from: deployer,
        log: true,
        args: args,
    })
    log("Mocks deployed")
    log("----------------------------------------")


}
module.exports.tags = ["all", "mocks"]