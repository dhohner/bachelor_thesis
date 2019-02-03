<template>
  <div id="app">
    <Navbar>
      <Sidebar slot="sidebar" />
      <router-view slot="router-view" />
    </Navbar>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Fira Code', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Navbar from '@/components/Navbar/navbar'
import Sidebar from '@/components/Sidebar/sidebar'
import * as types from '@/util/constants/types'

export default {
  components: {
    Navbar,
    Sidebar
  },
  beforeCreate() {
    this.$store.dispatch(types.INIT_CONTRACT)
  }
}
</script>
