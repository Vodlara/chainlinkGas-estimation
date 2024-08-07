
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CCIPLocalSimulator {
    address public router;

    constructor(address _router) {
        router = _router;
    }

    function configuration() external view returns (address) {
        return router;
    }
}