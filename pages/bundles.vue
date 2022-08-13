<template>
  <div>
    <div class="mtop" v-bind:style="mtop2">
      <div style="padding: 20px;">
        <h2>
          FEATURED
        </h2>
        <h1 class="mtop-h1">
          {{ bundlename }}
        </h1>
        <h2>
          COLLECTION
        </h2>
      </div>
    </div>
    <v-container>
      <h1 class="text-center">
        Weapons
      </h1>
      <v-row class="pt-5">
        <v-col v-for="weapon in weapons" v-bind:key="weapon.name" cols="12" sm="3">
          <v-card
            class="mx-auto c1"
            max-width="100%"
            hover
            @click="viewskin(weapon.uuid)"
          >
            <v-img
              :src="weapon.displayIcon"
              height="250px"
              class="align-end"
              aspect-ratio="1.4"
              contain
            >
              <v-card-title>
                {{ weapon.name }}
              </v-card-title>
              <v-card-subtitle class="text-h6 text-decoration-underline text-right">
                {{ weapon.price }} VP
              </v-card-subtitle>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="mx-auto d-flex flex-no-wrap justify-center">
      <h5>Ads</h5>
      <adsbygoogle
        :ad-slot="'6190084110'"
        :ad-format="'auto'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BundlesPage',

  data () {
    return {
      mtop2: {
        backgroundImage: ''
      },
      bundlename: undefined,
      weapons: undefined
    }
  },

  head () {
    return {
      title: 'Bundles'
    }
  },

  mounted () {
    this.loadBundles()
  },

  methods: {
    async loadBundles () {
      const response = await this.$axios.get(`${this.$config.API_BASE}/valorant/store-featured`)

      for (const k in response.data) {
        this.mtop2.backgroundImage = "url('" + response.data[k].displayIcon + "')"
        this.bundlename = response.data[k].name
        this.weapons = response.data[k].weapons
      }
    },

    viewskin (uuid) {
      window.open('/skin/' + uuid, '_blank')
    }
  }
}
</script>

<style scoped lang="css">
.mtop {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}

.mtop-h1 {
  color: #ff4655;
  font-family: 'VALORANT', sans-serif;
  font-size: 5vh
}
</style>
