<template>
  <v-container>
    <h1 class="vtitle">
      Daily Store / <span v-text="offerleft" />
    </h1>
    <p>{{ $t('store-update') }}</p>
    <v-btn
      color="error"
      large
      :loading="update"
      @click="updateStore()"
    >
      Update Stores
    </v-btn>
    <v-btn
      color="error"
      large
      outlined
      :to="'store-share?id=' + $store.state.auth.user.id"
      target="_blank"
    >
      Share this Store
    </v-btn>
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
    <v-row class="pt-5">
      <v-col v-for="weapon in storeoffers" v-bind:key="weapon.name" cols="12" sm="3">
        <v-card
          class="mx-auto c1"
          max-width="100%"
          outlined
          hover
          @click="viewvideo(weapon.videosrc)"
        >
          <v-img
            :src="/images/ + weapon.tierid + '.png'"
            height="250px"
            aspect-ratio="1.4"
            contain
          >
            <v-img
              :src="weapon.imgsrc"
              height="250px"
              class="align-end"
              aspect-ratio="1.4"
              contain
            >
              <v-card-title class="valofont">
                {{ weapon.name }}
              </v-card-title>
              <v-card-subtitle class="text-h6 text-decoration-underline">
                {{ weapon.vp }} VP
              </v-card-subtitle>
            </v-img>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <h1 v-if="bonusoffers[0] !== undefined" class="vtitle">
      Night Marcket / <span v-text="bonusleft" />
    </h1>
    <v-row v-if="bonusoffers[0] !== undefined">
      <v-col v-for="weapon in bonusoffers" v-bind:key="weapon.name" cols="6">
        <v-card
          class="mx-auto c2"
          max-width="100%"
          outlined
          hover
          @click="viewvideo(weapon.videosrc)"
        >
          <v-img
            :src="/images/ + weapon.tierid + '.png'"
            height="250px"
            aspect-ratio="1.4"
            contain
          >
            <v-img
              :src="weapon.imgsrc"
              height="250px"
              class="align-end"
              aspect-ratio="1.4"
              contain
            >
              <v-card-title class="valofont">
                {{ weapon.name }}
              </v-card-title>
              <v-card-subtitle class="text-h6 text-decoration-underline">
                {{ weapon.vp }} VP
              </v-card-subtitle>
            </v-img>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <h2 v-else>
      Night market is not open.
    </h2>
  </v-container>
</template>

