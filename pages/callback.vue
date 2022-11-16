<template>
  <v-container>
    <v-alert
      v-if="$route.query.error"
      type="error"
    >
      {{ $route.query.error }}: {{ $route.query.error_description }}
    </v-alert>
    <h1 v-if="!$route.query.error" class="title">{{ $t('login-wait') }}</h1>
  </v-container>
</template>

<script>
export default {
  name: 'CallbackPage'
}
</script>

<style scoped lang="css">
.title {
  color: #C8C6D7;
  font-size: 26px;
}
</style>
