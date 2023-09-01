// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract BodyMap
{
    bytes32 private passwordHash;
    string public basicBodyMap;
    string public tailorBodyMap;

    constructor(string memory passwordClearText) 
    {
        passwordHash = keccak256(abi.encodePacked(passwordClearText));
    } 

    function setBodyMaps(string memory passwordClearText, string memory newBasicBodyMap, string memory newTailorBodyMap) public 
    {
        bytes32 givenPasswordHash = keccak256(abi.encodePacked(passwordClearText));
        if(passwordHash == givenPasswordHash)
        {
            basicBodyMap = newBasicBodyMap;
            tailorBodyMap = newTailorBodyMap;
        }
    }
}