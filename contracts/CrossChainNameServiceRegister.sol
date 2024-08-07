// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainNameServiceRegister {
    address public router;
    mapping(string => address) private names;

    constructor(address _router) {
        router = _router;
    }

    function enableChain(uint256 chainId) external {
        // Logic to enable chain
    }

    function register(string calldata name, address addr) external {
        names[name] = addr;
    }
}
