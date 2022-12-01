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
          COLLECTION // {{ price }} VP
        </h2>
      </div>
    </div>
    <v-container class="text-center">
      <div>
        <div style="text-align: center">
          <adsbygoogle
            :ad-slot="'6190084110'"
            :ad-format="'horizontal'"
          />
        </div>
        <h1 class="text-decoration-underline" style="font-family: 'VALORANT', sans-serif;">
          {{ bundlename }}
        </h1>
        <v-row class="pt-5">
          <v-col v-for="weapon in weapons" v-bind:key="weapon.name" cols="12" sm="3">
            <v-card
              class="mx-auto"
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
      </div>
      <div class="pt-5">
        <div style="text-align: center">
          <adsbygoogle
            :ad-slot="'4143888168'"
            :ad-format="'horizontal'"
          />
        </div>
        <h1 class="text-decoration-underline" style="font-family: 'VALORANT', sans-serif;">
          Game News
        </h1>
        <v-row class="pt-5">
          <v-col v-for="tmp in news" v-bind:key="tmp.name" cols="12" sm="3">
            <v-card
              class="mx-auto"
            >
              <a :href="tmp.url" target="_blank">
                <v-img
                  :src="tmp.banner_url"
                  max-height="150px"
                />
              </a>
              <v-card-subtitle>
                {{ tmp.title }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  async asyncData ({ $axios }) {
    const response = await $axios.$get('/bundles')
    const response2 = await $axios.$get('/news')
    return { bundlename: response[0].name, price: response[0].price, weapons: response[0].weapons, mtop2: { backgroundImage: "url('" + response[0].displayIcon + "')" }, news: response2 }
  },

  methods: {
    viewskin (uuid) {
      window.open('/skin/' + uuid, '_self')
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
  font-size: 8vh
}
</style>
