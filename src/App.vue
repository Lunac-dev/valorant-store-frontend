<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="([icon, text, link, exact], i) in items"
            :key="i"
            :to="link"
            :exact="exact"
            color="error"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      outlined
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <img class="mr-3 hidden-md-and-down" src="@/assets/vs.png" height="40"/>
      <v-spacer></v-spacer>
      <v-btn v-if="!this.$session.has('userinfo')"
        elevation="2"
        color="error"
        :href="loginurl"
        large
      >Login</v-btn>
      <v-btn v-if="this.$session.has('userinfo')"
        elevation="2"
        color="error"
        to="logout"
        large
      >Logout</v-btn>

      <v-switch
          class="mx-4 hidden-md-and-down"
          v-model="theme"
          :prepend-icon="themeIcon"
        ></v-switch>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer
      app
      color="#111111"
      dark
      absolute
    >
      <v-card
        flat
        tile
        color="#111111"
        class="text-center w-100"
      >
        <v-card-text>
          <v-btn
            large
            class="mx-4"
            href="https://discord.gg/4zrQDW9PNq"
          >Discord Community</v-btn>
          <v-btn
            large
            class="mx-4"
            @click="changeLang"
          >Change Language</v-btn>
        </v-card-text>

        <v-card-text class="pt-0 text--gray">
          valorantstore.net is not endorsed by Riot Games in any way. Riot Games, Valorant, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.<br>
This is made by a player, for players.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>&copy; valorantstore.net - VS{{ ver }}</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    items: [
      ['mdi-home-circle-outline', 'Home', './', true],
      ['mdi-account-cog-outline', 'Link Manager', './link', true],
      ['mdi-pistol', 'Daily Store', './store', true],
      ['mdi-trophy-variant-outline', 'VCT-Matches', './vct-matches', true],
      ['mdi-information-outline', 'About', './about', true],
    ],
    model: 1,
    drawer: null,
    ver: "1.6", //Ver
    theme: false, //theme switch
    loginurl: process.env.VUE_APP_API_BASE + "/auth"
  }),

  methods: {
    changeLang() {
      this.$i18n.locale = (this.$i18n.locale === 'ja') ? 'en' : 'ja';
    }
  },

  computed: {
    themeIcon() {
      return this.theme ? 'mdi-weather-night' : 'mdi-weather-sunny'
    }
  },
  watch: {
    theme() {
      this.$vuetify.theme.dark = this.theme
    }
  }
};
</script>

<style scoped lang="css">
@import url('https://fonts.cdnfonts.com/css/valorant');

.vtt {
  font-family: 'VALORANT', sans-serif;
}

</style>
