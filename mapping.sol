//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract simpleStorage{
  
    uint256 public favourite; //this will take the 0th index

    function myfavourite(uint256 _mylove) public
    {
        favourite=_mylove;
    }

    // people public person=people({
    //     fav:6,
    //     name:'Ankit'
    // });

        mapping(string =>uint256) public stringtofavouritenumber;

        

    struct People{
        uint256 fav;
        string name;
    }

    People[] public info;


    function something() public view returns (uint256)
    
    {
        return favourite; 
    }

    function addPerson(string memory  _name ,uint256 _favourite)public {
      People memory name1=People({name:_name, fav:_favourite });
        info.push(name1);
        stringtofavouritenumber[_name]=_favourite;
    }

   
//    function addpeple(string memory name3, int256 fav4) public
//    {
//        People memory name4=People({name:name3 ,fav:fav4 });
//        info.push(name4);
//    }
}