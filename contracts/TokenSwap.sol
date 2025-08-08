// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    address public owner;
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint public rate = 1; // 1 TokenA = 1 TokenB

    constructor(address _tokenA, address _tokenB) {
        owner = msg.sender;
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function swap(uint _amount) public {
        require(tokenA.balanceOf(msg.sender) >= _amount, "Not enough TokenA");
        require(tokenB.balanceOf(address(this)) >= _amount, "Not enough TokenB in pool");

        // Transfer TokenA from user to this contract
        require(tokenA.transferFrom(msg.sender, address(this), _amount), "TokenA transfer failed");

        // Transfer TokenB from this contract to user
        require(tokenB.transfer(msg.sender, _amount), "TokenB transfer failed");
    }

    function withdrawTokens() public {
        require(msg.sender == owner, "Only owner can withdraw");
        tokenA.transfer(owner, tokenA.balanceOf(address(this)));
        tokenB.transfer(owner, tokenB.balanceOf(address(this)));
    }
}
