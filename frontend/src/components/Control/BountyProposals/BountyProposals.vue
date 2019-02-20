<template>
  <div class="bountyProposal">
    <div class="bountyProposal__createBounty">
      <div class="bountyProposal__title">Create New Bounty</div>
      <div
        class="button button--createBounty"
        @click="$emit('openProposalForm')"
      >
        Create New Bounty
      </div>
      <slot />
    </div>
    <hr class="separator" />
    <div class="bountyProposal__management">
      <div class="bountyProposal__title">Open Bounty Solutions</div>
      <table class="table" v-if="proposals.length !== 0">
        <thead>
          <tr>
            <th class="table__head">Author</th>
            <th class="table__head">Description</th>
            <th class="table__head">Vote</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table__row" v-for="p in proposals" :key="p.idx">
            <td class="table__data">{{ p.author }}</td>
            <td class="table__data">{{ p.description }}</td>
            <td class="table__data table__data--vote">
              <div v-on:click="vote(p.id, true)" class="button button--table">
                Agree
              </div>
              <div v-on:click="vote(p.id, false)" class="button button--table">
                Disagree
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table" v-if="proposals.length === 0">
        <thead>
          <tr class="table__row">
            <th>Proposals</th>
          </tr>
        </thead>
        <tbody>
          <td class="table__data">No Proposals found</td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proposals: [
        {
          author: 'owner',
          description: 'test',
          id: 0,
          agrees: false
        },
        {
          author: 'owner',
          description: 'test',
          id: 0,
          agrees: false
        },
        {
          author: 'owner',
          description: 'test',
          id: 0,
          agrees: false
        }
      ]
    }
  },
  methods: {
    vote(id, agree) {
      console.log('vote for id: ' + id)
      console.log('vote with stance: ' + agree)
    }
  }
}
</script>

<style lang="scss">
@import './BountyProposal';
</style>
