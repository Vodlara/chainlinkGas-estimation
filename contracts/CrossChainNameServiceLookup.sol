// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainNameServiceLookup {
    address public router;
    mapping(string => address) private names;

    constructor(address _router) {
        router = _router;
    }

    function lookup(string calldata name) external view returns (address) {
        return names[name];
    }
}
