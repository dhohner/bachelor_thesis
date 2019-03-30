<template>
  <div class="bounties__management">
    <div class="bounties__title">Claimed Bounties</div>
    <table class="table" v-if="userBounties.length !== 0">
      <thead>
        <tr>
          <th class="table__head">Bounty</th>
          <th class="table__head">Description</th>
          <th class="table__head">Solution Commit ID</th>
          <th class="table__head">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table__row" v-for="b in userBounties" :key="b.idx">
          <td class="table__data">{{ b.bounty }} ETH</td>
          <td class="table__data">Issue Number: {{ b.issue }}</td>
          <td class="table__data">
            <input
              type="text"
              class="solution__input"
              v-model="b.solution"
              placeholder="solution in format '2e0ee73'"
              v-if="b.commit.length === 0"
            />
            <div v-if="b.commit.length !== 0">Solution submitted</div>
          </td>
          <td class="table__data table__data--vote">
            <div
              v-on:click="submit(b.solution, b.bountyAddress)"
              class="button button--table button--claim"
              v-if="b.commit.length === 0"
            >
              Submit
            </div>
            <div v-if="b.commit.length !== 0 && b.withdrawAmount === 0">
              Review Pending
            </div>
            <div
              v-on:click="withdraw(b.bountyAddress)"
              class="button button--table button--claim"
              v-if="b.withdrawAmount > 0"
            >
              Withdraw
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="userBounties.length === 0">
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
  props: ['contract'],
  data() {
    return {
      userBounties: []
    }
  },
  methods: {
    filterBounties(rawBounties) {
      this.userBounties = []
      rawBounties.forEach(element => {
        if (
          String(element.claimee).toUpperCase() ===
          String(this.$store.state.web3.coinbase).toUpperCase()
        ) {
          this.userBounties.push(element)
        }
      })
    },
    async submit(solution, address) {
      await this.contract()
        .methods.provideSolution(solution, address)
        .send({ from: this.$store.state.web3.coinbase })
    },
    async withdraw(address) {
      await this.contract()
        .methods.withdraw(address)
        .send({ from: this.$store.state.web3.coinbase })
    }
  },
  watch: {
    bounties: {
      handler: function(rawBounties) {
        this.filterBounties(rawBounties)
      }
    }
  },
  mounted() {
    this.filterBounties(this.bounties)
  }
}
</script>

<style lang="scss">
@import './ClaimedBounties';
</style>
