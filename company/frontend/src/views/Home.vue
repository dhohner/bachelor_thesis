<template>
  <div class="bounties">
    <div class="bounties--title">dCompany Bounties</div>
    <hr class="separator" />
    <hr class="separator" />
    <Bounties />
    <hr class="separator" />
    <UserBounties :contract="dCompanyInstance" />
  </div>
</template>

<script>
import Bounties from '@/components/Home/Bounties/Bounties'
import UserBounties from '@/components/Home/ClaimedBounties/ClaimedBounties'
import { mapState } from 'vuex'
import { UPDATE_BOUNTIES } from '@/util/constants/types'

export default {
  name: 'home',
  computed: mapState({
    dCompanyInstance: state => state.companyContract
  }),
  components: {
    Bounties,
    UserBounties
  },
  watch: {
    dCompanyInstance: {
      handler: function(contract) {
        if (contract) {
          this.$store.dispatch(UPDATE_BOUNTIES, contract)
        }
      }
    }
  },
  mounted() {
    if (this.dCompanyInstance) {
      this.$store.dispatch(UPDATE_BOUNTIES, this.dCompanyInstance)
    }
  }
}
</script>

<style lang="scss">
@import '../util/scss/variables';
.bounties {
  text-align: center;
}

.bounties--title {
  font-weight: 600;
  font-size: 2.8rem;
  color: $link-text-color-darkened;
  margin-bottom: 0.2em;
}
</style>
