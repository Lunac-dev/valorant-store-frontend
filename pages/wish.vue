<template>
  <v-container>
    <h1 class="vtitle">
      Wish List
    </h1>
    <h1>Coming Soon</h1>
  </v-container>
</template>

<script>
export default {
  name: 'WishListPage',
  middleware: 'auth',

  head () {
    return {
      title: 'Wish List'
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
