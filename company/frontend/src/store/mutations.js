import * as types from '@/util/constants/types'
import { initializeContract } from '../services/web3/initializeContract'
import { companyEventListeners } from '../services/eventListeners'
import { getBounties } from '../services/web3/getBounties'

export const mutations = {
  [types.INIT_CONNECTION](state, payload) {
    state.web3.isInjected = payload.isInjected
    state.web3.networkId = payload.networkId
    state.web3.coinbase = payload.coinbase
    state.web3.web3Instance = payload.web3Instance
    initializeContract()
  },
  [types.INIT_CONTRACT](state, payload) {
    state.companyContract = payload
    getBounties(payload)
    companyEventListeners(payload)
  },
  [types.POLL_WEB3](state, payload) {
    state.web3.networkId = payload.networkId
    state.web3.coinbase = payload.coinbase
  },
  [types.AUTHENTICATE](state, payload) {
    state.authenticated = payload
  },
  [types.LOGOUT](state) {
    state.authenticated = false
  },
  [types.UPDATE_BOUNTIES](state, payload) {
    state.bounties = payload
  },
  [types.UPDATE_POLLS](state, payload) {
    state.polls = payload
  }
}
