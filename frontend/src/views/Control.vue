<template>
  <div class="bountyControl">
    <div class="bountyControl--title">dCompany Control</div>
    <hr class="separator" />
    <BountyProposals @openProposalForm="createProposal_active = true">
      <transition>
        <CreateBounty
          v-if="createProposal_active"
          @closeProposalForm="createProposal_active = false"
        />
      </transition>
    </BountyProposals>
  </div>
</template>

<script>
import CreateBounty from '@/components/Control/Inputs/CreateBounty'
import BountyProposals from '@/components/Control/BountyProposals/BountyProposals'
export default {
  data() {
    return {
      createProposal_active: false
    }
  },
  components: {
    CreateBounty,
    BountyProposals
  }
}
</script>

<style lang="scss">
@import '../util/scss/variables';

.v-enter-active {
  transition: opacity 0.2s ease-in;
}
.v-leave-active {
  transition: opacity 0.3s ease-out;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}

.bountyControl {
  text-align: center;
}

.bountyControl--title {
  font-weight: 800;
  font-size: 2.8rem;
  color: $link-text-color-darkened;
  margin-bottom: 0.2em;
}
</style>
