//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract simpleStorage{
  
    uint256 public favourite;

    function myfavourite(uint256 _mylove) public
    {
        favourite=_mylove;
    }
    function something() public view returns (uint256)
    
    {
        return favourite;
    }

   
}