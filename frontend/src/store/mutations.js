import * as types from '@/util/constants/types'

export default {
  [types.INIT_CONTRACT](state, payload) {
    console.log(payload)
    state.web3.isInjected = payload.web3.isInjected
    state.web3.networkID = payload.web3.networkID
    state.web3.coinbase = payload.web3.coinbase
    state.web3.balance = payload.web3.balance
    state.web3.web3Instance = payload.web3.web3Instance
    console.log('finished')
  }
}
