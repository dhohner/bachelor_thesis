<template>
  <div class="memberManagement">
    <div class="members__title">Add / Remove Employee</div>
    <div class="member__input">
      <label for="member__input--address" class="member__label"
        >Member Address:</label
      >
      <input
        type="text"
        class="member__inputfield"
        id="member__input--address"
        placeholder="MemberAddress"
        v-model="address"
      />
      <div class="button button--addMember" @click="add()">Add</div>
      <div class="button button--removeMember" @click="remove()">Remove</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: null
    }
  },
  props: ['contract'],
  methods: {
    async add() {
      if (this.address !== null && this.contract) {
        await this.contract()
          .methods.addMember(this.address)
          .send({ from: this.$store.state.web3.coinbase })
      }
      this.address = null
    },
    async remove() {
      if (this.address !== null && this.contract) {
        await this.contract()
          .methods.removeMember(this.address)
          .send({ from: this.$store.state.web3.coinbase })
      }
      this.address = null
    }
  }
}
</script>

<style lang="scss">
@import './Members';
</style>
