<template>
  <v-container>
    <div style="text-align: center">
      <adsbygoogle
        :ad-slot="'8740225833'"
        :ad-format="'horizontal'"
      />
    </div>
    <h1>
      Welcome, {{ $store.state.auth.user.username }}
    </h1>
    <p class="grey--text" style="font-size: 12px">
      Updated Stats: {{ stats_date }}
    </p>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto"
        >
          <v-card-title>
            <v-icon
              class="mr-12"
              size="64"
              color="primary"
            >
              mdi-account-group
            </v-icon>
            <v-row align="start">
              <div class="text-caption grey--text text-uppercase">
                Submited Users
              </div>
              <div>
                <span
                  class="text-h3 font-weight-black"
                  v-text="users"
                ></span>
                <strong>users</strong>
              </div>
            </v-row>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto"
        >
          <v-card-title>
            <v-icon
              class="mr-12"
              size="64"
              color="primary"
            >
              mdi-cart
            </v-icon>
            <v-row align="start">
              <div class="text-caption grey--text text-uppercase">
                Saved Stores
              </div>
              <div>
                <span
                  class="text-h3 font-weight-black"
                  v-text="saved"
                ></span>
                <strong>stores</strong>
              </div>
            </v-row>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto"
        >
          <v-card-title>
            <v-icon
              class="mr-12"
              size="64"
              color="primary"
            >
              mdi-radar
            </v-icon>
            <v-row align="start">
              <div class="text-caption grey--text text-uppercase">
                Tracked Stats
              </div>
              <div>
                <span
                  class="text-h3 font-weight-black"
                  v-text="tracked"
                ></span>
                <strong>tracks</strong>
              </div>
            </v-row>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <div style="text-align: center">
      <adsbygoogle
        :ad-slot="'5696642981'"
        :ad-format="'horizontal'"
      />
    </div>
    <v-card
      elevation="2"
      class="pa-3 mt-10"
      width="100%"
    >
      <BarChart v-if="!loading" :data="barChartData" :options="barChartOptions" :height="500" />
      <p>{{ $t('dashboard_stats') }}</p>
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
      />
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardPage',
  middleware: 'auth',

  head () {
    return {
      title: 'Dashboard'
    }
  },

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
      loading: true,
      headers: [
        {
          text: 'Rank',
          value: 'rank'
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

  async asyncData ({ $axios }) {
    const response = await $axios.$get('/stats')
    return { users: response.data.users, saved: response.data.daily, tracked: response.data.store_stats, stats_date: response.date }
  },

  async mounted () {
    const stats = await this.$axios.$get('/ranking')
    for (const k in stats.data) {
      this.barChartData.labels.push(stats.data[k].name)
      this.barChartData.datasets[0].data.push(stats.data[k].count)
      this.items.push({ rank: stats.data[k].rank, name: stats.data[k].name, count: stats.data[k].count, image: 'https://s3.valorantstore.net/skins/' + stats.data[k].uuid + '.png' })
    }
    this.loading = false
  }
}
</script>
