// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract NinjaCoin {

    string public name = "NinjaCoin";
    string public symbol = "NJC";

    uint8 public decimals = 18;

    uint256 public totalSupply = 210000000 * 10 ** decimals;

    mapping(address => uint256) public balances;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );


    constructor() {
        balances[msg.sender] = totalSupply;

        emit Transfer(
            address(0),
            msg.sender,
            totalSupply
        );
    }


    function transfer(address to, uint256 amount) public {

        require(to != address(0), "Invalid address");

        require(
            balances[msg.sender] >= amount,
            "Not enough NJC"
        );


        balances[msg.sender] -= amount;

        balances[to] += amount;


        emit Transfer(
            msg.sender,
            to,
            amount
        );
    }
}