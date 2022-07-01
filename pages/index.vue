<template>
  <div>
    <v-container fluid fill-height class="mtop">
      <v-row>
        <v-col class="text-center">
          <span class="mtop-h1">VSC</span>
          <h1>Making <span class="valofont">Valorant</span> Life More Comfortable</h1>
          <v-btn
            href="https://discord.com/api/oauth2/authorize?client_id=962376379658297375&permissions=83968&scope=bot%20applications.commands"
            color="error"
            outlined
            x-large
            class="mt-5"
          >
            {{ $t('index-invitebot') }}
          </v-btn>
          <v-btn
            color="error"
            x-large
            class="mt-5"
            :to="localePath('dashboard')"
          >
            {{ $t('index-dashboard') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  head () {
    return {
      title: 'Home'
    }
  }
}
</script>

<style scoped lang="css">
.mtop {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000 100%), url("/images/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}

.mtop-h1 {
  color: #ff4655;
  font-family: 'VALORANT', sans-serif;
  font-size: 15vh
}

.valofont {
  color: #ff4655;
  font-family: 'VALORANT', sans-serif;
}
</style>
