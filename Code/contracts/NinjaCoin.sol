// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract NinjaCoin {

    string public name = "NinjaCoin";
    string public symbol = "NJC";

    uint256 public totalSupply = 210000000;

    mapping(address => uint256) public balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough NJC");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}