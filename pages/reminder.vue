<template>
  <v-container>
    <h1 class="vtitle">
      {{ $t('reminder_title') }}
    </h1>
    <p>
      {{ $t('reminder_description') }}
    </p>
    <v-btn
      v-if="!this.not_rank"
      color="primary"
      @click="reset()"
    >
      Reset
    </v-btn>
    <v-alert
      v-if="this.not_rank"
      type="error"
      dense
      text
    >
      {{ $t('not_rank') }}
    </v-alert>
    <v-card
      v-if="!this.not_rank"
      class="mx-auto c1"
      elevation="2"
    >
      <v-card-title>
        Added Weapons
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="weapon in added_weapons" v-bind:key="weapon.name">
            {{ weapon.name }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          plain
          color="primary"
          @click="register()"
        >
          Register
        </v-btn>
        <v-btn
          plain
          color="primary"
          @click="clear()"
        >
          Clear
        </v-btn>
      </v-card-actions>
    </v-card>
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
                color="primary"
                @click="add(weapon.uuid, weapon.name)"
              >
                Add this Weapon
              </v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      color="primary"
      :length="length"
      @input="pageChange"
    />
  </v-container>
</template>

<script>
export default {
  name: 'ReminderPage',
  middleware: 'auth',

  data () {
    return {
      weapons: [],
      displayweapons: [],
      page: 1,
      length: 0,
      pageSize: 12,
      added_weapons: [],
      not_rank: false
    }
  },

  async mounted () {
    const response = await this.$axios.$get('/reminder/check')
    if (response.status === 403) {
      this.not_rank = true
      this.loadWeapons()
    }
  },

  // async asyncData ({ $axios }) {
  //   const response = await $axios.$get('/reminder/check')
  //   if (response.status === 403) {
  //     return { not_rank: true }
  //   } else {
  //     return { not_rank: false }
  //   }
  // },

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

    add (uuid, name) {
      if (this.added_weapons.some(b => b.uuid === uuid && b.name === name)) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: 'Already added.'
        })
      } else {
        this.added_weapons.push({uuid, name})
        this.$swal({
          icon: 'success',
          title: 'Added',
          text: name
        })
      }
    },

    clear () {
      this.added_weapons.splice(0)
      this.$swal({
        icon: 'success',
        title: 'Cleaned 🧹'
      })
    },

    async register () {
      const res = await this.$axios.post('/reminder/register', { weapons: this.added_weapons })
      if (res.data.status === 200) {
        this.$swal({
          icon: 'success',
          title: 'Registed 🧹'
        })
      } else {
        this.$swal({
          icon: 'error',
          title: 'Error'
        })
      }
    },

    async reset () {
      const res = await this.$axios.$get('/reminder/reset')
      if (res.status === 200) {
        this.$swal({
          icon: 'success',
          title: 'Reset success!'
        })
      } else {
        this.$swal({
          icon: 'error',
          title: 'Error'
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
