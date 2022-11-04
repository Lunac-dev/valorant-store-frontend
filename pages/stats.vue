<template>
  <v-container>
    <h1 class="vtitle">
      {{ $t('navbar-stats') }}
    </h1>
    <v-card
      elevation="2"
      class="pa-5"
      width="100%"
    >
      <BarChart v-if="!loading" :data="barChartData" :options="barChartOptions" :height="500" />
      <p class="grey--text" style="font-size: 12px">
        Update: {{ date }}
      </p>
    </v-card>
    <v-card
      elevation="2"
      class="pa-5 mt-5"
      width="100%"
    >
      <v-data-table
        class="mt-5"
        :headers="headers"
        :items="items"
      >
        <template v-slot:[`item.image`]="{ item }">
          <v-img
            :src="item.image"
            aspect-ratio="1.4"
            contain
            height="5vw"
            min-height="100px"
            width="16vw"
            min-width="160px"
            class="ma-0 pa-0"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'StatsPage',

  data () {
    return {
      barChartData: {
        labels: [],
        datasets: [
          {
            label: 'Count',
            data: [],
            backgroundColor: 'rgb(253, 69, 86)',
            borderColor: 'rgb(189, 57, 68)',
            borderWidth: 2
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      date: null,
      loading: true,
      headers: [
        {
          text: 'Rank',
          value: 'rank'
        },
        {
          text: 'Image',
          align: 'start',
          sortable: false,
          value: 'image',
          width: '30%'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Count',
          value: 'count'
        }
      ],
      items: []
    }
  },

  head () {
    return {
      title: 'Stats'
    }
  },

  async mounted () {
    const stats = await this.$axios.get(`${this.$config.API_BASE}/ranking`)
    for (const k in stats.data.data) {
      this.barChartData.labels.push(stats.data.data[k].name)
      this.barChartData.datasets[0].data.push(stats.data.data[k].count)
      this.items.push({ rank: stats.data.data[k].rank, name: stats.data.data[k].name, count: stats.data.data[k].count, image: 'https://s3.valorantstore.net/skins/' + stats.data.data[k].uuid + '.png' })
    }
    this.date = stats.data.date
    this.loading = false
  }
}
</script>

<style scoped lang="css">
.valofont {
  color: #ff4655;
  font-family: 'VALORANT', sans-serif;
}

.vtitle {
  font-size: 5vh;
}
</style>
