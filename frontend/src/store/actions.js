import * as types from '@/util/constants/types'

import initializeConnection from '@/util/initializeConnection'

export default {
  async [types.INIT_CONTRACT]({ commit }) {
    let payload = await initializeConnection()
    commit(types.INIT_CONTRACT, payload)
  }
}
