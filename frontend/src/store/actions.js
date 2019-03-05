import initializeConnection from '@/services/web3/initializeConnection'
import * as types from '@/util/constants/types'
import { initializeContractHelper } from '../services/web3/initializeContract'
import { authenticate } from '../services/authenticate'

export const actions = {
  async [types.INIT_CONNECTION]({ commit }) {
    let payload = await initializeConnection()
    commit(types.INIT_CONNECTION, payload)
  },
  async [types.INIT_CONTRACT]({ commit }) {
    let payload = await initializeContractHelper()
    commit(types.INIT_CONTRACT, payload)
  },
  async [types.AUTHENTICATE]({ commit }) {
    let payload = await authenticate()
    commit(types.AUTHENTICATE, payload)
  },
  [types.LOGOUT]({ commit }) {
    commit(types.LOGOUT)
  }
}
