<template>
  <h1 class="title">{{ $t('login-wait') }}</h1>
</template>

<script>
export default {
  name: 'LoginPage',
  mounted () {
    // if (!this.$store.state.auth.loggedIn && !this.$route.query.code) {
    //   this.$auth.loginWith('discord')
    // } else if (this.$store.state.auth.loggedIn) {
    //   this.$router.push('/')
    // }
  }
}
</script>

<style scoped lang="css">
.title {
  color: #C8C6D7;
  font-size: 26px;
}
</style>
