<template>
  <div id="app">
    <Sidebar />
    <Navbar />
    <div id="main">
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
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding-top: 45px;
  transition: margin-left 0.5s;
}
</style>

<script>
import Navbar from '@/components/Navbar/navbar'
import Sidebar from '@/components/Sidebar/sidebar'

export default {
  components: {
    Navbar,
    Sidebar
  },
  mounted() {
    this.$on('toggleSidebar', () => {
      if (document.getElementById('main').style.marginLeft === '200px') {
        document.getElementById('main').style.marginLeft = '0px'
      } else {
        document.getElementById('main').style.marginLeft = '200px'
      }
    })
  }
}
</script>
