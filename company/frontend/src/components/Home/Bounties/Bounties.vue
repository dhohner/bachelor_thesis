<template>
  <div class="bounties__management">
    <div class="bounties__title">Available Bounties</div>
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
            <div
              v-on:click="claim(p.id, true)"
              class="button button--table button--claim"
            >
              Claim
            </div>
            <div
              v-on:click="claim(p.id, false)"
              class="button button--table button--claim"
            >
              Relinquish
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
    claim(id, status) {
      console.log('claiming bountyId: ' + id)
      console.log('with bountyStatus: ' + status)
    }
  }
}
</script>

<style lang="scss">
@import './Bounties';
</style>
