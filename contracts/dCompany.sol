pragma solidity ^0.5.0;

import "./Ownable.sol";

contract dCompany is Ownable {
    
    /// modifiers

    modifier onlyMembers {
        require(memberID[msg.sender] != 0, "not a member");
        _;
    }

    /// structs
    struct Member {
        address mAddress;
        string mName;
    }

    /// variables

    uint256 public minNumOfConfirms = 0;

    Member[] members;
    mapping( address => uint256 ) memberID;
    mapping( address => address[] ) bounties;

    /// events

    event MembershipChanged( address _mAddress, bool _status );
    event NumberOfConfirmsNeededChanged( uint256 );

    /// constructor

    constructor()
        public
    {
        // 'Dummy'-Member to ensure Creator is registered as a member by onlyMembers modifier
        addMember(address(0), "Dummy");
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

    function getBounties( address _user )
        public
        view
        returns( address[] memory )
    {
        return bounties[_user];
    }

    /// control functions

    function addMember( address _mAddress, string memory _mName )
        public
        onlyOwner
        returns ( uint256 )
    {
        uint256 mId = memberID[_mAddress];

        if (mId == 0) {
            memberID[_mAddress] = members.length;
            mId = members.length++;
        }

        members[mId] = Member ({
            mAddress: _mAddress,
            mName: _mName
        });

        emit MembershipChanged(_mAddress, true);

        if (minNumOfConfirms < (( members.length / 2 ) - 1 )) {
            minNumOfConfirms += 1;
            emit NumberOfConfirmsNeededChanged(minNumOfConfirms);
        }

        return memberID[_mAddress];
    }
}