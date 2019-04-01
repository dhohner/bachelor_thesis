<template>
  <div class="bountyControl">
    <div class="bountyControl--title">dCompany Control</div>
    <hr class="separator" />
    <hr class="separator" />
    <CreateBounty @openBountyForm="createProposal_active = true">
      <transition>
        <CreateBountyOverlay
          v-if="createProposal_active"
          @closeProposalForm="createProposal_active = false"
          :contract="dCompanyInstance"
        />
      </transition>
    </CreateBounty>
    <hr class="separator" />
    <BountyProposals :contract="dCompanyInstance" />
    <hr class="separator" />
    <Members :contract="dCompanyInstance" />
  </div>
</template>

<script>
import CreateBounty from '@/components/Control/Inputs/CreateBounty'
import BountyProposals from '@/components/Control/BountyProposals/BountyProposals'
import CreateBountyOverlay from '@/components/Control/Inputs/createBountyOverlay'
import Members from '@/components/Control/Members'
import { mapState } from 'vuex'

export default {
  computed: mapState({
    dCompanyInstance: state => state.companyContract
  }),
  data() {
    return {
      createProposal_active: false
    }
  },
  components: {
    CreateBounty,
    BountyProposals,
    CreateBountyOverlay,
    Members
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
  font-weight: 600;
  font-size: 2.8rem;
  color: $link-text-color-darkened;
  margin-bottom: 0.2em;
}
</style>
