import React from 'react';
import abi from './contracts/coffee.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import Buy from './Buy';
import Memos from './memos';
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x0900879b1185A53201809E80644aD36c50392db7"
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: 'eth_requestAccounts', })
        }
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)
        setState({ provider, signer, contract });
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
      <Buy state={state} />

    </div>
  );
}

export default App;
