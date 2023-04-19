<template>
  <div>
    <v-container fluid fill-height class="mtop">
      <v-row>
        <v-col class="text-center">
          <h1 class="primary--text" style="font-family: 'VALORANT', sans-serif; font-size: 7vh">Valorant Store Checker</h1>
          <h1>Making <span class="valofont">Valorant</span> Life More Comfortable</h1>
          <v-btn
            href="https://discord.com/api/oauth2/authorize?client_id=962376379658297375&permissions=83968&scope=bot%20applications.commands"
            color="primary"
            outlined
            x-large
          >
            <v-icon
              left
            >
              mdi-robot-excited-outline
            </v-icon>
            {{ $t('index_btn1') }}
          </v-btn>
          <v-btn
            color="primary"
            x-large
            :to="localePath('store')"
          >
            <v-icon
              left
            >
              mdi-cart
            </v-icon>
            {{ $t('index_btn2') }}
          </v-btn>
          <v-btn
            color="primary"
            x-large
            href="https://apps.apple.com/us/app/store-checker-for-valorant/id1637273546"
          >
            <v-icon
              left
            >
              mdi-apple
            </v-icon>
            {{ $t('index_btn3') }}
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000 100%), url("/img/bg2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}

.valofont {
  color: #ff4655;
  font-family: 'VALORANT', sans-serif;
}
</style>