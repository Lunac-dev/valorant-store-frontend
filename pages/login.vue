<template>
  <v-container>
    <v-card
      class="text-center pa-10"
      elevation="2"
    >
      <h1>Welcome to VSC</h1>
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
  methods: {
    discordAuthenticate () {
      this.$auth.loginWith('discord')
    }
  }
}
</script>

<style scoped lang="css">
.title {
  color: #C8C6D7;
  font-size: 26px;
}
</style>
