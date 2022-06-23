<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1 class="vtitle">
          We Are <span class="valofont">VSC</span>
        </h1>
        <h3>{{ $t('about-subtitle') }}</h3>
      </v-col>
    </v-row>
    <div class="pt-10">
      <div class="v-responsive d-flex align-center mx-auto justify-center" style="height: 100%; max-width: 100vh; width: 100%;">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
        >
          <v-row align-content="center">
            <v-col align="center">
              <img src="/images/vsbot.png" style="border-radius: 10%">
            </v-col>
            <v-col align="center">
              <h1>Discord Bot</h1>
              <p class="text--secondary">
                {{ $t('about-discordbot') }}
              </p>
              <v-btn
                elevation="2"
                block
                color="error"
              >
                {{ $t('index-invitebot') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
    <div class="pt-10">
      <div class="v-responsive d-flex align-center mx-auto justify-center" style="height: 100%; max-width: 100vh; width: 100%;">
        <v-card
          elevation="2"
          class="pa-5"
          width="100vh"
        >
          <v-row align-content="center">
            <v-col align="center">
              <h1>Missions on the Web</h1>
              <p class="text--secondary">
                {{ $t('about-mission') }}
              </p>
              <v-btn
                elevation="2"
                block
                color="error"
                to="/dashboard"
              >
                VISIT
              </v-btn>
            </v-col>
            <v-col align="center">
              <img src="/images/mission.png" style="border-radius: 10%">
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'AboutPage',

  head () {
    return {
      title: 'About'
    }
  }
}
</script>

<style scoped lang="css">
@import url('https://fonts.cdnfonts.com/css/valorant');
.valofont {
  color: #ff4655;
  font-family: 'VALORANT', sans-serif;
}

.vtitle {
  font-size: 10vh;
}
</style>
