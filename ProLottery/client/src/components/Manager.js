import React, { useEffect, useState } from "react";
import './Manager.css'

const Manager = ({ state }) => {
    const [account, setAccount] = useState("");
    const [cbalance, setCbalance] = useState(0);
    const [lwinner, setLwinner] = useState("No Scholarship Provided Yet");

    useEffect(() => {

        const getAccount = async () => {
            if (state) {
                const { contract } = state;
                console.log(contract);
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts", })

                console.log(accounts)
                setAccount(accounts[0]);
            }
        }
        state.contract && getAccount()
    }, [state, state.contract]);

    const contractBalance = async () => {
        const { contract } = state;

        try {

            const balance = await contract.getBalance()
            console.log(balance)
            setCbalance(balance)
        }
        catch (e) {

            setCbalance("You are not the Contract Owner")
        }
    }

    const winner = async () => {
        const { contract } = state;
        try {

            await contract.pickWinner()
            //whenever you are changing state of blockchain use send
            const lotteryWinner = await contract.winner()
            console.log(lotteryWinner)
            setLwinner(lotteryWinner);
        }
        catch (e) {
            if (e.message.includes("You are not the manager")) {
                setLwinner("You are not the manager");

            }
            else if (e.message.includes("Players are less than 1")) {
                setLwinner("There are less than 1 players")
            }
            else {
                setLwinner("No winner yet")
            }
        }
    }

    return (
        <>
            Connected account: {account}
            <br />
            Winner: {lwinner}
            <button onClick={winner}>Click for Winner</button>
            <br />
            Contract Balance: {cbalance}
            <button onClick={contractBalance}>Click for Contract Balance</button>
        </>
    );
}

export default Manager;
