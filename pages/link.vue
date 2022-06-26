<template>
  <v-container>
    <h1 class="vtitle">
      Link Manager
    </h1>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <h1>
            Link your riot account
          </h1>
          <v-alert
            type="warning"
            outlined
          >
            {{ $t('link-warning') }}
          </v-alert>
          <v-form ref="form">
            <v-text-field
              v-model="riotusername"
              label="Riot Account Name"
              :rules="[required]"
              filled
              clearable
              color="error"
            />
            <v-text-field
              v-model="riotuserpassword"
              label="Riot Account Password"
              :rules="[required]"
              filled
              clearable
              :append-icon="toggle.icon"
              :type="toggle.type"
              color="error"
              @click:append="show = !show"
            />
            <v-select
              v-model="riotregion"
              item-text="label"
              item-value="value"
              :items="regions"
              filled
              label="Select Riot Account Region"
              :rules="[required]"
              color="error"
            />
            <v-btn
              elevation="2"
              color="error"
              large
              @click="link()"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
          height="100%"
        >
          <h1>
            Unlink your riot account
          </h1>
          <v-alert
            type="warning"
            outlined
          >
            {{ $t('link-warning2') }}
          </v-alert>
          <v-btn
            elevation="2"
            block
            color="error"
            @click="unlink()"
          >
            Submit
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LinkManagerPage',
  middleware: 'auth',
  data () {
    return {
      regions: [
        {
          label: 'Asia_Pacific',
          value: 'ap'
        },
        {
          label: 'Europa',
          value: 'eu'
        },
        {
          label: 'North_America / Latin_America / Brazil',
          value: 'na'
        },
        {
          label: 'Korea',
          value: 'kr'
        }
      ],
      show: false,
      riotusername: null,
      riotuserpassword: null,
      riotregion: null,
      required: value => !!value || 'Please be sure to fill out the form or select.'
    }
  },

  head () {
    return {
      title: 'Link Manager'
    }
  },

  computed: {
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  },

  methods: {
    async link () {
      this.$swal.showLoading()
      if (this.$refs.form.validate()) {
        const reg = /^[0-9a-zA-Z_]+$/
        if (!reg.test(this.riotusername)) {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'User name contains an unusable string or spaces.'
          })
          return
        }
        // Success
        const register = await this.$axios.get(`${this.$config.API_BASE}/register/` + this.$store.state.auth.user.id + '/' + this.riotusername + '/' + this.riotregion, { headers: { password: this.riotuserpassword } })
        if (register.data.Status === 'OK') {
          // Success
          this.$swal({
            icon: 'success',
            title: 'NICE!',
            text: 'Link is complete!'
          })
        } else if (register.data.Status === 'FAILED') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Already linked.'
          })
        } else if (register.data.Status === 'auth_failure') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong password or username.'
          })
        } else if (register.data.Status === '2fa') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Two-factor authentication is not supported at this stage. Please disable 2-factor authentication only when linking, and then re-enable it.'
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: register.data.Status
          })
        }
      } else {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out the form and make your selection.'
        })
      }
    },

    async unlink () {
      this.$swal.showLoading()
      const unlink = await this.$axios.get(`${this.$config.API_BASE}/unlink`, { headers: { discordid: this.$store.state.auth.user.id } })
      if (unlink.data.Status === 'OK') {
        // Success
        this.$swal({
          icon: 'success',
          title: 'Bye!',
          text: 'Unlink is complete!'
        })
      } else {
        // Failed
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: unlink.data.Status
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
