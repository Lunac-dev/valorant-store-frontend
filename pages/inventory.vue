<template>
  <v-container>
    <h1 class="vtitle">
      {{ $t('navbar-inventory') }}
    </h1>
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
    <v-card
      elevation="2"
    >
      <v-card-title>Weapon Skins</v-card-title>
      <v-card-subtitle>Total Price: {{ totalvp }} VP</v-card-subtitle>
    </v-card>
    <v-row class="pt-5">
      <v-col v-for="weapon in displayweapons" v-bind:key="weapon.name" cols="12" sm="2">
        <v-card
          class="mx-auto c1"
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
              :src="weapon.displayIcon"
              height="250px"
              class="align-end"
              aspect-ratio="1.4"
              contain
            >
              <v-card-title class="valofont">
                {{ weapon.name }}
              </v-card-title>
              <v-card-subtitle v-if="weapon.price != 'null'" class="text-h6 text-decoration-underline text-right">
                {{ weapon.price }} VP
              </v-card-subtitle>
            </v-img>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      color="error"
      :length="length"
      @input = "pageChange"
    />
  </v-container>
</template>

<script>
export default {
  name: 'InventoryPage',
  middleware: 'auth',

  data () {
    return {
      date: undefined,
      totalvp: 0,
      weapons: [],
      displayweapons: [],
      page: 1,
      length: 0,
      pageSize: 12
    }
  },

  mounted () {
    this.$swal({
      icon: 'info',
      title: 'Loading...',
      showCloseButton: false
    })
    this.$swal.showLoading()
    this.loadInventory()
  },

  methods: {
    async loadInventory () {
      const inventory = await this.$axios.get(`${this.$config.API_BASE}/valorant/getinventory`, { headers: { discordid: this.$store.state.auth.user.id } })
      if (inventory.data.status !== undefined) {
        if (inventory.data.status === 'FAILED') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.$t('not-link')
          })
          this.$router.go(-1)
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: inventory.data.status
          })
        }
      } else {
        const skins = inventory.data.data.find(v => v.ItemTypeID === 'e7c63390-eda7-46e0-bb7a-a6abdacd2433')
        this.date = this.getDateFrom(inventory.data.date * 1000)
        for (const k in skins.Entitlements) {
          const response = await this.$axios.get(`https://api.valorantstore.net/weapons/byskinlevelsuuid/${skins.Entitlements[k].ItemID}`)
          if (this.weapons.find(v => v.uuid === response.data.data.uuid)) {
            continue
          }
          if (response.data.data.price !== 'null') {
            this.totalvp = this.totalvp + response.data.data.price
          }
          this.weapons.push(
            {
              uuid: response.data.data.uuid, name: response.data.data.name, tierid: response.data.data.tierid, price: response.data.data.price, displayIcon: response.data.data.displayIcon
            }
          )
        }
        this.length = Math.ceil(this.weapons.length / this.pageSize)
        this.displayweapons = this.weapons.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
        this.$swal.close()
      }
    },

    pageChange (pageNumber) {
      this.displayweapons = this.weapons.slice(this.pageSize * (pageNumber - 1), this.pageSize * (pageNumber))
    },

    getDateFrom (date) {
      const diff = new Date().getTime() - date
      const elapsed = new Date(diff)

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

    viewdate () {
      this.$swal({
        icon: 'info',
        title: 'Last updated time',
        text: this.date
      })
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
