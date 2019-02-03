<template>
  <div>
    <nav>
      <ul>
        <li class="navbar-icon">
          <img src="@/assets/menu.svg" @click="toggleSidebar" />
        </li>
        <li class="navbar-title">
          <router-link :to="{ name: 'home' }" id="title">
            <span class="navbar-title-first">decentralized</span>
            <span class="navbar-title-second">Company</span>
          </router-link>
        </li>

        <li
          class="navbar-account"
          v-if="authenticated === true"
          @click="logOut"
        >
          <router-link :to="{ name: 'about' }" class="router-link"
            >LogOut</router-link
          >
        </li>
        <li class="navbar-account" v-if="authenticated !== true" @click="logIn">
          <router-link :to="{ name: 'about' }" class="router-link"
            >LogIn</router-link
          >
        </li>
        <li class="navbar-network" v-if="network !== null">
          <span>{{ network }}</span>
        </li>
        <li class="navbar-balance" v-if="balance !== null">
          <span>{{ balance }}</span>
          <span id="eth">ETH</span>
        </li>
        <li class="navbar-has-metamask" v-if="isInjected">Connected</li>
        <li class="navbar-has-no-metamask" v-if="!isInjected">Connected</li>
      </ul>
    </nav>
    <div class="router-view-slotted">
      <slot name="sidebar">
        <slot name="sidebar-open-overlay"></slot>
      </slot>
      <slot name="router-view"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { NETWORKS } from '@/util/constants/networks'

export default {
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    balance: state => state.web3.balance,
    network: state => NETWORKS[state.web3.networkID]
  }),
  data() {
    return {
      authenticated: false
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
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
