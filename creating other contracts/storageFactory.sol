// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

import "./SimpleStoage.sol";

contract storageFactory {
    SimpleStorage[] public simpleStorageArray;

    function createNewContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint256 _storeindex, uint256 _number) public {
        SimpleStorage simpleStorage = simpleStorageArray[_storeindex];
        simpleStorage.store(_number);
    } // storing value on contract index

    function sfGet(uint256 _storeindex) public view returns (uint256) {
        SimpleStorage simpleStorage = simpleStorageArray[_storeindex];
        return simpleStorage.retrieve();
    }
}
