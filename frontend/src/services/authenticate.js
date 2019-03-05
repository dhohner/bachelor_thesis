import store from '@/store/'

export const authenticate = async () => {
  let memberId = parseInt(
    await store.state
      .companyContract()
      .methods.memberId(store.state.web3.coinbase)
      .call(),
    10
  )
  return memberId !== 0 ? true : false
}
