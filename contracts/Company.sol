pragma solidity ^0.5.0;

import "./Ownable.sol";

contract Company is Ownable {
    address private bountyFactory;
    mapping(address => uint256) private memberId;
    address[] public members;
    address[] private proposals;
    uint256 public minimumNumberOfVotes = 1;
    uint256 public majorityMargin = 50;

    modifier onlyMembers() {
        require(memberId[msg.sender] != 0, "you need to be a member");
        _;
    }

    event ProposalCreated(address proposalAddress, string proposalType);
    event Voted(address proposalAddress, bool stance, address from);
    event ProposalExecuted(address executedProposal);
    event MembershipChanged(address memberAddress, bool memberStatus);
    event Test(bool propPassed, bool propExecuted);

    constructor(address _bountyFactoryAddress) public {
        members.push(address(0));
        memberId[msg.sender] = members.length;
        members.push(msg.sender);
        bountyFactory = _bountyFactoryAddress;
    }

    /**
     * @notice creates a proposal contract to change membership status for the member
     * @param _memberAddress the address of the member
     * @param _adding true if member is to be added false otherwise
     * @dev only callable by registered members
     */
    function createBountyProposal(address _bountyAddress) public onlyMembers {
        // validate input

        // prepare payload for function call - no spaces between parameters
        bytes memory payload = abi.encodeWithSignature(
            "newProposal(address,uint256,uint256)",
            _bountyAddress, minimumNumberOfVotes, majorityMargin
        );

        // execute function call
        (bool success, bytes memory encodedReturnValue) = bountyFactory.call(payload);

        // check if function call was successful
        require(success, "member proposal failed");

        // decode return value to get the address of the created proposal
        address proposal = abi.decode(encodedReturnValue, (address));

        // add created proposal to management structure and set correct proposal type
        proposals.push(proposal);
        emit ProposalCreated(proposal, "memberProposal");
    }

    /**
     * @notice vote for a proposal at the specified address
     * @param _stance true if you want to cast a positive vote, false otherwise
     * @param _proposalAddress the address of the proposal you want to vote for
     * @dev only callable by registered members
     */
    function vote(bool _stance, address _proposalAddress) public onlyMembers {
        // validate input

        // vote for proposal at _proposalAddress
        bytes memory payload = abi.encodeWithSignature("vote(bool,address)", _stance, msg.sender);
        (bool success, bytes memory encodedReturnValue) = _proposalAddress.call(payload);

        // check if voting was successfull
        require(success, "voting failed");

        // lock voting user
        emit Voted(_proposalAddress, _stance, msg.sender);

        // decode return values to check if proposal passed
        (bool proposalPassed, bool proposalExecuted) = abi.decode(encodedReturnValue, (bool, bool));
        emit ProposalExecuted(_proposalAddress);

        // handle return values of voting call
        if (proposalExecuted) {
            emit Test(proposalPassed, proposalExecuted);
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
     * @dev returns all saved proposals
     */
    function getProposals() public view returns (address[] memory) {
        return proposals;
    }

    /**
     * @dev returns the number of current members
     */
    function getMembersLength() public view returns (uint256) {
        return members.length;
    }

    /**
     * @notice removes the lendingRequest from the management structures
     * @param _request the lendingRequest that will be removed
     */
    function removeRequest(address _request) private {
        // remove _request from the management contract
        for(uint256 i = 0; i < proposals.length; i++) {
            // get index of _request in proposals array
            address currentRequest = proposals[i];
            if(currentRequest == _request) {
                // move _request to the end of the array
                for(uint256 j = i; j < proposals.length - 1; j++) {
                    proposals[j] = proposals[j + 1];
                }
                // removes last element of storage array
                proposals.pop();
                break;
            }
        }
    }
}
