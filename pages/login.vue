<template>
  <v-container>
    <v-card
      class="text-center pa-10"
      elevation="2"
    >
      <h1>Welcome to Valorant Store Checker</h1>
      <p>
        {{ $t('login_description') }}
      </p>
      <v-btn
        v-if="!$store.state.auth.loggedIn"
        elevation="2"
        color="discord"
        @click="discordAuthenticate"
      >
        Login with Discord
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  head () {
    return {
      title: 'Login'
    }
  },
  methods: {
    discordAuthenticate () {
      this.$auth.loginWith('discord')
    }
  }
}
</script>
