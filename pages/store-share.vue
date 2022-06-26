<template>
  <v-container>
    <h1 class="vtitle">
      {{ this.$route.query.id }}'s Daily Store
    </h1>
    <v-alert
      v-if="status !== undefined"
      type="error"
    >
      {{ status }}
    </v-alert>
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
      Night Marcket
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
  name: 'StoreSharePage',

  data () {
    return {
      storeoffers: [],
      bonusoffers: [],
      status: undefined
    }
  },

  head () {
    return {
      title: 'Store Share'
    }
  },

  mounted () {
    this.loadStores()
  },

  methods: {
    async loadStores () {
      if (this.$route.query.id === undefined) {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: 'User not found.'
        })
        return
      }
      const store = await this.$axios.get(`${this.$config.API_BASE}/valorant/getStoreShare`, { headers: { userid: this.$route.query.id } })
      if (store.data.Status !== undefined) {
        if (store.data.Status === 'EMPTY') {
          this.status = 'Non-existent users'
        } else if (store.data.Status === 'FAILED') {
          this.status = 'User has not updated the store.'
        }
      } else {
        this.setStores(store.data)
      }
    },

    setStores (stores) {
      for (const k in stores) {
        if ('offerleft' in stores[k]) {
          continue
        }
        this.storeoffers.push(
          { vp: stores[k].vp, name: stores[k].name, imgsrc: stores[k].imgsrc, videosrc: stores[k].videosrc, tierid: stores[k].tierid }
        )
      }
      if ('BonusStore' in stores) {
        for (const k in stores.BonusStore) {
          if ('BonusLeft' in stores.BonusStore[k]) {
            continue
          }
          this.bonusoffers.push(
            { vp: stores.BonusStore[k].vp, vpold: stores.BonusStore[k].vpold, name: stores.BonusStore[k].name, imgsrc: stores.BonusStore[k].imgsrc, videosrc: stores.BonusStore[k].videosrc, tierid: stores[k].tierid }
          )
        }
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
