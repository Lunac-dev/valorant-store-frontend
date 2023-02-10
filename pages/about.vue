<template>
  <v-container>
    <div style="text-align: center">
      <adsbygoogle
        :ad-slot="'4143888168'"
        :ad-format="'horizontal'"
      />
    </div>
    <h1 class="text-center">
      {{ $t('about_title') }}
    </h1>
    <div class="pt-5">
      <v-card
        elevation="2"
        class="pa-5"
        width="100%"
      >
        <v-row class="d-flex align-center mx-auto justify-center">
          <v-col align="center" cols="12" sm="6">
            <v-img src="/img/icon.png" max-height="200" aspect-ratio="1.7" contain />
          </v-col>
          <v-col align="center" cols="12" sm="6">
            <p class="text--secondary">
              {{ $t('about_description') }}
            </p>
            <v-btn href="https://apps.apple.com/us/app/store-checker-for-valorant/id1637273546" target="_blank" color="primary" x-large>
              GET iOS APP FROM APPLE STORE
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div style="text-align: center">
      <adsbygoogle
        ad-slot="4143888168"
        :ad-style="{ display: 'block', height: '90px' }"
        ad-format="horizontal"
      />
    </div>
    <div class="pt-5">
      <v-card
        elevation="2"
        class="pa-5"
        width="100%"
      >
        <v-row class="d-flex align-center mx-auto justify-center">
          <v-col align="center" cols="12" sm="6">
            <v-img src="/img/discord.png" max-height="200" aspect-ratio="1.7" contain />
          </v-col>
          <v-col align="center" cols="12" sm="6">
            <p class="text--secondary">
              {{ $t('about_discord') }}
            </p>
            <v-btn href="https://discord.gg/valorantstore-net" target="_blank" color="discord" x-large>
              JOIN US!
            </v-btn>
            <v-btn href="https://discord.com/oauth2/authorize?client_id=962376379658297375&permissions=83968&scope=bot%20applications.commands" target="_blank" color="discord" x-large outlined>
              DISCORD BOT
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div class="pt-5">
      <v-card
        elevation="2"
        width="100%"
      >
        <v-card-title>
          {{ $t('about_safety') }}
        </v-card-title>
        <v-card-text>
          {{ $t('about_safety_text') }}
        </v-card-text>
      </v-card>
    </div>
    <div class="pt-5">
      <v-card
        class="pa-3"
        elevation="2"
        width="100%"
      >
        <v-card-title>
          {{ $t('about_faq') }}
        </v-card-title>
        <v-card outlined class="ma-5">
          <v-card-title>
            {{ $t('about_faq_qsafe') }}
          </v-card-title>
          <v-card-text>
            {{ $t('about_faq_asafe') }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              href="https://github.com/Lunac-dev/valorant-store-frontend"
              target="_blank"
            >
              Github
              <v-icon>
                mdi-github
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card outlined class="ma-5">
          <v-card-title>
            {{ $t('about_faq_qmyregion') }}
          </v-card-title>
          <v-card-text>
            {{ $t('about_faq_amyregion') }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              href="https://account.riotgames.com/"
              target="_blank"
            >
              Riot games Account
              <v-icon>
                mdi-account-check-outline
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card outlined class="ma-5">
          <v-card-title>
            {{ $t('about_faq_qmyriotname') }}
          </v-card-title>
          <v-card-text>
            {{ $t('about_faq_amyriotname') }}
          </v-card-text>
        </v-card>
      </v-card>
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
.valofont {
  color: #ff4655;
  font-family: 'VALORANT', sans-serif;
}
.vtitle {
  font-size: 10vh;
}
</style>
