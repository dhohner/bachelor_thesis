pragma solidity ^0.5.0;

import "./Ownable.sol";

contract Company is Ownable {
    address private bountyFactory;

    mapping(address => uint256) private memberId;
    mapping(address => bool) private validProposals;
    mapping(address => bool) private validBounty;
    address[] public members;
    address[] private bounties;
    address[] private proposals;

    uint256 public minimumNumberOfVotes = 1;
    uint256 public majorityMargin = 50;

    modifier onlyMembers() {
        require(memberId[msg.sender] != 0, "you need to be a member");
        _;
    }

    event ProposalCreated(address proposalAddress);
    event Voted(address proposalAddress, bool stance, address from);
    event ProposalExecuted(address executedProposal);
    event MembershipChanged(address memberAddress, bool memberStatus);

    constructor(address _bountyFactoryAddress) public {
        members.push(address(0));
        memberId[msg.sender] = members.length;
        members.push(msg.sender);
        bountyFactory = _bountyFactoryAddress;
    }

    /**
     * @notice creates a proposal contract to change membership status for the member
     * @param _bountyAddress the address of the solved bounty to validate
     * @dev only callable by registered members
     */
    function createBountyProposal(address _bountyAddress) public onlyMembers {
        // validate input
        // require(validBounty[_bountyAddress], "invalid input");

        // prepare payload: bytes4 representation of the hashed function signature - no spaces between parameters
        bytes memory payload = abi.encodeWithSignature(
            "newProposal(address,uint256,uint256)",
            _bountyAddress, minimumNumberOfVotes, majorityMargin
        );
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = bountyFactory.call(payload);
        // check if function call was successful
        require(success, "creation of bounty proposal failed");
        // decode return value to get the address of the created proposal
        address proposal = abi.decode(encodedReturnValue, (address));

        // add created proposal to management structure and update proposal as valid
        proposals.push(proposal);
        validProposals[proposal] = true;
        emit ProposalCreated(proposal);
    }

    /**
     * @notice vote for a proposal at the specified address
     * @param _stance true if you want to cast a positive vote, false otherwise
     * @param _proposalAddress the address of the proposal you want to vote for
     * @dev only callable by registered members
     */
    function vote(bool _stance, address _proposalAddress) public onlyMembers {
        // validate input
        require(validProposals[_proposalAddress], "invalid proposal input");

        /// vote for proposal at _proposalAddress
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("vote(bool,address)", _stance, msg.sender);
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturnValue) = _proposalAddress.call(payload);
        // check if voting was successfull
        require(success, "voting failed");
        emit Voted(_proposalAddress, _stance, msg.sender);
        // decode return values to check if proposal was executed and if proposal passed
        (bool proposalPassed, bool proposalExecuted) = abi.decode(encodedReturnValue, (bool, bool));

        // handle return values of voting call
        if (proposalExecuted) {
            emit ProposalExecuted(_proposalAddress);
            handleVoteReturn(_proposalAddress, proposalPassed);
        }
    }

    /**
     * @dev adds the member at the specified address to current members
     * @param _memberAddress the address of the member to add
     */
    function addMember(address _memberAddress) public onlyOwner {
        // validate input
        require(_memberAddress != address(0), "invalid address");
        require(memberId[_memberAddress] == 0, "already a member");

        memberId[_memberAddress] = members.length;
        members.push(_memberAddress);

        // if necessary: update voting parameters
        if (((members.length / 2) - 1) >= minimumNumberOfVotes) {
            minimumNumberOfVotes++;
        }
        emit MembershipChanged(_memberAddress, true);
    }

    /**
     * @dev removes the member at the specified address from current members
     * @param _memberAddress the address of the member to remove
     */
    function removeMember(address _memberAddress) public onlyOwner {
        // validate input
        uint256 mId = memberId[_memberAddress];
        require(mId != 0, "the member you want to remove does not exist");

        // move member to the end of members array
        for(uint256 i = mId; i < members.length - 1; i++) {
            memberId[members[i + 1]]--;
            members[i] = members[i + 1];
        }
        // removes last element of storage array
        members.pop();
        // mark memberId as invalid
        memberId[_memberAddress] = 0;

        // if necessary: update voting parameters
        if (((members.length / 2) - 1) <= minimumNumberOfVotes) {
            minimumNumberOfVotes--;
        }
        emit MembershipChanged(_memberAddress, false);
    }

    /**
     * @notice returns all saved proposals
     * @return all currently openProposals
     */
    function getProposals() public view returns (address[] memory) {
        return proposals;
    }

    /**
     * @notice returns all saved bounties
     * @return all currently open bounties
     */
    function getBounties() public view returns (address[] memory) {
        return bounties;
    }

    /**
     * @notice returns the number of current members - only callable by members
     * @return length of the members array
     */
    function getMembersLength() public view onlyMembers returns (uint256) {
        return members.length;
    }

    /**
     * @notice updates the internal state of the bounty the proposal was for
     * @param _proposalAddress the address of the proposal that was used to validate the bounty solution
     * @param _proposalPassed true if the bounty soultion could be verified - false otherwise
     */

    function handleVoteReturn(address _proposalAddress, bool _proposalPassed) private {
        // validate input
        require(validProposals[_proposalAddress], "invalid proposal input");

        /// get the address of the bounty the proposal was for
        // prepare payload: bytes4 representation of the hashed function signature
        bytes memory payload = abi.encodeWithSignature("bountyAddress()");
        // execute and get encoded return value of function call
        (bool success, bytes memory encodedReturn) = _proposalAddress.call(payload);
        // validate if function call was successful
        require(success, "get bounty address failed");

        // decode return value of function call
        address bountyAddress = abi.decode(encodedReturn, (address));

        // trigger unlock of funds for freelancer
        if(_proposalPassed) {
            emit ProposalExecuted(bountyAddress);
            // TODO: unlock funds for freelancer and trigger event to let freelancer know he/she can withdraw funds now
            // TODO: withdraw function that kills bounty after funds were withdrawn and removes bounty from openBounties
        }
        // unlock proposal for other freelancers
        if(!_proposalPassed) {
            emit ProposalExecuted(bountyAddress);
            // TODO: unlock bounty for other freelancers and reset internal state of bounty
        }

        /// call selfdestruct for proposal validating the bounty
        // prepare payload: bytes4 representation of the hashed function signature
        payload = abi.encodeWithSignature("kill()");
        // execute function call and ignore return value
        (success, ) = _proposalAddress.call(payload);
        // validate if function call was successful
        require(success, "deletion of proposal contract failed");
    }

    /**
     * @notice removes the proposal from the management structures
     * @param _proposal the proposal that will be removed
     */
    function removeProposal(address _proposal) private {
        // validate input
        require(validProposals[_proposal], "invalid input");

        // remove _proposal from the management contract
        for(uint256 i = 0; i < proposals.length; i++) {
            // get index of _proposal in proposals array
            address currentProposal = proposals[i];
            if(currentProposal == _proposal) {
                // move _proposal to the end of the array
                for(uint256 j = i; j < proposals.length - 1; j++) {
                    proposals[j] = proposals[j + 1];
                }
                // removes last element of storage array
                proposals.pop();
                break;
            }
        }
        // mark proposal as invalid
        validProposals[_proposal] = false;
    }
}
