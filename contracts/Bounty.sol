pragma solidity ^0.5.0;

contract Bounty {
    
    /// events

    event BountySupplied( address bountyAddress );
    event BountyClaimed( address bountyAddress, address claimee );
    event BountySolved( address bountyAddress, bytes32 hash );
    event BountyChecked( address bountyAddress, address election );
    event BountyPaid( address bountyAddress, address paymentRecipient );
    event BountyCancelled( address bountyAddress );
    event ClaimeeChanged(address bountyAddress, address oldClaimee, address newClaimee);

    /// variables

    address payable claimee;
    address payable bountyOrigin = address(0);
    
    bytes32 public commitHash;
    bytes32 public bountyDescription;

    bool public claimed = false;
    bool public solved = false;
    bool checked = false;
    bool paid = false;

    uint256 public creationTime;
    uint256 public claimedAt;
    uint256 public bounty;

    bool private hasBounty;
    bool public cancel = false;

    /// constructor

    constructor( bytes32 _description, uint256 _bounty )
        public
    {
        bountyDescription = _description;
        creationTime = now;
        bounty = _bounty;
        hasBounty = false;
    }

    /// fallback
    // prevent all payments exept those using deposit

    function() external payable
    {
        revert("Use Deposit instead");
    }

    /// internal logic

    function deposit( address payable _origin )
        public
        payable 
    {
        require(!hasBounty, "bounty already available");
        require(msg.value == bounty, "provide bounty in one payment");
        
        hasBounty = true;
        bountyOrigin = _origin;

        emit BountySupplied(address(this));
    }

    function cancelBounty( address payable _origin )
        public
    {
        if (bountyOrigin == address(0)) {
            emit BountyCancelled(address(this));
            selfdestruct(_origin);
        }
        else {
            require(_origin == bountyOrigin, "Only bountyOrigin can cancel");
            emit BountyCancelled(address(this));
            selfdestruct(bountyOrigin);
        }  
    }

    function claimBounty( address payable _origin )
        public
    {
        require(!cancel, "Cancelled Bounties cannot be claimed");
        if (claimed) {
            require(now >= (claimedAt + 1 days), "Can only be reclaimed after 1 Day");
            emit ClaimeeChanged(address(this), claimee, _origin);
        }
        require(_origin != bountyOrigin, "cannot be claimed by bountyOrigin");
        
        claimed = true;
        claimedAt = now;
        claimee = _origin;

        emit BountyClaimed(address(this), _origin);
    }

    function submitHash( bytes32 _hash, address _origin )
        public
    {
        require(!cancel, "Cannot Submit to canceled bounty");
        require(!solved, "Was Solved");
        require(_origin == claimee, "Hash can only be submitted by Claimee");
        require(_hash.length == 40, "Invalid Hash Format");

        solved = true;
        commitHash = _hash;

        emit BountySolved( address(this), commitHash);
    }
}