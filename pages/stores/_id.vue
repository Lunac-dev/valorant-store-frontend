<template>
  <v-container>
    <h1>
      {{ $t('store_share_title') }}
    </h1>
    <p class="grey--text" style="font-size: 12px" v-if="date">
      Updated Store: {{ date }}
    </p>
    <v-card
      v-if="bundleid"
      class="mx-auto"
      max-width="100%"
    >
      <a href="/">
        <v-img
          height="450"
          :src="'https://s3.valorantstore.net/bundles/' + bundleid + '.png'"
        />
      </a>
    </v-card>
    <v-row class="pt-5">
      <v-col v-for="weapon in storeoffers" v-bind:key="weapon.name" cols="12" sm="3">
        <v-card
          class="mx-auto c1"
          max-width="100%"
          hover
          @click="viewskin(weapon.uuid)"
        >
          <v-img
            :src="/img/ + weapon.tierid + '.png'"
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
              <v-card-subtitle class="text-h6 text-decoration-underline text-right">
                {{ weapon.vp }} VP
              </v-card-subtitle>
            </v-img>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <div style="text-align: center">
      <adsbygoogle
        :ad-slot="'7973975438'"
      />
    </div>
    <h1 v-if="bonusoffers[0] !== undefined" class="vtitle">
      {{ $t('store_night_market') }}
    </h1>
    <v-row v-if="bonusoffers[0] !== undefined">
      <v-col v-for="weapon in bonusoffers" v-bind:key="weapon.name" cols="6">
        <v-card
          class="mx-auto c2"
          max-width="100%"
          hover
          @click="viewskin(weapon.uuid)"
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
              <v-card-subtitle class="text-h6 text-decoration-underline text-right">
                {{ weapon.vpold }} VP -> {{ weapon.vp }} VP
              </v-card-subtitle>
            </v-img>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'StorePage',

  data () {
    return {
      storeoffers: [],
      bonusoffers: [],
      date: undefined,
      bundleid: undefined
    }
  },

  head () {
    return {
      title: 'User Daily Store'
    }
  },

  async mounted () {
    this.$swal.showLoading()
    const response = await this.$axios.get('/getstore2', { headers: { discordid: this.$route.params.id } })
    if (response.data.status !== undefined) {
      if (response.data.status === 404) {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: 'User not found.'
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
      this.setStores(response.data.offers)
      if ('bonus' in response.data) {
        this.setNightMarket(response.data.bonus)
      }
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
      this.$swal.close()
    },

    setNightMarket (stores) {
      for (const k in stores) {
        if ('bonusleft' in stores[k]) {
          continue
        }
        this.bonusoffers.push(
          { uuid: stores[k].uuid, vp: stores[k].vp, vpold: stores[k].vpold, name: stores[k].name, imgsrc: stores[k].imgsrc, videosrc: stores[k].videosrc, tierid: stores[k].tierid }
        )
      }
    },

    viewskin (uuid) {
      window.open('/skin/' + uuid, '_self')
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