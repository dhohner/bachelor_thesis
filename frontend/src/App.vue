<template>
  <div id="app">
    <Navbar />
    <div id="nav">
      <router-view />
    </div>
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
#nav {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding-top: 45px;
}
</style>

<script>
import Navbar from '@/components/navbar'

export default {
  components: {
    Navbar
  }
}
</script>
