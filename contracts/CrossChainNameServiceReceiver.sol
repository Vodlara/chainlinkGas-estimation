// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainNameServiceReceiver {
    address public router;

    constructor(address _router) {
        router = _router;
    }

    function enableChain(uint256 chainId) external {
        // Logic to enable chain
    }

    function ccipReceive() external {
        // Logic for receiving cross-chain messages
    }
}
