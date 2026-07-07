// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract NinjaCoin {
address public owner;
    string public name = "NinjaCoin";
    string public symbol = "NJC";

    uint8 public decimals = 18;

    uint256 public totalSupply = 210000000 * 10 ** decimals;

    mapping(address => uint256) private balances;

    mapping(address => mapping(address => uint256)) private allowances;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );


    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;

        emit Transfer(
            address(0),
            msg.sender,
            totalSupply
        );
    }


    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }


    function transfer(address to, uint256 amount) public returns (bool) {

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

        return true;
    }


    function approve(address spender, uint256 amount) public returns (bool) {

        allowances[msg.sender][spender] = amount;

        emit Approval(
            msg.sender,
            spender,
            amount
        );

        return true;
    }


    function allowance(address accountOwner, address spender) public view returns (uint256) {

    return allowances[accountOwner][spender];

}


    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {

        require(
            balances[from] >= amount,
            "Not enough NJC"
        );

        require(
            allowances[from][msg.sender] >= amount,
            "Not approved"
        );


        balances[from] -= amount;
        balances[to] += amount;

        allowances[from][msg.sender] -= amount;


        emit Transfer(
            from,
            to,
            amount
        );

        return true;
    }
}