pragma solidity ^0.5.0;

import "./Bounty.sol";
import "./BountyProposal.sol";

contract BountyFactory {
    function createBounty(
        string memory _description,
        uint256 _bounty
    )   public
        returns (address) {
        return address(new Bounty(_description, _bounty));
    }

    function creatBountyProposal() public returns (address) {
        return address(new BountyProposal());
    }
}