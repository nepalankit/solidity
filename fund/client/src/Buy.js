import React from "react";

import { ethers } from "ethers";
const Buy = ({ state }) => {
    const buyCoffee = async (e) => {
        e.preventDefault();
        const { contract } = state;
        console.log(contract)

        if (contract) {
            const name = document.querySelector("#name").value;
            const message = document.querySelector("#message").value;
            console.log(name, message, contract);

            const amount = { value: ethers.parseEther("0.01") };
            const transaction = await contract.buyCoffee(name, message, amount);
            await transaction.wait();
            console.log("transaction completed");
        } else {
            console.error("Contract not initialized");
        }
    };
    return (
        <>
            <form onSubmit={buyCoffee}>
                <label htmlFor="name">Name</label>
                <input type='text' id='name' placeholder="Enter your name"></input>
                <label htmlFor="message">Message</label>
                <input type='text' id='message' placeholder="Enter your Message"></input>
                <button type="submit" disabled={!state.contract}>Pay</button>
            </form>
        </>
    )
}
export default Buy;