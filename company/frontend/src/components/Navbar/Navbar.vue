<template>
  <div>
    <div class="navbar">
      <ul class="navbar__menu">
        <li class="navbar__menu-logo">
          <img src="@/assets/ethereum.svg" class="navbar__menu-logo-image" />
        </li>
        <li class="navbar__menu-left navbar__menu-title">
          <span class="navbar__menu-title-first">d</span>
          <span class="navbar__menu-title-second">Company</span>
        </li>
        <li class="navbar__menu-left navbar__menu-routes">
          <router-link :to="{ name: 'home' }" class="navbar__menu-left--link"
            >Home</router-link
          >
        </li>
        <li class="navbar__menu-left navbar__menu-routes" v-if="authenticated">
          <router-link :to="{ name: 'control' }" class="navbar__menu-left--link"
            >Control</router-link
          >
        </li>
        <li class="navbar__menu-left navbar__menu-routes">
          <router-link :to="{ name: 'about' }" class="navbar__menu-left--link"
            >About</router-link
          >
        </li>

        <li class="navbar__menu-right">
          <span
            class="navbar__menu-right-auth"
            v-if="!authenticated"
            @click="login"
            >LogIn</span
          >
          <span
            class="navbar__menu-right-auth"
            v-if="authenticated"
            @click="logout"
          >
            <router-link :to="{ name: 'home' }" class="navbar__menu-right--link"
              >LogOut</router-link
            >
          </span>
        </li>
        <li class="navbar__menu-right">
          <span class="navbar__menu-right-metamask-active" v-if="isInjected"
            >Connected</span
          >
          <span class="navbar__menu-right-metamask-inactive" v-if="!isInjected"
            >Connected</span
          >
        </li>
        <li class="navbar__menu-right">
          <span class="navbar__menu-right-network">{{ network }}</span>
        </li>
      </ul>
    </div>
    <slot class="content" name="router-view"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { NETWORKS } from '@/util/constants/networks'
import { AUTHENTICATE, LOGOUT } from '@/util/constants/types'

export default {
  computed: mapState({
    authenticated: state => state.authenticated,
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId]
  }),
  data() {
    return {}
  },
  methods: {
    login() {
      this.$store.dispatch(AUTHENTICATE)
    },
    logout() {
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>

<style lang="scss">
@import '@/components/Navbar/navbar.scss';
</style>
