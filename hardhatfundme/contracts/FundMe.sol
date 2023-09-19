// SPDX-License-Identifier: MIT

//send fund
//receive
//withdraw
pragma solidity ^0.8.8;
import "./PriceConvertor.sol";

contract FundMe {
    using PriceConverter for uint256; // using  library
    uint256 public minimumUSD = 50 * 1e18;

    AggregatorV3Interface public priceFeed;

    address[] public funders;
    address public owner;
    mapping(address => uint256) public addresstofundedAmount;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    //error pricefeedAddress

    function fund() public payable {
        require(
            (msg.value.getConversionRate(priceFeed)) > minimumUSD,
            "Didn't match minimum Amount "
        ); //setting min value
        //1e18=1000000000000000000 wei=1 ETH
        funders.push(msg.sender); //msg.sender gives contract addresses
        addresstofundedAmount[msg.sender] += msg.value; //list amount
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addresstofundedAmount[funder] = 0; //setting 0 to funded address
            //reset the funders
            funders = new address[](0); //0 objects with in start

            //send ether: transefer, send,call

            //transfer
            // payable (msg.sender).transfer(address(this).balance);

            //send
            // bool sendSuccess=payable (msg.sender).send(address(this).balance);
            // require(sendSuccess,"send Failed");

            //call
            // call returns two values
            (bool callSuccess, ) = payable(msg.sender).call{
                value: address(this).balance
            }("");
            require(callSuccess, "call failed");
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "you aint the Owner");
        _; // this means you check Owner and then execute  and vice versa for above
    }

    receive() external payable {
        fund();
    }

    // if a user sends eth mistakely to the address without using fund function, then we redirect them using this.

    fallback() external payable {
        fund();
    }
}
