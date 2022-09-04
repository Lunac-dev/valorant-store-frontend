<template>
  <div>
    <v-container fluid fill-height class="mtop">
      <v-row>
        <v-col class="text-center">
          <v-icon x-large>
            mdi-alert-circle-outline
          </v-icon>
          <h1>
            [ Maintenance ]
          </h1>
          <h2>We'll be back soon!</h2>
          <p>Sorry for the inconvenience. We're performing some maintenance at the moment. If you need us, you can always check the <a href="https://discord.gg/4zrQDW9PNq">Discord</a> for updates, otherwise we will resume shortly!</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'MaintenancePage',

  head () {
    return {
      title: 'Maintenance'
    }
  },

  mounted () {
    this.$swal.close()
  }
}
</script>

<style scoped lang="css">
.mtop {
  width: 100%;
  height: 100vh;
  background-color: #FD4556;
}
</style>
