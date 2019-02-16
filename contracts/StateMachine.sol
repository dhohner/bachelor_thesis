pragma solidity ^0.5.0;

contract StateMachine {
    enum States {
        BountyCreated,
        RewardSupplied,
        BountyClaimed,
        HashSubmitted,
        BountyChecked,
        BountyDestroyed,
        NumberOfStates
    }

    States private state;

    modifier atState(States _state) {
        require(state == _state, "contract is in wrong state");
        _;
    }

    /**
     * @dev checks if current state is in interval [_firstState, _secondState]
     */

    modifier atStates(States _firstState, States _secondState) {
        require(
            uint256(state) >= uint256(_firstState) && uint256(state) <= uint256(_secondState),
            "contract is not in either state provided"
        );
        _;
    }

    function switchState(States _state)
        internal
    {
        require(
            uint256(_state) < uint256(States.NumberOfStates),
            "incorrect state index"
        );
        state = _state;
    }

    function checkState(States _state)
        internal
        view
        returns (bool)
    {
        return state == _state ? true : false;
    }
}