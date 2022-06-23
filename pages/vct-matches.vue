<template>
  <v-container>
    <h1>VCT Matches</h1>
    <v-divider />
    <v-col cols="10" style="width: 100%">
      <v-data-table
        :headers="headers"
        :items="items"
        width="100%"
      />
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'VCTMatches',

  data () {
    return {
      headers: [
        {
          text: 'Date',
          value: 'date'
        },
        {
          text: 'Vs',
          value: 'vs'
        },
        {
          text: 'Score',
          value: 'score'
        },
        {
          text: 'Info',
          value: 'info'
        }
      ],
      items: []
    }
  },

  mounted () {
    this.load()
  },

  methods: {
    async load () {
      const response = await this.$axios.get(`${this.$config.API_BASE}/vct/matches`)
      const matches = response.data.data.segments
      for (const k in matches) {
        if (!matches[k].tournament_name.match('Champions Tour')) {
          continue
        }
        this.items.push(
          {
            date: matches[k].time_completed,
            vs: matches[k].team1 + '\r\n' + matches[k].team2,
            score: matches[k].score1 + '\r\n' + matches[k].score2,
            info: matches[k].round_info + '\r\n' + matches[k].tournament_name
          })
      }
    }
  }
}
</script>

<style scoped lang="css">
.v-data-table {
  white-space: pre-line;
}
</style>
