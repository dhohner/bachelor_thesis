import store from '@/store/'
import { UPDATE_POLLS } from '../../util/constants/types'

export const getPollsHelper = async contract => {
  const polls = await contract()
    .methods.getPolls()
    .call()
  const pollsWithParams = []

  if (polls.length !== 0) {
    await Promise.all(
      polls.map(async element => {
        const prop = await contract()
          .methods.getPollParameters(element)
          .call()
        pollsWithParams.push(prop)
      })
    )
  }

  return pollsWithParams
}

export const getBounties = contract => {
  store.dispatch(UPDATE_POLLS, contract)
}
