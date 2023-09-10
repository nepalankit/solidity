
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

import "./SimpleStorage.sol";
//inheritance
contract extraStorage is SimpleStorage{ 

//overriding the function , use virtual in the overrided function
function store(uint256 _favoriteNumber) public override  {
        favoriteNumber = _favoriteNumber+5;
    }
    
}
