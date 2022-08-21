import colors from 'vuetify/es5/util/colors'

export default {
  loadingIndicator: {
    name: 'circle',
    color: '#fa4454',
    background: 'white'
  },
  loading: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Valorant Store Checker',
    title: 'VSC',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Check your daily store without launching Valorant! Quick, easy, and simple!' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Valorant Store Checker' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://valorantstore.net/' },
      { hid: 'og:title', property: 'og:title', content: 'Valorant Store Checker' },
      { hid: 'og:description', property: 'og:description', content: 'Check your daily store without launching Valorant! Quick, easy, and simple!' },
      { hid: 'og:image', property: 'og:image', content: 'https://valorantstore.net/images/vs.png' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.cdnfonts.com/css/valorant',
      },
      {
        rel: 'stylesheet',
        href: 'http://fonts.cdnfonts.com/css/league-spartan',
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/sentry',
    '@nuxtjs/google-adsense',
    '@nuxtjs/google-gtag'
  ],

  i18n: {
    locales: [
      { code: 'ja', name: 'Japanese', iso: 'ja_JP', file: 'ja.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'de', name: 'German', iso: 'de-DE', file: 'de.json' },
      { code: 'fr', name: 'French', iso: 'fr-FR', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'no_prefix',
    lazy: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   baseURL: '/'
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: "#fa4454",
          success: colors.green.accent3
        }
      }
    }
  },

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  manifest: {
    name: 'Valorant Store Checker',
    short_name: 'VSC',
    description: 'Check your daily store without launching Valorant! Quick, easy, and simple!',
    theme_color: '#FFFFFF',
    background_color: '#FFFFFF'
  },

  auth: {
    strategies: {
      discord: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },

  'google-adsense': {
    id: process.env.GA_ADSENSE_ID,
    analyticsUacct: process.env.GA_TRACKING_ID,
    analyticsDomainName: process.env.DOMAIN,
    pageLevelAds: false
  },

  'google-gtag': {
    id: process.env.GA_TRACKING_ID
  },

  publicRuntimeConfig: {
    API_BASE: process.env.API_BASE
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
