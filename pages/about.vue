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
                href="https://discord.com/api/oauth2/authorize?client_id=962376379658297375&permissions=83968&scope=bot%20applications.commands"
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
    <div style="text-align: center">
      <adsbygoogle
        ad-slot="4143888168"
        :ad-style="{ display: 'block', height: '90px' }"
        ad-format="horizontal"
      />
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
              <img src="/images/mission.png">
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
              <v-img
                src="/images/iosapp.png"
                height="250px"
                width="400px"
                contain
                style="border-radius: 10%"
              />
            </v-col>
            <v-col align="center">
              <h1>iOS App</h1>
              <p class="text--secondary">
                {{ $t('about-iosapp') }}
              </p>
              <v-btn
                href="https://apps.apple.com/app/id1637273546"
                color="error"
                x-large
                class="mt-5"
                target="_blank"
              >
                <v-icon left>
                  mdi-apple
                </v-icon>
                App Store
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
          class="pa-5 text-center"
          width="100vh"
        >
          <v-row align-content="center">
            <v-col align="center">
              <h1>Contact Us</h1>
              <iframe
                src="https://discord.com/widget?id=781946764168658984&theme=dark"
                width="350"
                height="300"
                allowtransparency="true"
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              />
            </v-col>
            <v-col align="center">
              <h1>Safe?</h1>
              <p class="text--secondary">
                {{ $t('about-safe') }}
              </p>
              <v-btn
                elevation="2"
                block
                color="info"
                href="https://github.com/Lunac-dev/valorant-store-frontend"
              >
                valorant-store-frontend
              </v-btn>
              <v-btn
                class="mt-5"
                elevation="2"
                block
                color="info"
                href="https://github.com/Lunac-dev/valorant-store-backend"
              >
                valorant-store-backend
              </v-btn>
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
  middleware: 'maintenance',

  head () {
    return {
      title: 'About'
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
  font-size: 10vh;
}
</style>
