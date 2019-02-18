<template>
  <div class="bountyProposal">
    <div class="bountyProposal__title">Proposals</div>
    <div class="button button--createBounty" @click="$emit('openProposalForm')">
      Create New Bounty
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import './BountyProposal';
</style>
