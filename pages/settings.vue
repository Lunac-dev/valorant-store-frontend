<template>
  <v-container>
    <div style="text-align: center">
      <adsbygoogle
        :ad-slot="'9526693890'"
        :ad-format="'horizontal'"
      />
    </div>
    <h1>
      {{ $t('settings_title') }}
    </h1>
    <v-card
      v-if="privatestore !== undefined"
      class="pa-5 ma-3"
      elevation="2"
    >
      <h2>
        {{ $t('settings_general') }}
      </h2>
      <v-form ref="form">
        <v-checkbox
          v-model="privatestore"
          :label="$t('settings_private')"
          color="primary"
        ></v-checkbox>
        <v-btn
          elevation="2"
          color="primary"
          large
          @click="change()"
        >
          Change
        </v-btn>
      </v-form>
    </v-card>
    <v-card
      class="pa-5 ma-3"
      elevation="2"
    >
      <h2>
        {{ $t('settings_acc') }}
      </h2>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card
            outlined
            class="pa-5"
            width="100vh"
            height="100%"
          >
            <h1>
              {{ $t('settings_link_acc') }}
            </h1>
            <v-alert
              type="info"
              color="primary"
              outlined
            >
              {{ $t('settings_link_help') }}
              <a href="https://www.craft.do/s/ajlY5nYTszlc9H">Help Document</a>
            </v-alert>
            <v-form ref="form">
              <v-text-field
                v-model="riotusername"
                label="Riot Account Name"
                :rules="[required]"
                filled
                clearable
                color="primary"
              />
              <v-text-field
                v-model="riotuserpassword"
                label="Riot Account Password"
                :rules="[required]"
                filled
                clearable
                :append-icon="toggle.icon"
                :type="toggle.type"
                color="primary"
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
                color="primary"
              />
              <v-checkbox
                v-model="relogin"
                :label="$t('settings_autologin')"
                color="primary"
              ></v-checkbox>
              <v-btn
                elevation="2"
                color="primary"
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
            outlined
            class="pa-5"
            width="100vh"
            height="100%"
          >
            <h1>
              {{ $t('settings_unlink_acc') }}
            </h1>
            <v-alert
              type="warning"
              outlined
            >
              {{ $t('settings_link_warning') }}
            </v-alert>
            <v-btn
              elevation="2"
              block
              color="primary"
              @click="unlink()"
            >
              Submit
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SettingsPage',
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
      relogin: false,
      required: value => !!value || 'Please be sure to fill out the form or select.'
    }
  },

  head () {
    return {
      title: 'Settings'
    }
  },

  computed: {
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  },

  async asyncData ({ $axios, $auth }) {
    const response = await $axios.$get('/settings')
    if (response.status === 200) {
      if (response.data.private === 0) {
        return { settings: response.data, privatestore: false}
      } else {
        return { settings: response.data, privatestore: true}
      }
    } else if (response.status === 404) {
      return { privatestore: false }
    }
  },

  methods: {
    async change() {
      const submit = await this.$axios.$post('/settings', { private: this.privatestore })
      if (submit.status === 200) {
        this.$swal({
          icon: 'success',
          title: 'Success!',
          text: 'Setting is changed!'
        })
      } else {
        this.$swal({
          icon: 'error',
          title: 'Faild...',
          text: 'An error has occurred: ' + submit.status
        })
      }
    },

    async link () {
      this.$swal.showLoading()
      if (this.$refs.form.validate()) {
        const reg = /^[0-9a-zA-Z_]+$/
        if (!reg.test(this.riotusername)) {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Username contains an unusable string or spaces.'
          })
          return
        }
        // Success
        const register = await this.$axios.post('/login', { password: this.riotuserpassword, username: this.riotusername, region: this.riotregion, relogin: this.relogin })
        if (register.data.status === 'OK') {
          // Success
          this.$swal({
            icon: 'success',
            title: 'Success!',
            text: 'Link is complete!'
          })
        } else if (register.data.status === 'FAILED') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Already linked.'
          })
        } else if (register.data.status === 'auth_failure') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong password or username.'
          })
        } else if (register.data.status === '2fa') {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: 'If two-factor authentication is enabled, the link cannot be performed. Please temporarily disable two-factor authentication when linking, and re-enable it after the link is completed.'
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Unknown Error',
            text: register.data.status
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
      const unlink = await this.$axios.post('/logout')
      if (unlink.data.status === 'OK') {
        // Success
        this.$swal({
          icon: 'success',
          title: 'See you again!',
          text: 'Unlink is complete!'
        })
      } else {
        // Failed
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: unlink.data.status
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
</style>
