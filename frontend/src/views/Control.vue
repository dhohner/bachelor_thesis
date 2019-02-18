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
@import '../util/constants/variables';

.bountyControl {
  text-align: center;
}

.bountyControl--title {
  font-weight: 800;
  font-size: 2.5rem;
  color: $link-text-color;
}

.button--controlSwitch {
  width: 200px;
  padding: 0;
  box-shadow: none;
  background-color: white;
  border: 2px solid $navbar-background-color;
}

.bountyControl--subtitle {
  font-weight: 600;
  color: $link-text-color;
  font-size: 1.7rem;
}
</style>
