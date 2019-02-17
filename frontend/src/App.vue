<template>
  <div id="app">
    <Navbar>
      <router-view slot="router-view" />
    </Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: 'Lucida Sans Unicode';
  font-weight: 400;
  padding: 0;
  margin-top: 44px;
}
</style>
