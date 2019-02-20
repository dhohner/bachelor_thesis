<template>
  <div class="bounties">
    <div class="bounties--title">dCompany Landing Page</div>
    <hr class="separator" />
    <Bounties />
  </div>
</template>

<script>
import Bounties from '@/components/Home/Bounties/Bounties'
export default {
  name: 'home',
  components: {
    Bounties
  }
}
</script>

<style lang="scss">
@import '../util/scss/variables';
.bounties {
  text-align: center;
}

.bounties--title {
  font-weight: 800;
  font-size: 2.8rem;
  color: $link-text-color-darkened;
  margin-bottom: 0.2em;
}
</style>
