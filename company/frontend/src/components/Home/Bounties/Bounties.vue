<template>
  <div class="bounties__management">
    <div class="bounties__title">Available Bounties</div>
    <table class="table" v-if="openBounties.length !== 0">
      <thead>
        <tr>
          <th class="table__head">Bounty</th>
          <th class="table__head">Description</th>
          <th class="table__head">Claim</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table__row" v-for="b in openBounties" :key="b.idx">
          <td class="table__data">{{ b.bounty }} ETH</td>
          <td class="table__data">Issue Number: {{ b.issue }}</td>
          <td class="table__data table__data--vote">
            <div
              v-on:click="claim(b.bountyAddress)"
              class="button button--table button--claim"
            >
              Claim
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="openBounties.length === 0">
      <thead>
        <tr>
          <th class="table__head">Bounties</th>
        </tr>
      </thead>
      <tbody>
        <td class="table__data">No Bounties found</td>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    bounties: state => state.bounties
  }),
  data() {
    return {
      openBounties: []
    }
  },
  methods: {
    async claim(address) {
      await this.$store.state
        .companyContract()
        .methods.claimBounty(address)
        .send({ from: this.$store.state.web3.coinbase })
    },
    filterBounties(rawBounties) {
      this.openBounties = []
      rawBounties.forEach(element => {
        if (element.claimee === '0x0000000000000000000000000000000000000000') {
          this.openBounties.push(element)
        }
      })
    }
  },
  watch: {
    bounties: {
      handler: function(rawBounties) {
        this.filterBounties(rawBounties)
      }
    }
  }
}
</script>

<style lang="scss">
@import './Bounties';
</style>
