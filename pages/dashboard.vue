<template>
  <v-container>
    <h1 class="vtitle">
      {{ $t('dashboard-title')}}, {{ $store.state.auth.user.username }}
    </h1>
    <v-btn
      color="error"
      large
      text
      @click="viewdate()"
    >
    <v-icon left>
      mdi-clock-check-outline
    </v-icon>
    <h3 v-text="date" />
    </v-btn>
    <v-row style="margin-top: 2px;">
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <h1>{{ $t('dashboard-wallet')}}</h1>
          <v-row>
            <v-col cols="12" sm="6">
              <h3>Valorant Points</h3>
              <v-card
                class="mx-auto d-flex flex-no-wrap justify-space-between"
                max-width="100%"
                outlined
              >
                <v-card-title><h1 v-text="vp" /></v-card-title>
                <v-avatar
                  class="ma-3"
                  size="80"
                  tile
                >
                  <v-img src="/images/vp.png" />
                </v-avatar>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <h3>Radianite Points </h3>
              <v-card
                class="mx-auto d-flex flex-no-wrap justify-space-between"
                max-width="100%"
                outlined
              >
                <v-card-title><h1 v-text="rp" /></v-card-title>
                <v-avatar
                  class="ma-3"
                  size="80"
                  tile
                >
                  <v-img src="/images/rp.png" />
                </v-avatar>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <h1>Coming Soon...</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <v-row>
            <h1>{{ $t('dashboard-daily') }}</h1>
            <v-col v-for="mission in dailymissions" v-bind:key="mission.title" cols="12">
              <v-card
                class="mx-auto"
                max-width="100%"
                outlined
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      {{ mission.title }} / +{{ mission.xpGrant }} XP
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ mission.progress }} / {{ mission.progressToComplete }} </v-list-item-subtitle>
                    <v-progress-linear :value="mission.progress / mission.progressToComplete * 100" color="error" />
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <v-row>
            <h1>{{ $t('dashboard-weekly') }}</h1>
            <v-col cols="12" v-if="weeklymissions[0] == undefined">
              <h3>
                There doesn't seem to be anything here.
              </h3>
            </v-col>
            <v-col v-for="mission in weeklymissions" v-bind:key="mission.title" cols="12">
              <v-card
                class="mx-auto"
                max-width="100%"
                outlined
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      {{ mission.title }} / +{{ mission.xpGrant }} XP
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ mission.progress }} / {{ mission.progressToComplete }} </v-list-item-subtitle>
                    <v-progress-linear :value="mission.progress / mission.progressToComplete * 100" color="error" />
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DashboardPage',
  middleware: 'auth',

  data () {
    return {
      dailymissions: [],
      weeklymissions: [],
      vp: 0,
      rp: 0,
      date: undefined
    }
  },

  mounted () {
    this.loadDashboard()
  },

  methods: {
    async loadDashboard () {
      const wallet = await this.$axios.get(`${this.$config.API_BASE}/valorant/getwallet`, { headers: { discordid: this.$store.state.auth.user.id } })
      if (wallet.data.status !== undefined) {
        if (wallet.data.status === 'FAILED') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.$t('not-link')
          })
          this.$router.go(-1)
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: wallet.data.status
          })
        }
      } else {
        this.setWallet(wallet.data)
        this.date = this.getDateFrom(wallet.data.date * 1000)
        const mission = await this.$axios.get(`${this.$config.API_BASE}/valorant/getmission`, { headers: { discordid: this.$store.state.auth.user.id } })
        this.setMissions(mission.data)
      }
    },

    setMissions (missions) {
      for (const k in missions.daily) {
        this.dailymissions.push(
          { title: missions.daily[k].title, xpGrant: missions.daily[k].xpGrant, progress: missions.daily[k].progress, progressToComplete: missions.daily[k].progressToComplete }
        )
      }
      for (const k in missions.weekly) {
        this.weeklymissions.push(
          { title: missions.weekly[k].title, xpGrant: missions.weekly[k].xpGrant, progress: missions.weekly[k].progress, progressToComplete: missions.weekly[k].progressToComplete }
        )
      }
    },

    setWallet (wallet) {
      this.vp = wallet.data.Balances['85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741']
      this.rp = wallet.data.Balances['e59aa87c-4cbf-517a-5983-6e81511be9b7']
    },

    getDateFrom (date) {
      const diff = new Date().getTime() - date
      const elapsed = new Date(diff)

      if (date === undefined) {
        return 'Unknown'
      }

      if (elapsed.getUTCFullYear() - 1970) {
        return elapsed.getUTCFullYear() - 1970 + ' years ago'
      } else if (elapsed.getUTCMonth()) {
        return elapsed.getUTCMonth() + ' months ago'
      } else if (elapsed.getUTCDate() - 1) {
        return elapsed.getUTCDate() - 1 + ' days ago'
      } else if (elapsed.getUTCHours()) {
        return elapsed.getUTCHours() + ' hours ago'
      } else if (elapsed.getUTCMinutes()) {
        return elapsed.getUTCMinutes() + ' minutes ago'
      } else if (elapsed.getUTCSeconds()) {
        return elapsed.getUTCSeconds() + ' seconds ago'
      } else {
        return 'just now'
      }
    },

    viewdate () {
      this.$swal({
        icon: 'info',
        title: 'Last updated time',
        text: this.date
      })
    }
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
