<template>
  <v-container>
    <v-alert
      v-if="alert !== undefined"
      type="error"
    >
      {{ alert }}
    </v-alert>
    <h1 class="vtitle">
      {{ name }}
    </h1>
    <v-btn
      color="error"
      large
      outlined
      @click="copyToClipboard()"
    >
      <v-icon left>
        mdi-share-variant-outline
      </v-icon>
      Share this weapon
    </v-btn>
    <v-row v-if="alert == undefined">
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <v-img
            contain
            :src="displayIcon"
            height="250px"
          />
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
            <v-col cols="12" sm="6">
              <h3>Price</h3>
              <v-card
                class="mx-auto d-flex flex-no-wrap justify-space-between"
                max-width="100%"
                outlined
              >
                <v-card-title><h1 v-text="price" /></v-card-title>
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
              <h3>Tier</h3>
              <v-card
                class="mx-auto d-flex flex-no-wrap justify-center"
                max-width="100%"
                outlined
              >
                <v-avatar
                  class="ma-3"
                  size="80"
                  tile
                >
                  <v-img :src="/images/ + tierid + '.png'" />
                </v-avatar>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <adsbygoogle
      :ad-slot="'1552064594'"
      :ad-format="'auto'"
    />
    <v-card
      v-if="alert == undefined"
      elevation="2"
      class="pa-5 mt-5"
    >
      <h1>Levels</h1>
      <h3 v-if="levels == undefined">
        There are no items available for display.
      </h3>
      <v-tabs
        v-else
        v-model="tab"
        color="error"
        grow
        show-arrows
        center-active
      >
        <v-tab
          v-for="level in levels"
          :key="level"
        >
          {{ level.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="level in levels"
          :key="level"
        >
          <v-card
            class="mx-auto d-flex flex-no-wrap justify-center"
          >
            <video :src="level.streamedVideo" height="500px" controls playsinline />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <adsbygoogle
      :ad-slot="'6566671832'"
      :ad-format="'auto'"
    />
    <v-card
      v-if="alert == undefined"
      elevation="2"
      class="pa-5 mt-5"
    >
      <h1>Chromas</h1>
      <h3 v-if="chromas == undefined">
        There are no items available for display.
      </h3>
      <v-row v-else class="pt-5">
        <v-col v-for="chroma in chromas" v-bind:key="chroma.name" cols="12" :sm="12/chromas.length">
          <v-card
            class="mx-auto c1"
            max-width="100%"
            outlined
          >
            <v-img
              :src="chroma.displayIcon"
              height="250px"
              class="align-end"
              aspect-ratio="1.4"
              contain
            >
              <v-card-title>
                {{ chroma.name }}
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SkinPage',

  data () {
    return {
      name: undefined,
      alert: undefined,
      displayIcon: undefined,
      price: 0,
      tierid: undefined,
      chromas: undefined,
      levels: undefined,
      tab: null
    }
  },

  head () {
    return {
      title: 'Valorant Skin - ' + this.name
    }
  },

  mounted () {
    this.loadSkin()
  },

  methods: {
    async loadSkin () {
      const response = await this.$axios.get(`${this.$config.API_BASE}/valorant/skin/${this.$route.params.id}`)

      if ('status' in response.data) {
        this.alert = response.data.status
      } else {
        this.name = response.data.name
        this.displayIcon = response.data.displayIcon
        this.price = response.data.price
        this.tierid = response.data.tierid
        if (response.data.chromas.length !== 0) { this.chromas = response.data.chromas }
        if (response.data.levels.length !== 0) { this.levels = response.data.levels }
      }
    },

    copyToClipboard () {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'URL Copied!'
          })
        })
    }
  }
}
</script>
<style scoped lang="css">
.vtitle {
  font-size: 5vh;
}
</style>