<script>
export default {
  name: 'StorePage',
  middleware: 'auth',

  data () {
    return {
      storeoffers: [],
      bonusoffers: [],
      offerleft: '',
      bonusleft: '',
      offerleft2: 0,
      bonusleft2: 0,
      intervalId: undefined,
      update: false,
      date: undefined
    }
  },

  head () {
    return {
      title: 'Daily Store'
    }
  },

  mounted () {
    this.loadStores()
  },

  methods: {
    async loadStores () {
      const response = await this.$axios.get(`${this.$config.API_BASE}/valorant/getStore`, { headers: { discordid: this.$store.state.auth.user.id } })
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
        this.setStores(response.data)
      }
    },

    async reauth () {
      const reauth = await this.$axios.get(`${this.$config.API_BASE}/valorant/reauth`, { headers: { discordid: this.$store.state.auth.user.id } })
      return reauth.data.Status
    },

    getDateFrom (date) {
      const diff = new Date().getTime() - date
      const elapsed = new Date(diff)

      console.log(elapsed.getTime())

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

    setStores (stores) {
      let nightmarket = false
      for (const k in stores) {
        if ('offerleft' in stores[k]) {
          this.offerleft = this.getLeftTime(stores[k].offerleft)
          this.offerleft2 = stores[k].offerleft
          this.date = this.getDateFrom(stores[k].date)
          continue
        } else if ('BonusStore' in stores[k]) {
          nightmarket = true
          continue
        }
        this.storeoffers.push(
          { vp: stores[k].vp, name: stores[k].name, imgsrc: stores[k].imgsrc, videosrc: stores[k].videosrc, tierid: stores[k].tierid }
        )
      }
      if (nightmarket) {
        for (const k in stores[5].BonusStore) {
          if ('BonusLeft' in stores[5].BonusStore[k]) {
            this.bonusleft = this.getLeftTime(stores[5].BonusStore[k].BonusLeft)
            this.bonusleft2 = stores[5].BonusStore[k].BonusLeft
            continue
          }
          this.bonusoffers.push(
            { vp: stores[5].BonusStore[k].vp, vpold: stores[5].BonusStore[k].vpold, name: stores[5].BonusStore[k].name, imgsrc: stores[5].BonusStore[k].imgsrc, videosrc: stores[5].BonusStore[k].videosrc, tierid: stores[5].BonusStore[k].tierid }
          )
        }
        this.intervalId = setInterval(function () {
          this.offerleft2 = this.offerleft2 - 1
          this.offerleft = this.getLeftTime(this.offerleft2)
          this.bundleleft2 = this.bundleleft2 - 1
          this.bundleleft = this.getLeftTime(this.bundleleft2)
          this.bonusleft2 = this.bonusleft2 - 1
          this.bonusleft = this.getLeftTime(this.bonusleft2)
        }.bind(this), 1000)
      } else {
        this.intervalId = setInterval(function () {
          this.offerleft2 = this.offerleft2 - 1
          this.offerleft = this.getLeftTime(this.offerleft2)
          this.bundleleft2 = this.bundleleft2 - 1
          this.bundleleft = this.getLeftTime(this.bundleleft2)
        }.bind(this), 1000)
      }
    },

    viewvideo (src) {
      if (String(src) !== 'null') {
        const video = document.createElement('video')
        video.setAttribute('controls', '')
        video.src = src
        video.preload = 'metadata'
        video.style.width = '100%'
        video.autoplay = true
        video.loop = true
        this.$swal({
          html: video,
          width: '80%'
        })
      }
    },

    viewdate () {
      this.$swal({
        icon: 'info',
        title: 'Last updated time',
        text: this.date
      })
    },

    getLeftTime (time) {
      const num = time
      const timeD = Math.floor(num / (24 * 60 * 60))
      const timeH = Math.floor(num % (24 * 60 * 60) / (60 * 60))
      const timeM = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60)
      const timeS = num % (24 * 60 * 60) % (60 * 60) % 60
      const timeDMS = timeD + ' d, ' + timeH + ' h, ' + timeM + ' m, ' + timeS + ' s'
      return timeDMS
    },

    async updateStore () {
      this.update = true
      this.$swal({
        title: 'Updating...',
        icon: 'info',
        text: 'Please leave the screen as it is until the end of the process.',
        allowOutsideClick: false,
        showConfirmButton: false
      })
      this.$swal.showLoading()
      const response = await this.$axios.get(`${this.$config.API_BASE}/valorant/updateStore`, { headers: { discordid: this.$store.state.auth.user.id } })
      if (response.data.Status.includes('Bad Request')) {
        this.$swal({
          title: 'Re-auth is in progress...',
          icon: 'info',
          text: 'Please leave the screen as it is until the end of the process.',
          allowOutsideClick: false,
          showConfirmButton: false
        })
        this.$swal.showLoading()
        const reauth = await this.reauth()
        if (reauth === 'OK') {
          const stores = await this.$axios.get(`${this.$config.API_BASE}/valorant/updateStore`, { headers: { discordid: this.$store.state.auth.user.id } })
          this.$swal.hideLoading()
          if (stores.data.Status === 'OK') {
            this.$swal({
              icon: 'success',
              title: 'Updated!'
            })
            this.update = false
            this.storeoffers.splice(0)
            this.bonusoffers.splice(0)
            clearInterval(this.intervalId)
            this.loadStores()
          } else {
            this.$swal({
              icon: 'error',
              title: 'Error [E3]',
              text: stores.data.Status
            })
            this.update = false
          }
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error [E2]',
            text: reauth
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
        this.storeoffers.splice(0)
        this.bonusoffers.splice(0)
        clearInterval(this.intervalId)
        this.loadStores()
      } else {
        this.$swal({
          icon: 'error',
          title: 'Error [E1]',
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
