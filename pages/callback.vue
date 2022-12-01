<template>
  <v-container>
    <v-alert
      v-if="$route.query.error"
      type="error"
    >
      {{ $route.query.error }}: {{ $route.query.error_description }}
    </v-alert>
    <div class="d-flex justify-center" style="height: 100vh;">
      <v-progress-circular
        v-if="!$route.query.error"
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'CallbackPage'
}
</script>

