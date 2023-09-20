import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectWallet = document.getElementById("connectWallet")
const fundbutton = document.getElementById("fund")
const balancebutton = document.getElementById("balanceButton")
const withdrawbutton = document.getElementById("withdrawButton")
connectWallet.onclick = connect
fundbutton.onclick = fund
balancebutton.onclick = getBalance
withdrawbutton.onclick = withdraw
console.log(ethers)
async function connect() {

    if (typeof window.ethereum != "undefined") {


        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectWallet.innerHTML = "connected!"
    }
    else {
        connectWallet.innerHTML = "please install metamask"
    }
}

async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }

}
//fund function

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`funding with ${ethAmount}`)
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()// returns the transaction record to a wallet address we are connected to

        console.log(signer)
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {


            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            //wait for tx to be done
            await listenforTransactionMine(transactionResponse, provider)
            console.log('done')
        }
        catch (error) {
            console.log(error)
        }
    }
}
//not using async
function listenforTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}... `)
    //create a listen
    //listen for this transaction to finish
    return new Promise((resolve, reject) => {

        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations} confirmations`)
            resolve()
        })

    })
}





//withdraw function
async function withdraw() {
    if (typeof window.ethereum != "undefined") {
        console.log(`withdrawing :((("`)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()// returns the transaction record to a wallet address we are connected to

        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw()
            await listenforTransactionMine(transactionResponse, provider)

        }
        catch (error) {
            console.log(error)
        }
    }
}