<template>
  <v-container>
    <v-overlay v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
      >
        Loading...
      </v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col cols="12" sm="6">
        <h1>
          {{ $t('store_title') }}
        </h1>
        <p>
          {{ $t('store_description') }}
        </p>
        <p class="grey--text" style="font-size: 12px">
          Updated Store: {{ date }}
        </p>
        <v-btn
          color="primary"
          large
          outlined
          style="margin-left: 7 px;"
          @click="twitterShare()"
        >
          <v-icon>
            mdi-twitter
          </v-icon>
          {{ $t('store_share') }}
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
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
                <v-icon x-large>
                  mdi-currency-usd
                </v-icon>
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
                <v-icon x-large>
                  mdi-gamepad-variant-outline
                </v-icon>
              </v-avatar>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-card
      class="mx-auto"
      max-width="100%"
    >
      <a href="/">
        <v-img
          height="450"
          src="/img/bg3.jpg"
        />
      </a>
    </v-card>
    <v-row class="pt-5">
      <v-col v-for="weapon in storeoffers" v-bind:key="weapon.name" cols="12" sm="3">
        <v-card
          hover
          @click="viewskin(weapon.uuid)"
        >
          <v-img
            src="/img/icon.png"
            height="200px"
            aspect-ratio="2"
            contain
          >
            <v-card-subtitle class="align-start text-right">
              <v-chip
                color="primary"
                :ripple="false"
              >
                <v-avatar left>
                  <v-img src="/img/vp.png" />
                </v-avatar>
                {{ weapon.vp }}
              </v-chip>
            </v-card-subtitle>
          </v-img>
          <v-card-title class="align-end font-weight-black primary--text">
            {{ weapon.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <div style="text-align: center">
      <adsbygoogle
        :ad-slot="'3401103391'"
      />
    </div>
    <h1 v-if="bonusoffers[0] !== undefined">
      {{ $t('store_night_market') }}
    </h1>
    <v-row v-if="bonusoffers[0] !== undefined">
      <v-col v-for="weapon in bonusoffers" v-bind:key="weapon.name" cols="12" sm="4">
        <v-card
          hover
          @click="viewskin(weapon.uuid)"
        >
          <v-img
            src="/img/icon.png"
            height="300px"
            aspect-ratio="2"
            contain
          >
            <v-card-subtitle class="align-start text-right">
              <v-chip
                color="primary"
                :ripple="false"
              >
                <v-avatar left>
                  <v-img src="/img/vp.png" />
                </v-avatar>
                {{ weapon.vpold }} >>> {{ weapon.vp }} (-{{ weapon.discountpercent }}%)
              </v-chip>
            </v-card-subtitle>
          </v-img>
          <v-card-title class="font-weight-black primary--text">
            {{ weapon.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
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
      date: undefined,
      bundleid: undefined,
      vp: 0,
      rp: 0,
      loading: true
    }
  },
  head () {
    return {
      title: 'Daily Store'
    }
  },
  async mounted () {
    try {
      const response = await this.$axios.get('/getstore')
      if (response.data.status !== undefined) {
        if (response.data.status === 'FAILED') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.$t('not_link')
          })
          this.$router.go(-1)
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: response.data.status
          })
        }
      } else {
        this.bundleid = response.data.bundle
        this.rp = response.data.wallet.rp
        this.vp = response.data.wallet.vp
        this.setStores(response.data.offers)
        if ('bonus' in response.data) {
          this.setNightMarket(response.data.bonus)
        }
      }
    } catch (err) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Reload the web page and try again.'
      })
    }
  },
  methods: {
    setStores (stores) {
      for (const k in stores) {
        if ('date' in stores[k]) {
          this.date = stores[k].date
          continue
        }
        this.storeoffers.push(
          { uuid: stores[k].uuid, vp: stores[k].vp, name: stores[k].name, imgsrc: stores[k].imgsrc, videosrc: stores[k].videosrc, tierid: stores[k].tierid }
        )
      }
      this.loading = false
    },

    setNightMarket (stores) {
      for (const k in stores) {
        if ('bonusleft' in stores[k]) {
          continue
        }
        this.bonusoffers.push(
          { uuid: stores[k].uuid, vp: stores[k].vp, vpold: stores[k].vpold, name: stores[k].name, imgsrc: stores[k].imgsrc, videosrc: stores[k].videosrc, tierid: stores[k].tierid, discountpercent: stores[k].discountpercent }
        )
      }
    },

    viewskin (uuid) {
      window.open('/skin/' + uuid, '_self')
    },

    twitterShare () {
      const baseUrl = 'https://twitter.com/intent/tweet?'
      const text = ['text', this.$t('store_share_text') + '\n\n' + '#ValorantStoreChecker' + '\n']
      const url = ['url', 'https://valorantstore.net/stores/' + btoa(this.$store.state.auth.user.id)]
      const parameter = new URLSearchParams([text, url]).toString()
      const shareUrl = `${baseUrl}${parameter}`
      window.open(shareUrl, 'twitter', 'top=200,left=300,width=600,height=400')
    }
  }
}
</script>
