<template>
  <div>
    <h1>Home</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi ad quod
      numquam corrupti vero similique facilis iure repellendus nihil cumque nemo
      a nulla, quisquam soluta debitis aspernatur temporibus aperiam
      perspiciatis?
    </p>
    <button @click="init">Test</button>
  </div>
</template>

<script>
import initializeConnection from '@/util/initializeConnection'
export default {
  components: {},
  methods: {
    async init() {
      let payload = await initializeConnection()
      console.log(payload.web3.web3Instance())
    }
  },
  mounted() {
    this.$parent.$emit('hideSidebar')
  }
}
</script>
