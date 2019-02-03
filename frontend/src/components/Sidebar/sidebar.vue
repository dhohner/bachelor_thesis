<template>
  <transition>
    <nav class="sidebar" v-if="isShowing">
      <ul>
        <li class="sidebar-title">Navigation</li>
        <li class="sidebar-item-link">
          <router-link
            :to="{ name: 'home' }"
            class="router-link"
            style="margin-top: 14px"
            >Home</router-link
          >
        </li>
        <li class="sidebar-item-link">
          <router-link :to="{ name: 'bounties' }" class="router-link"
            >Bounties</router-link
          >
        </li>
        <li class="sidebar-item-link">
          <router-link :to="{ name: 'about' }" class="router-link"
            >About</router-link
          >
        </li>
      </ul>
      <SidebarOverlay slot="sidebar-open-overlay" />
    </nav>
  </transition>
</template>

<script>
import SidebarOverlay from '@/components/Sidebar/sidebar-overlay'
export default {
  components: {
    SidebarOverlay
  },
  data() {
    return {
      isShowing: false
    }
  },
  mounted() {
    this.$parent.$on('toggleSidebar', () => {
      this.isShowing = !this.isShowing
    }),
      this.$parent.$on('hideSidebar', () => {
        this.isShowing = false
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/Sidebar/sidebar.scss';
</style>
