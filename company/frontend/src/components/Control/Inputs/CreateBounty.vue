<template>
  <div class="createBounty">
    <div class="bountyProposal__title">Create New Bounty</div>
    <div class="button button--createBounty" @click="$emit('openBountyForm')">
      Create New Bounty
    </div>
    <slot />
    <div class="button" @click="test">Test</div>
  </div>
</template>

<script>
export default {
  methods: {
    async test() {
      const bounties = await this.$store.state
        .companyContract()
        .methods.getBounties()
        .call()
      await this.$store.state
        .companyContract()
        .methods.claimBounty(bounties[0])
        .send({ from: this.$store.state.web3.coinbase })
      await this.$store.state
        .companyContract()
        .methods.provideSolution('0xab34c', bounties[0])
        .send({ from: this.$store.state.web3.coinbase })
    }
  }
}
</script>
