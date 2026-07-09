// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract NinjaCoinV2 {

    string public name = "NinjaCoin";
    string public symbol = "NJC";

    uint8 public decimals = 18;

    uint256 public totalSupply = 210000000 * 10 ** decimals;


    address public owner;


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


    event Burn(
        address indexed from,
        uint256 value
    );


    event OwnershipTransferred(
        address indexed oldOwner,
        address indexed newOwner
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


    modifier onlyOwner(){

        require(
            msg.sender == owner,
            "Not owner"
        );

        _;
    }



    function balanceOf(address account)
        public
        view
        returns(uint256)
    {
        return balances[account];
    }



    function transfer(
        address to,
        uint256 amount
    )
        public
        returns(bool)
    {

        require(
            to != address(0),
            "Zero address"
        );


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




    function approve(
        address spender,
        uint256 amount
    )
        public
        returns(bool)
    {

        allowances[msg.sender][spender] = amount;


        emit Approval(
            msg.sender,
            spender,
            amount
        );


        return true;
    }




    function allowance(
        address accountOwner,
        address spender
    )
        public
        view
        returns(uint256)
    {

        return allowances[accountOwner][spender];

    }




    function transferFrom(
        address from,
        address to,
        uint256 amount
    )
        public
        returns(bool)
    {

        require(
            to != address(0),
            "Zero address"
        );


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




    function burn(uint256 amount)
        public
        returns(bool)
    {

        require(
            balances[msg.sender] >= amount,
            "Not enough NJC"
        );


        balances[msg.sender] -= amount;

        totalSupply -= amount;



        emit Transfer(
            msg.sender,
            address(0),
            amount
        );


        emit Burn(
            msg.sender,
            amount
        );


        return true;
    }




    function transferOwnership(address newOwner)
        public
        onlyOwner
    {

        require(
            newOwner != address(0),
            "Zero address"
        );


        emit OwnershipTransferred(
            owner,
            newOwner
        );


        owner = newOwner;
    }





    function renounceOwnership()
        public
        onlyOwner
    {

        emit OwnershipTransferred(
            owner,
            address(0)
        );


        owner = address(0);
    }

}