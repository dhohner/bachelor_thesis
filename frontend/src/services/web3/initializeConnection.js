import getWeb3 from './getWeb3'

export default async () => {
  let web3 = await getWeb3()

  let payload = {
    isInjected: null,
    networkId: null,
    coinbase: null,
    web3Instance: null
  }

  payload.isInjected = await web3.eth.net.isListening()
  payload.networkId = await web3.eth.net.getId()
  payload.coinbase = await await web3.eth.getCoinbase()
  payload.web3Instance = () => {
    return web3
  }

  return payload
}
