<template>
  <v-container>
    <h1 class="vtitle">
      Hello, {{ $store.state.auth.user.username }}
    </h1>
    <v-btn
      color="error"
      large
      :loading="update"
      @click="updateDashboard()"
    >
      Update Dashboard
    </v-btn>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <h1>Wallet</h1>
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
            <h1>Daily Missions</h1>
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
            <h1>Weekly Missions</h1>
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
      update: false,
      vp: 0,
      rp: 0
    }
  },

  mounted () {
    this.loadDashboard()
  },

  methods: {
    async loadDashboard () {
      const response = await this.$axios.get(`${this.$config.API_BASE}/valorant/getDashboard`, { headers: { discordid: this.$store.state.auth.user.id } })
      if (response.data.Status !== undefined) {
        if (response.data.Status === 'EMPTY') {
          this.$swal({
            icon: 'info',
            title: 'Hey!',
            text: 'Please click the Update button'
          })
        } else if (response.data.Status === 'FAILED') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.$t('not-link')
          })
          this.$router.go(-1)
        }
      } else {
        this.setMissions(response.data.missions)
        this.setWallet(response.data.wallet)
      }
    },

    async reauth () {
      const reauth = await this.$axios.get(`${this.$config.API_BASE}/valorant/reauth`, { headers: { discordid: this.$store.state.auth.user.id } })
      return reauth.data.Status
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
      this.vp = wallet.Balances['85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741']
      this.rp = wallet.Balances['e59aa87c-4cbf-517a-5983-6e81511be9b7']
    },

    async updateDashboard () {
      this.update = true
      this.$swal({
        title: 'Updating...',
        icon: 'info',
        text: 'Please leave the screen as it is until the end of the process.',
        allowOutsideClick: false,
        showConfirmButton: false
      })
      this.$swal.showLoading()
      const response = await this.$axios.get(`${this.$config.API_BASE}/valorant/updateDashboard`, { headers: { discordid: this.$store.state.auth.user.id } })
      if (response.data.Status.includes('Bad Request')) {
        this.$swal({
          title: 'Re-auth is in progress...',
          icon: 'info',
          text: 'Please leave the screen as it is until the end of the process.',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        this.$swal.showLoading()
        if (await this.reauth() === 'OK') {
          const missions = await this.$axios.get(`${this.$config.API_BASE}/valorant/updateDashboard`, { headers: { discordid: this.$store.state.auth.user.id } })
          this.$swal.hideLoading()
          if (missions.data.Status === 'OK') {
            this.$swal({
              icon: 'success',
              title: 'Updated!'
            })
            this.update = false
            this.dailymissions.splice(0)
            this.weeklymissions.splice(0)
            this.loadDashboard()
          } else {
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: missions.data.Status
            })
            this.update = false
          }
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.reauth()
          })
          this.update = false
        }
      } else if (response.data.Status === 'OK') {
        this.$swal.hideLoading()
        this.$swal({
          icon: 'success',
          title: 'Updated!'
        })
        this.update = false
        this.dailymissions.splice(0)
        this.weeklymissions.splice(0)
        this.loadDashboard()
      } else {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: response.data.Status
        })
        this.update = false
      }
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
