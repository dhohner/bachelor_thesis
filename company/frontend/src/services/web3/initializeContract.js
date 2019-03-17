import { address, abi } from '@/util/contract'
import store from '@/store/'
import { INIT_CONTRACT } from '@/util/constants/types'

export const initializeContractHelper = async () => {
  let web3 = store.state.web3.web3Instance()
  let contract = await new web3.eth.Contract(abi, address)

  let payload = () => {
    return contract
  }

  return payload
}

export const initializeContract = async () => {
  store.dispatch(INIT_CONTRACT)
}
