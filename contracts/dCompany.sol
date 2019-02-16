pragma solidity ^0.5.0;

import "./Ownable.sol";
import "./BountyFactory/BountyFactory.sol";

contract dCompany is Ownable {
    /// variables
    struct Member {
        address memberAddress;
        string memberName;
    }

    BountyFactory bountyFactory;
    Member[] members;
    mapping(address => uint256) memberId;
    mapping(address => address[]) bounties;
    mapping(address => bool) validAddress;
    mapping(address => address[]) bountyProposals;
    
    /// modifiers
    modifier onlyMembers() {
        require(memberId[msg.sender] != 0, "not a member");
        _;
    }

    /// events
    event MembershipChanged(address mAddress, bool status);
    event BountyProposalCreated(address bountyProposalAddress, address forBounty);
    event NewBountyAvailable(address bountyAddress, uint256 amount);

    /// constructor
    constructor() public {
        bountyFactory = new BountyFactory();
        members.push(Member({
            memberAddress: address(0),
            memberName: "Dummy"
        }));
        memberId[msg.sender] = members.length;
        members.push(Member({
            memberAddress: msg.sender,
            memberName: "Creator"
        }));
    }

    /// fallback function
    function() external payable {}
    /// external functions
    /// public functions
    function createNewBounty(string memory description, uint256 bountyAmount) public {
        address bountyAddress = bountyFactory.createBounty(description, bountyAmount);
        bounties[address(this)].push(bountyAddress);
        validAddress[bountyAddress] = true;
        emit NewBountyAvailable(bountyAddress, bountyAmount);
    }

    function depositBounty(address payable _bountyAddress) public payable {
        require(validAddress[_bountyAddress], "invalid address");

        bytes memory payload = abi.encodeWithSignature("deposit(address)", msg.sender);
        (bool success, bytes memory encodedReturn) = _bountyAddress.call.value(msg.value)(payload);
        require(success, "deposit failed");

        uint256 decodedReturn = abi.decode(encodedReturn, (uint256));
        require(decodedReturn == msg.value, "expected return value to equal msg.value");
    }

    function getMembersLength() public view returns (uint256) {
        return members.length;
    }

    function getBounties() public view returns (address[] memory) {
        return bounties[address(this)];
    }
    /// internal functions
    /// private functions
}