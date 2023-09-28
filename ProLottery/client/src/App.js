import React from 'react';
import abi from './contracts/Lottery.json'
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import "./components/Manager"
import './App.css';
import Manager from './components/Manager';
import Players from "./components/Players"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route, Link } from "react-router-dom"
import Intro from './components/Intro';
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState("none")
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xE87008c9736DC688e7A7AE501b2745C921D84Aad"
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
      {/* Navigation */}

      <nav>
        <ul>
          <li>
            <Link to="/manager">Manager</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>

        <Route exact path="/" element={<Intro />} />
        <Route path="/manager" element={<Manager state={state} />} />
        <Route path="/players" element={<Players state={state} />} />
      </Routes>
    </div>
  );
}

export default App;
