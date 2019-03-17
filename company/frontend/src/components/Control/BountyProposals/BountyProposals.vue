<template>
  <div class="bountyProposal">
    <div class="bountyProposal__createBounty">
      <div class="bountyProposal__title">Create New Bounty</div>
      <div
        class="button button--createBounty"
        @click="$emit('openProposalForm')"
      >
        Create New Bounty
      </div>
      <slot />
    </div>
    <hr class="separator" />
    <div class="bountyProposal__management">
      <div class="bountyProposal__title">Bounty Proposal TEST</div>
      <div class="createProposal__input">
        <label
          for="createProposal__input--address"
          class="createProposal__label createProposal__label--address"
          >Address:</label
        >
        <input
          type="text"
          class="createProposal__inputfield createProposal__inputfield--address"
          id="createProposal__input--address"
          v-model="address"
        />
      </div>
      <div class="button button--proposals" @click="createProposal">
        Create Proposal
      </div>
      <div class="button button--proposals" @click="getProposals">
        Get Open Proposals
      </div>
      <hr class="separator" />
      <div class="bountyProposal__title">Open Bounty Solutions</div>
      <table class="table" v-if="proposals.length !== 0">
        <thead>
          <tr>
            <th class="table__head">Bounty Address</th>
            <th class="table__head">Commit ID</th>
            <th class="table__head">Vote</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table__row" v-for="p in proposals" :key="p.idx">
            <td class="table__data">{{ p.author }}</td>
            <td class="table__data">{{ p.description }}</td>
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
