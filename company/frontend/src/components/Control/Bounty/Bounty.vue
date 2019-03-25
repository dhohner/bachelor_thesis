<template>
  <div class="bountyProposal">
    <div class="bountyProposal__management">
      <div class="bountyProposal__title">Provide Reward</div>
      <table class="table" v-if="bounties.length !== 0">
        <thead>
          <tr>
            <th class="table__head">Bounty Address</th>
            <th class="table__head">Reward</th>
            <th class="table__head">Deposit</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table__row" v-for="b in bounties" :key="b.idx">
            <td class="table__data">{{ b.address }}</td>
            <td class="table__data">{{ p.reward }}</td>
            <td class="table__data table__data--vote">
              <div v-on:click="vote(p.id, true)" class="button button--table">
                Valid
              </div>
              <div v-on:click="vote(p.id, false)" class="button button--table">
                Invalid
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table" v-if="proposals.length === 0">
        <thead>
          <tr class="table__row">
            <th>Proposals</th>
          </tr>
        </thead>
        <tbody>
          <td class="table__data">No Proposals found</td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: null,
      proposals: []
    }
  },
  methods: {
    vote(id, agree) {
      console.log('vote for id: ' + id)
      console.log('vote with stance: ' + agree)
    },
    async createProposal() {
      if (this.address === null) {
        console.log('provide an address')
      }
      await this.$store.state
        .companyContract()
        .methods.createBountyProposal(this.address)
        .send({ from: this.$store.state.web3.coinbase })
    },
    async getProposals() {
      console.log('getting proposals')
      let proposals = await this.$store.state
        .companyContract()
        .methods.getProposals()
        .call()

      for (let i = 0; i < proposals.length; i++) {
        let data = {
          author: proposals[i],
          description: 'd34db3a' + i,
          id: i,
          agrees: false
        }
        this.proposals.push(data)
      }
    }
  }
}
</script>

<style lang="scss">
@import './BountyProposal';
</style>
