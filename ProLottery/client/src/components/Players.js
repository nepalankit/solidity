import React, { useEffect, useState } from "react";

const Players = ({ state }) => {
    const [account, setAccount] = useState("No connected account");
    const [registeredPlayers, setRegisteredPlayers] = useState([]);

    useEffect(() => {
        const getAccount = async () => {
            if (state) {
                const { contract } = state;
                try {
                    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                    console.log(accounts);
                    setAccount(accounts[0]);
                } catch (error) {
                    console.error("Error getting accounts:", error);
                }
            }
        };

        if (state && state.contract) {
            getAccount();
        }
    }, [state]);

    useEffect(() => {
        const getPlayers = async () => {
            if (state) {
                const { contract } = state;
                try {
                    const players = await contract.allPlayers();
                    console.log(players);
                    setRegisteredPlayers(players);
                } catch (error) {
                    console.error("Error getting players:", error);
                }
            }
        };

        if (state && state.contract) {
            getPlayers();
        }
    }, [state]);

    return (
        <>
            Connected account: {account}
            <br />
            Please pay 0.01 ethers to get registered for Scholarship in this address: 0xE87008c9736DC688e7A7AE501b2745C921D84Aad
            <br></br>
            RegisteredPlayers:
            {registeredPlayers.length !== 0 && registeredPlayers.map((name) => <p key={name}>{name}</p>)}
        </>
    );
};

export default Players;
