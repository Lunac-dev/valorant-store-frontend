<template>
  <v-app>
    <v-app-bar
      fixed
      app
      hide-on-scroll
    >
      <div
        class="d-flex align-center"
      >
        <img src="/img/vsbanner.png" alt="logo" class="hidden-sm-and-down" height="40"/>
        <v-btn v-for="item in menu" :key="item.icon" :to="item.link" text nuxt tile plain :ripple="false" class="hidden-sm-and-down">
          {{ item.title }}
        </v-btn>
        <v-badge dot overlap class="hidden-sm-and-down">
          <v-btn text nuxt tile plain :ripple="false" href="https://discord.gg/valorantstore-net" target="_blank">
            Community
          </v-btn>
        </v-badge>
      </div>
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon class="hidden-md-and-up" v-bind="attrs" v-on="on"/>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Menu</v-toolbar>
            <v-card-text>
              <v-list>
                <v-list-item v-for="item in menu" :key="item.icon" :to="item.link">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-tile>
                    {{ item.title }}
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <!-- <v-menu offset-y rounded="Large" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon class="hidden-md-and-up" v-bind="attrs" v-on="on"/>
        </template>
        <v-list shaped>
          <v-list-item v-for="item in menu" :key="item.icon" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-tile>
              {{ item.title }}
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-spacer />
      <v-menu open-on-hover offset-y rounded="Large" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-translate
            </v-icon>
            <v-icon>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list
          nav
        >
          <v-list-item v-if="$i18n.locale !== 'en'" @click="() => changeLocale('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$i18n.locale !== 'ja'" @click="() => changeLocale('ja')">
            <v-list-item-title>日本語</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$i18n.locale !== 'de'" @click="() => changeLocale('de')">
            <v-list-item-title>Deutsch</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$i18n.locale !== 'cn'" @click="() => changeLocale('cn')">
            <v-list-item-title>Chinese</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="!$store.state.auth.loggedIn"
        color="primary"
        @click="loginpage"
      >
        Login with Discord
      </v-btn>
      <v-menu v-else open-on-hover offset-y rounded="Large" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            tile
            :ripple="false"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar
              class="mr-3"
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
            {{ $store.state.auth.user.username }}
          </v-btn>
        </template>
        <v-list
          nav
        >
          <v-list-item @click="$auth.logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer
      app
      absolute
    >
      <span class="grey--text" style="font-size: 12px">&copy; {{ new Date().getFullYear() }} - valorantstore.net is not endorsed by Riot Games in any way. Riot Games, Valorant, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
Valorantstore.net was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. This is made by a player, for players.<br><a href="https://lunacnet.notion.site/lunacnet/Valorant-Store-Chcecker-ce4ed87caebb4fbc94e1af3debb5b7b8">ToS & Privacy Policy</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      menu: [
        { icon: "mdi-home", title: 'Home', link: "/" },
        { icon: "mdi-information", title: 'About', link: "about" },
        { icon: "mdi-view-dashboard", title: 'Dashboard', link: "dashboard" },
        { icon: "mdi-cart", title: 'Store', link: "store" },
        { icon: "mdi-cog", title: 'Settings', link: "settings" },
        { icon: "mdi-bell-ring", title: 'Reminder', link: "reminder" }
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
    },

    changeLocale (locale) {
      this.$i18n.setLocaleCookie(locale)
      this.$router.go(0)
    }
  }
}
</script>
