import initializeConnection from '@/services/web3/initializeConnection'
import * as types from '@/util/constants/types'
import { initializeContractHelper } from '../services/web3/initializeContract'
import { authenticate } from '../services/authenticate'
import { pollHelper } from '@/services/eventListeners'
import { getBountiesHelper } from '../services/web3/getBounties'
import { getPollsHelper } from '../services/web3/getPolls'

export const actions = {
  async [types.INIT_CONNECTION]({ commit }) {
    let payload = await initializeConnection()
    commit(types.INIT_CONNECTION, payload)
  },
  async [types.INIT_CONTRACT]({ commit }) {
    let payload = await initializeContractHelper()
    commit(types.INIT_CONTRACT, payload)
  },
  async [types.POLL_WEB3]({ commit }) {
    const payload = await pollHelper()
    commit(types.POLL_WEB3, payload)
  },
  async [types.AUTHENTICATE]({ commit }) {
    let payload = await authenticate()
    commit(types.AUTHENTICATE, payload)
  },
  [types.LOGOUT]({ commit }) {
    commit(types.LOGOUT)
  },
  async [types.UPDATE_BOUNTIES]({ commit }, contract) {
    const payload = await getBountiesHelper(contract)
    commit(types.UPDATE_BOUNTIES, payload)
  },
  async [types.UPDATE_POLLS]({ commit }, contract) {
    const payload = await getPollsHelper(contract)
    commit(types.UPDATE_POLLS, payload)
  }
}
