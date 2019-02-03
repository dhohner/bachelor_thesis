<template>
  <div class="bounties">
    <h1>Bounties</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi ad quod
      numquam corrupti vero similique facilis iure repellendus nihil cumque nemo
      a nulla, quisquam soluta debitis aspernatur temporibus aperiam
      perspiciatis?
    </p>
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
