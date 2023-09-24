const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");


module.exports = async function ({ getNamesAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamesAccounts()
    const chainId = network.config.chainId;
    let vrfCoordinatorV2Address
    if (developmentChains.includes(network.name)) {
        vrfCoordinatorV2Address = await ethers.getContract("VRFCoordinatorv2Mock")
        //conotinue
    }
    else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
    }
    const entranceFee = networkConfig[chainId]["entrancefee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const args = [vrfCoordinatorV2Address, entranceFee, gasLane]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1

    })
}