<template>
  <v-app dark>
    <v-app-bar
      flat
      app
      fixed
    >
      <v-app-bar-nav-icon @click="drawer=!drawer" />
      <v-spacer />
      <v-menu offset-y rounded="Removed" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="error"
            class="mr-10"
            outlined
            large
            v-bind="attrs"
            v-on="on"
          >
            Language
          </v-btn>
        </template>
        <v-list
          nav
        >
          <v-list-item v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$i18n.locale !== 'ja'" :to="switchLocalePath('ja')">
            <v-list-item-title>日本語</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="!$store.state.auth.loggedIn"
        color="error"
        large
        @click="loginpage"
      >
        Login
      </v-btn>
      <v-menu offset-y v-else rounded="Removed" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-bind="attrs"
            v-on="on"
          >
            <img
              v-if="avatar !== null"
              :src="avatar"
              alt="Discord Avatar"
            >
            <v-icon v-else>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </template>
        <v-list
          nav
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $store.state.auth.user.username }} #{{ $store.state.auth.user.discriminator }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$auth.logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
    >
      <v-container>
        <div>
          <v-list-item>
            <v-list-item-title class="text-center">
              <img alt="VS Logo" src="/images/vs.png" height="50">
            </v-list-item-title>
          </v-list-item>
        </div>
        <v-list
          dense
          nav
          shaped
        >
          <v-subheader>General</v-subheader>
          <v-list-item
            v-for="([icon, text, link, exact], i) in generalitems"
            :key="`first-${i}`"
            :to="localePath(link)"
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

          <v-subheader>Login Only</v-subheader>
          <v-list-item
            v-for="([icon, text, link, exact], i) in loginonlyitems"
            :key="`second-${i}`"
            :to="localePath(link)"
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
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer
      app
      absolute
      inset
    >
      <span class="grey--text" style="font-size: 12px">&copy; {{ new Date().getFullYear() }} - valorantstore.net is not endorsed by Riot Games in any way. Riot Games, Valorant, and all associated properties are trademarks or registered trademarks of Riot Games, Inc. was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. This is made by a player, for players.<br><a href="https://lunacnet.notion.site/lunacnet/Valorant-Store-Chcecker-ce4ed87caebb4fbc94e1af3debb5b7b8">ToS & Privacy Policy</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: null,
      generalitems: [
        ['mdi-home-outline', 'Home', 'index', true],
        // ['mdi-trophy-variant-outline', 'VCT-Matches', 'vct-matches', true],
        ['mdi-information-outline', 'About', 'about', true]
      ],
      loginonlyitems: [
        ['mdi-view-dashboard', 'Dashboard', 'dashboard', true],
        ['mdi-cart', 'Daily Store', 'store', true],
        ['mdi-account-cog-outline', 'Link Manager', 'link', true]
      ],
      avatar: null
    }
  },

  mounted () {
    if (this.$store.state.auth.loggedIn && this.$store.state.auth.user.avatar !== null) {
      this.avatar = 'https://cdn.discordapp.com/avatars/' + this.$store.state.auth.user.id + '/' + this.$store.state.auth.user.avatar + '.png'
    }
  },

  methods: {
    loginpage () {
      this.$router.push('/login')
    }
  }
}
</script>
