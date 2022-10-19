// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MyToken is ERC20 {
    uint256 constant maxMint = 100 ether;

    constructor() ERC20("SPIN", "SPIN") {
    }

    /// @dev mints a given amount of tokens to the sender
    function transfer(address _address, uint256 _amount) public {
        _mint(_address, _amount);
    }
}
