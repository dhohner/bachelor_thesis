<template>
  <div class="createBounty">
    <div class="createBounty__overlay" />
    <div class="createBounty__mask">
      <div class="createBounty__container">
        <h1 class="createBounty__title">Create Bounty</h1>
        <hr class="separator" />
        <div class="createBounty__input">
          <label
            for="createBounty__input--description"
            class="createBounty__label createBounty__label--description"
          >
            Description
          </label>
          <label
            for="createBounty__input--bounty"
            class="createBounty__label createBounty__label--bounty"
          >
            Reward
          </label>
          <input
            type="text"
            class="createBounty__inputfield createBounty__input--description"
            id="createBounty__input--description"
          />
          <input
            type="text"
            class="createBounty__inputfield createBounty__input--bounty"
            id="createBounty__input--bounty"
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
</template>

<script>
export default {
  methods: {
    submit() {
      console.log('submit')
    }
  }
}
</script>

<style lang="scss">
@import './CreateBounty';
</style>
