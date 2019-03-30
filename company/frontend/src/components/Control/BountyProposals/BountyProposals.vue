<template>
  <div class="bountyProposal">
    <div class="bountyProposal__management">
      <div class="bountyProposal__title">Open Bounty Solutions</div>
      <table class="table" v-if="polls.length !== 0">
        <thead>
          <tr>
            <th class="table__head">Commit ID</th>
            <th class="table__head">Vote</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table__row" v-for="p in polls" :key="p.idx">
            <td class="table__data">{{ p.commit }}</td>
            <td class="table__data table__data--vote">
              <div
                v-on:click="vote(p.pollAddress, true)"
                class="button button--table"
              >
                Valid
              </div>
              <div
                v-on:click="vote(p.pollAddress, false)"
                class="button button--table"
              >
                Invalid
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table" v-if="polls.length === 0">
        <thead>
          <tr>
            <th class="table__head">Polls</th>
          </tr>
        </thead>
        <tbody>
          <td class="table__data">No Polls found</td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { UPDATE_POLLS } from '@/util/constants/types'

export default {
  computed: mapState({
    polls: state => state.polls
  }),
  props: ['contract'],
  methods: {
    async vote(address, agree) {
      console.log('vote for id: ' + address)
      console.log('vote with stance: ' + agree)
      await this.contract()
        .methods.vote(agree, address)
        .send({ from: this.$store.state.web3.coinbase })
    }
  },
  mounted() {
    if (this.contract) {
      this.$store.dispatch(UPDATE_POLLS, this.contract)
    }
  }
}
</script>

<style lang="scss">
@import './BountyProposal';
</style>
