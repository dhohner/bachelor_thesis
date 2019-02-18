import { INIT_CONNECTION } from '@/util/constants/types'

export const mutations = {
  [INIT_CONNECTION](state, payload) {
    state.web3.isInjected = payload.isInjected
    state.web3.networkId = payload.networkId
    state.web3.coinbase = payload.coinbase
    state.web3.web3Instance = payload.web3Instance
  }
}
