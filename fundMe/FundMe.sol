// SPDX-License-Identifier: MIT

//send fund
//receive
//withdraw
pragma solidity ^0.8.8;
import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;
    uint256 public minimumUSD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addresstofundedAmount;

    function fund() public payable {
        require(
            (msg.value.getConversionRate()) > minimumUSD,
            "Didn't match minimum Amount "
        ); //setting min value
        //1e18=1000000000000000000 wei=1 ETH
        funders.push(msg.sender); //msg.sender gives contract addresses
        addresstofundedAmount[msg.sender] = msg.value; //list amount
    }
}
