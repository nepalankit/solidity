//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract simpleStorage {
    uint256 public favourite; //this will take the 0th index

    function myfavourite(uint256 _mylove) public {
        favourite = _mylove;
    }

    // people public person=people({
    //     fav:6,
    //     name:'Ankit'
    // });

    struct People {
        int256 fav;
        string name;
    }

    People[] public info;

    function something() public view returns (uint256) {
        return favourite;
    }

    function addPerson(string memory _name, int256 _favourite) public {
        People memory name1 = People({name: _name, fav: _favourite});
        info.push(name1);
    }
}
