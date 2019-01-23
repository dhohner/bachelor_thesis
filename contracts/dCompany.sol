pragma solidity ^0.5.0;

import "./Ownable.sol";

contract dCompany is Ownable {
    
    /// modifiers
    modifier onlyMembers {
        uint256 mID = memberID[msg.sender];

        if( mID == 0 ) {
            require(isOwner(), "Not a Member / Owner");
            _;
        } else {
            require(mID != 0, "Not a Member");
            _;
        }
    }

    /// structs
    struct Bounty {
        string issue;
        uint256 reward;
        uint256 numVotes;
        uint256 numPositiveVotes;
        bool claimed;
        bool passed;
        bool executed;
        mapping( address => bool ) voted;
    }

    struct Member {
        address mAddress;
        string mName;
    }

    /// variables
    uint256 public minNumVotes;
    uint256 public debateTime;
    uint256 public majority;

    Member[] public members;
    mapping( address => uint256 ) memberID;

    Bounty[] public bounties;
    uint256[] public openBounties;


    /// events
    event BountyChanged( uint256 _bountyID );
    event MembershipChanged( address _mAddress, bool _status );

    /// constructor
    constructor
    (
        uint256 _minNumVotes,
        uint256 _debateTime,
        uint256 _majority
    )
        public
    {
        changeRules(_minNumVotes, _debateTime, _majority);
        addMember(msg.sender, "Creator");
    }

    /// getter
    function getMembersLength()
        public
        view
        returns( uint256 )
    {
        return members.length;
    }
    /// setter
    function changeRules
    (
        uint256 _minNumVotes,
        uint256 _debateTime,
        uint256 _majority
    )
        public
        onlyOwner
    {
        minNumVotes = _minNumVotes;
        debateTime = _debateTime;
        majority = _majority;
    }

    /// internal functions
    function addMember
    (
        address _mAddress,
        string memory _mName
    )
        public
        onlyOwner
    {
        uint256 mID = memberID[_mAddress];
        if ( mID == 0 ) {
            memberID[_mAddress] = members.length;
            mID = members.length++;
        }

        members[mID] = Member
        ({
            mAddress: _mAddress,
            mName: _mName
        });

        emit MembershipChanged(_mAddress, true);
    }

}