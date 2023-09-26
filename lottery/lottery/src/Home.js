import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './constants';

function Home() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [contractInstance, setcontractInstance] = useState('');
    const [status, setStatus] = useState(false);
    const [isWinner, setIsWinner] = useState('');

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                try {
                    const signer = await provider.getSigner();
                    const address = await signer.getAddress();
                    console.log(address);
                    setCurrentAccount(address);
                    window.ethereum.on('accountsChanged', (accounts) => {
                        setCurrentAccount(accounts[0]);
                        console.log(currentAccount);
                    })
                } catch (err) {
                    console.error(err);
                }
            } else {
                alert('Please install Metamask to use this application')

            }
        };


        const contract = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await window.ethereum.enable();
                const signer = await provider.getSigner();
                // console.log(signer);
                console.log(contractAddress);
                // console.log();
                const contractIns = new ethers.Contract(contractAddress, contractAbi, signer);
                // console.log(contractIns);
                setcontractInstance(contractIns);

                // Debug logging
                console.log("Contract instance:", contractIns);

                const status = await contractIns.isComplete();
                setStatus(status);
                const winner = await contractIns.getWinner();
                if (winner === currentAccount) {
                    setIsWinner(true);
                } else {
                    setIsWinner(false);
                }
            } catch (err) {
                console.error("Error initializing contract:", err);
            }
        }


        loadBlockchainData();
        contract();
    }, [currentAccount]);

    const enterLottery = async () => {
        if (contractInstance) {
            console.log(contractInstance)
            const amountToSend = ethers.parseEther('0.001');
            const tx = await contractInstance.enter({ value: amountToSend });
            await tx.wait();
        } else {
            console.error("Contract instance is not fully initialized.");
        }
    }


    const claimPrize = async () => {
        const tx = await contractInstance.claimPrize();
        await tx.wait();
    }



    return (
        <div className="container">
            <h1>Lottery Page</h1>
            <div className="button-container">
                {status ? (isWinner ? (<button className="enter-button" onClick={claimPrize}> Claim Prize </button>) :
                    (<p>You are not the winner</p>)) :
                    (<button className="enter-button" onClick={enterLottery}> Enter Lottery </button>)

                }
            </div>
        </div>
    )

}

export default Home;