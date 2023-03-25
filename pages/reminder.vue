<template>
  <v-container>
    <v-overlay v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
      >
      </v-progress-circular>
    </v-overlay>
    <h1 class="vtitle">
      {{ $t('reminder_title') }}
    </h1>
    <p>
      {{ $t('reminder_description') }}
    </p>
    <div class="d-flex">
      <v-btn
        v-if="!this.not_rank"
        color="primary"
        @click="reset()"
      >
        Reset Registered Weapons
      </v-btn>
      <v-select
        @change="filter()"
        v-model="select"
        class="pl-5"
        :items="items"
        label="Weapon Filters"
        item-text="label"
        item-value="value"
        outlined
        dense
      ></v-select>
    </div>
    <v-alert
      v-if="this.not_rank"
      type="error"
      dense
      text
    >
      {{ $t('not_rank') }}
    </v-alert>
    <v-row class="py-3" v-if="!this.not_rank">
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
        >
          <v-card-title>
            Added Weapons
          </v-card-title>
          <v-card-text>
            <v-chip
              v-for="weapon in added_weapons" v-bind:key="weapon.name"
              color="primary"
            >
            {{ weapon.name }}
            </v-chip>
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
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
        >
          <v-card-title>
            Registered Weapons
          </v-card-title>
          <v-card-text>
            <v-chip
              v-for="weapon in registered_weapons" v-bind:key="weapon.name"
              color="primary"
            >
            {{ weapon.name }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
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
      weapons2: [],
      displayweapons: [],
      page: 1,
      length: 0,
      pageSize: 12,
      added_weapons: [],
      registered_weapons: [],
      not_rank: true,
      loading: false,
      items: [
        { label: 'Classic', value: 'ShooterGame/Content/Equippables/Guns/Sidearms/BasePistol/' },
        { label: 'Shorty', value: 'ShooterGame/Content/Equippables/Guns/Sidearms/Slim/' },
        { label: 'Frenzy', value: 'ShooterGame/Content/Equippables/Guns/Sidearms/AutoPistol/' },
        { label: 'Ghost', value: 'ShooterGame/Content/Equippables/Guns/Sidearms/Luger/' },
        { label: 'Sheriff', value: 'ShooterGame/Content/Equippables/Guns/Sidearms/Revolver/' },
        { label: 'Stinger', value: 'ShooterGame/Content/Equippables/Guns/SubMachineGuns/Vector/' },
        { label: 'Spectre', value: 'ShooterGame/Content/Equippables/Guns/SubMachineGuns/MP5/' },
        { label: 'Bucky', value: 'ShooterGame/Content/Equippables/Guns/Shotguns/PumpShotgun/' },
        { label: 'Judge', value: 'ShooterGame/Content/Equippables/Guns/Shotguns/AutoShotgun/' },
        { label: 'Bulldog', value: 'ShooterGame/Content/Equippables/Guns/Rifles/Burst/' },
        { label: 'Guardian', value: 'ShooterGame/Content/Equippables/Guns/SniperRifles/DMR/' },
        { label: 'Phantom', value: 'ShooterGame/Content/Equippables/Guns/Rifles/Carbine/' },
        { label: 'Vandal', value: 'ShooterGame/Content/Equippables/Guns/Rifles/AK/' },
        { label: 'Marshal', value: 'ShooterGame/Content/Equippables/Guns/SniperRifles/Leversniper/' },
        { label: 'Operator', value: 'ShooterGame/Content/Equippables/Guns/SniperRifles/Boltsniper/' },
        { label: 'Ares', value: 'ShooterGame/Content/Equippables/Guns/HvyMachineGuns/LMG/' },
        { label: 'Odin', value: 'ShooterGame/Content/Equippables/Guns/HvyMachineGuns/HMG/' },
        { label: 'Melee', value: 'ShooterGame/Content/Equippables/Melee/' },
        { label: 'None', value: 'none' },
      ],
      select: ""
    }
  },

  async mounted () {
    const response = await this.$axios.$get('/reminder/check')
    if (response.status === 200) {
      this.not_rank = false
      this.loadWeapons()
      this.loadRegisteredWeapons()
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
      this.loading = true
      const inventory = await this.$axios.get('https://valorant-api.com/v1/weapons/skins')
      const skins = inventory.data.data
      for (const s in skins) {
        if (skins[s].contentTierUuid === null || skins[s].displayName.includes('Random')) {
          continue
        }
        this.weapons.push(
          {
            uuid: skins[s].uuid, name: skins[s].displayName, displayIcon: 'https://s3.valorantstore.net/skins/' + skins[s].uuid + '.png', assetPath: skins[s].assetPath
          }
        )
      }
      this.weapons2 = this.weapons
      this.length = Math.ceil(this.weapons.length / this.pageSize)
      this.displayweapons = this.weapons.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
      this.loading = false
    },

    async loadRegisteredWeapons () {
      const res = await this.$axios.$get('/reminder/registered')
      if (res.status === 200) {
        for (const s in res.weapons) {
          this.registered_weapons.push(
            {
              name: res.weapons[s].name
            }
          )
        }
      }
    },

    filter () {
      this.loading = true
      if (this.select === "none") {
        this.weapons = this.weapons2
        this.length = Math.ceil(this.weapons.length / this.pageSize)
        this.displayweapons = this.weapons.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
        this.loading = false
      } else {
        this.weapons = this.weapons2.filter(weapon => weapon.assetPath.includes(this.select))
        this.length = Math.ceil(this.weapons.length / this.pageSize)
        this.displayweapons = this.weapons.slice(this.pageSize * (this.page - 1), this.pageSize * (this.page))
        this.loading = false
      }
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
          title: 'Registered!'
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
