<template>
  <h1>Please wait...</h1>
</template>

<script>
export default {
  name: 'LoginPage',
  mounted () {
    if (!this.$auth.loggedIn && !this.$route.query.code) {
      this.$auth.loginWith('discord')
    } else {
      this.$auth.redirect('/')
    }
  }
}
</script>
