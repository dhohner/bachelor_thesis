<template>
  <div class="createBounty">
    <div class="bountyProposal__title">Create New Bounty</div>
    <div class="button button--createBounty" @click="$emit('openBountyForm')">
      Create New Bounty
    </div>
    <slot />
  </div>
</template>
