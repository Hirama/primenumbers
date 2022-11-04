// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PrimeNumberToken is ERC721 {

    mapping(uint => bool) public primeNumbers;

    constructor() ERC721("Prime Numbers NFT", "PNT") {}

    function save(uint number) public {
        require(number > 1, "Number must be greater than 1");
        require(!primeNumbers[number], "Number is already minted");

        for (uint i = 2; i < number; i++) {
            if (number % i == 0) {
                revert("Number is not prime");
            }
        }

        primeNumbers[number] = true;
        _mint(msg.sender, number);
    }
}
