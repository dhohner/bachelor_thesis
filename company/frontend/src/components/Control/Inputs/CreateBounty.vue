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
      const polls = await this.$store.state
        .companyContract()
        .methods.getPolls()
        .call()
      console.log(polls)
    }
  }
}
</script>
