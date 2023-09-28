import React from 'react';
import abi from './contracts/Lottery.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import "./components/Manager"
import './App.css';
import Manager from './components/Manager';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState("none")
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x01Da76877809cAfEfc37119A7BA44b741A487Cd7"
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: 'eth_requestAccounts', })

          window.ethereum.on("chainChanged", () => {
            window.location.reload()
          })
          window.ethereum.on("accountsChanged", () => {
            window.location.reload()
          })
          const provider = new ethers.BrowserProvider(ethereum)
          const signer = await provider.getSigner()
          const contract = new ethers.Contract(contractAddress, contractABI, signer)
          setAccount(account)
          setState({ provider, signer, contract });
        }
        else {
          alert("please install metamask")
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    connectWallet()
  }, [])
  console.log(state)
  return (
    <div className="App">
      {/* <p>Connected Account{account} </p> */}

      <Manager state={state} />

    </div>
  );
}

export default App;
