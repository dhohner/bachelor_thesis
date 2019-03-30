import store from '@/store/'
import { UPDATE_BOUNTIES } from '../../util/constants/types'

export const getBountiesHelper = async contract => {
  const bounties = await contract()
    .methods.getBounties()
    .call()
  const bountyParameters = []

  if (bounties.length !== 0) {
    await Promise.all(
      bounties.map(async element => {
        const prop = await contract()
          .methods.getBountyParameters(element)
          .call()
        prop.bounty = parseInt(prop.bounty, 10) / 10 ** 18
        prop.withdrawAmount = parseInt(prop.withdrawAmount, 10) / 10 ** 18
        bountyParameters.push(prop)
      })
    )
  }
  return bountyParameters
}

export const getBounties = contract => {
  store.dispatch(UPDATE_BOUNTIES, contract)
}
