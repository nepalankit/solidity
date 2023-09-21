// //we can people to pay some amount and enter the raffle and want

// to randomly select winner

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

error Raffle_NotEnoughETh();

contract Raffle {
    uint256 private immutable i_entranceFee; //storage variable
    address payable[] private s_players;

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle_NotEnoughETh();
        }
        s_players.push(payable(msg.sender));
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
