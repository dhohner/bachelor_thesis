pragma solidity ^0.5.0;

import "./Ownable.sol";

contract dCompany is Ownable {
    
    /// modifiers

    /// structs
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

    /// events
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
        minNumVotes = _minNumVotes;
        debateTime = _debateTime;
        majority = _majority;

        members.push(Member ({
            mAddress: address(0),
            mName: "0x0"
        }));
        members.push(Member ({
            mAddress: msg.sender,
            mName: "creator"
        }));

    }

    /// getter
    function getMembersLength()
        public
        view
        returns( uint256 )
    {
        return members.length;
    }


}