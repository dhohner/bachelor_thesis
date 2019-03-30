<template>
  <div class="createBounty">
    <div class="createBounty__mask">
      <div class="createBounty__wrapper">
        <div class="createBounty__container">
          <h1 class="createBounty__title">Create Bounty</h1>
          <hr class="separator" />
          <hr class="separator" />
          <div class="createBounty__input">
            <label
              for="createBounty__input--description"
              class="createBounty__label createBounty__label--description"
              >Issue Number</label
            >
            <label
              for="createBounty__input--bounty"
              class="createBounty__label createBounty__label--bounty"
              >Reward</label
            >
            <input
              type="text"
              class="createBounty__inputfield createBounty__input--description"
              id="createBounty__input--description"
              placeholder="Issue Number"
              v-model="issue"
            />
            <input
              type="text"
              class="createBounty__inputfield createBounty__input--bounty"
              id="createBounty__input--bounty"
              placeholder="Bounty in ETH"
              v-model="amount"
            />
          </div>
          <div class="createBounty__buttons">
            <div
              class="button control__button--reset"
              @click="$emit('closeProposalForm')"
            >
              Close
            </div>
            <div class="button control__button--submit" @click="submit">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: null,
      issue: null
    }
  },
  props: ['contract'],
  methods: {
    async submit() {
      const payment = this.$store.state.web3
        .web3Instance()
        .utils.toWei(this.amount, 'ether')
      const issue = parseInt(this.issue, 10)
      this.$emit('closeProposalForm')
      await this.contract()
        .methods.createBounty(issue)
        .send({ value: payment, from: this.$store.state.web3.coinbase })
    }
  }
}
</script>

<style lang="scss">
@import './CreateBountyOverlay';
</style>
