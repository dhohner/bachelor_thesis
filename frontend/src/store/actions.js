import initializeConnection from '@/services/web3/initializeConnection'
import { INIT_CONNECTION } from '@/util/constants/types'

export const actions = {
  async [INIT_CONNECTION]({ commit }) {
    let payload = await initializeConnection()
    commit(INIT_CONNECTION, payload)
  }
}
