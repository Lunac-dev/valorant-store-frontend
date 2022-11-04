<template>
  <v-container>
    <h1 class="vtitle">
      {{ $t('navbar-reminder') }}
    </h1>
    <v-alert
      type="warning"
      dense
      text
    >
      This feature is still in the testing phase and may be removed in the future.
    </v-alert>
    <v-row class="pt-5">
      <v-col v-for="weapon in displayweapons" v-bind:key="weapon.name" cols="12" sm="2">
        <v-card
          class="mx-auto c1"
          max-width="100%"
          hover
        >
          <v-img
            :src="weapon.displayIcon"
            height="250px"
            aspect-ratio="1.4"
            contain
            class="align-end"
          >
            <v-card-title class="valofont">
              {{ weapon.name }}
            </v-card-title>
            <v-card-actions>
              <v-btn
                small
                plain
                color="error"
                @click="register(weapon.uuid)"
              >
                Register this Weapon
              </v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      color="error"
      :length="length"
      @input="pageChange"
    />
  </v-container>
</template>

<script>
export default {
  name: 'ReminderPage',
  middleware: 'auth',

  // async asyncData ({ $axios }) {
  //   const response = await $axios.$get('http://localhost:5000/valorant/checkreminder')
  //   console.log(response)
  // },

  data () {
    return {
      weapons: [],
      displayweapons: [],
      page: 1,
      length: 0,
      pageSize: 12
    }
  },

  mounted () {
    this.loadWeapons()
  },

  methods: {
    async loadWeapons () {
      const inventory = await this.$axios.get('https://valorant-api.com/v1/weapons/skins')
      const skins = inventory.data.data
      for (const s in skins) {
        if (skins[s].displayIcon === null || skins[s].contentTierUuid === null || skins[s].displayName.includes('Random')) {
          continue
        }
        this.weapons.push(
          {
            uuid: skins[s].uuid, name: skins[s].displayName, displayIcon: 'https://s3.valorantstore.net/skins/' + skins[s].uuid + '.png'
          }
        )
      }
      this.length = Math.ceil(this.weapons.length / this.pageSize)
      this.displayweapons = this.weapons.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
    },

    pageChange (pageNumber) {
      this.displayweapons = this.weapons.slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber))
    },

    register (uuid) {
      this.$swal({
        icon: 'info',
        title: 'HEY',
        text: uuid
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
