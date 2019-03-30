import store from '@/store/'

export const authenticate = async () => {
  const memberId = await store.state
    .companyContract()
    .methods.validMember(store.state.web3.coinbase)
    .call()
  return memberId
}
