<template>
  <div id="app">
    <Navbar>
      <router-view slot="router-view" />
    </Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
import * as types from '@/util/constants/types'
export default {
  name: 'app',
  components: {
    Navbar
  },
  beforeCreate() {
    this.$store.dispatch(types.INIT_CONNECTION)
  }
}
</script>

<style lang="scss">
@import './util/scss/main';
</style>
