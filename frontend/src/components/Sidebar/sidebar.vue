<template>
  <nav class="nav-left" aria-expanded="false">
    <ul>
      <li class="title">Title</li>
      <li class="link">
        <router-link
          :to="{ name: 'home' }"
          class="router-link"
          style="margin-top: 14px"
          >Home</router-link
        >
      </li>
      <li class="link">
        <router-link :to="{ name: 'home' }" class="router-link"
          >Home</router-link
        >
      </li>
      <li class="link">
        <router-link :to="{ name: 'home' }" class="router-link"
          >Home</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  mounted() {
    this.$parent.$on('toggleSidebar', () => {
      const navbar = document.querySelector('.nav-left')
      if (navbar.getAttribute('aria-expanded') === 'false') {
        navbar.setAttribute('aria-expanded', 'true')
      } else {
        navbar.setAttribute('aria-expanded', 'false')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/Sidebar/sidebar.scss';
</style>
