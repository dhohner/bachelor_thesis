import router from '@/router'
import store from '@/store/'

import * as types from '@/util/constants/types'

export const companyEventListeners = contract => {
  pollWeb3()
  bountyCreatedListener(contract)
  bountyClaimedListener(contract)
  pollCreatedListener(contract)
  pollExecutedListener(contract)
  rewardAvailableListener(contract)
  rewardTransferedListener(contract)
}

export const pollHelper = async () => {
  const web3 = store.state.web3.web3Instance()

  let payload = {
    networkID: null,
    coinbase: null
  }

  payload.networkID = await web3.eth.net.getId()
  payload.coinbase = await web3.eth.getCoinbase()

  return payload
}

const pollWeb3 = contract => {
  // eslint-disable-next-line no-undef
  ethereum.on('accountsChanged', () => {
    // force authentification if currently on p2pManagement
    if (router.currentRoute.name === 'control') {
      store.dispatch(types.LOGOUT)
      router.push({ name: 'home' })
    }
    store.dispatch(types.POLL_WEB3, contract)
  })
  // eslint-disable-next-line no-undef
  ethereum.on('networkChanged', () => {
    // force authentification if currently on p2pManagement
    if (router.currentRoute.name === 'control') {
      store.dispatch(types.LOGOUT)
      router.push({ name: 'home' })
    }
    store.dispatch(types.POLL_WEB3, contract)
  })
}

const bountyCreatedListener = contract => {
  let txHash = null
  contract()
    .events.BountyCreated()
    .on('data', event => {
      if (txHash !== event.transactionHash) {
        txHash = event.transactionHash
        store.dispatch(types.UPDATE_BOUNTIES, contract)
      }
    })
}

const bountyClaimedListener = contract => {
  let txHash = null
  contract()
    .events.BountyClaimed()
    .on('data', event => {
      if (txHash !== event.transactionHash) {
        txHash = event.transactionHash
        store.dispatch(types.UPDATE_BOUNTIES, contract)
      }
    })
}

const pollCreatedListener = contract => {
  let txHash = null
  contract()
    .events.PollCreated()
    .on('data', event => {
      if (txHash !== event.transactionHash) {
        txHash = event.transactionHash
        store.dispatch(types.UPDATE_BOUNTIES, contract)
        store.dispatch(types.UPDATE_POLLS, contract)
      }
    })
}

const pollExecutedListener = contract => {
  let txHash = null
  contract()
    .events.PollExecuted()
    .on('data', event => {
      if (txHash !== event.transactionHash) {
        txHash = event.transactionHash
        store.dispatch(types.UPDATE_POLLS, contract)
      }
    })
}

const rewardAvailableListener = contract => {
  let txHash = null
  contract()
    .events.RewardAvailable()
    .on('data', event => {
      if (txHash !== event.transactionHash) {
        txHash = event.transactionHash
        store.dispatch(types.UPDATE_BOUNTIES, contract)
      }
    })
}

const rewardTransferedListener = contract => {
  let txHash = null
  contract()
    .events.RewardTransfered()
    .on('data', event => {
      if (txHash !== event.transactionHash) {
        txHash = event.transactionHash
        store.dispatch(types.UPDATE_BOUNTIES, contract)
      }
    })
}
