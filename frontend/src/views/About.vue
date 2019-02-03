<template>
  <div class="about">
    <h1>About</h1>
    <p>This is an About Page</p>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.$parent.$emit('hideSidebar')
  }
}
</script>
