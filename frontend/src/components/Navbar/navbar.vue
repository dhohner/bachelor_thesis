<template>
  <ul>
    <li class="icon">
      <img src="@/assets/menu.svg" @click="toggleSidebar" />
    </li>
    <li class="link">
      <router-link :to="{ name: 'home' }" class="router-link">Home</router-link>
    </li>
    <li class="link">
      <router-link :to="{ name: 'about' }" class="router-link"
        >Bounties</router-link
      >
    </li>
    <li class="link">
      <router-link :to="{ name: 'about' }" class="router-link"
        >About</router-link
      >
    </li>
    <li class="account" v-if="authenticated === true" @click="logOut">
      <router-link :to="{ name: 'about' }" class="router-link"
        >LogOut</router-link
      >
    </li>
    <li class="account" v-if="authenticated !== true" @click="logIn">
      <router-link :to="{ name: 'about' }" class="router-link"
        >LogIn</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false
    }
  },
  methods: {
    toggleSidebar() {
      this.$parent.$emit('toggleSidebar')
    },
    logIn() {
      console.log('login')
      this.authenticated = true
    },
    logOut() {
      console.log('logout')
      this.authenticated = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/Navbar/navbar.scss';
</style>
