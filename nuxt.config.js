import colors from 'vuetify/es5/util/colors'

export default {

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Valorant Store Checker',
    title: 'Valorant Store Checker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Check your daily store without launching Valorant! Quick, easy, and simple!' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Valorant Store Checker' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://valorantstore.net/' },
      { hid: 'og:title', property: 'og:title', content: 'Valorant Store Checker' },
      { hid: 'og:description', property: 'og:description', content: 'Check your daily store without launching Valorant! Quick, easy, and simple!' },
      { hid: 'og:image', property: 'og:image', content: 'https://valorantstore.net/img/icon.png' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/google-adsense',
    '@nuxtjs/google-gtag',
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  auth: {
    strategies: {
      discord: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/callback',
      home: '/'
    },
    cookie: {
      options: {
        maxAge: '604800',
        secure: true
      }
    },
    localStorage: false,
    resetOnError: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#FD4556',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          discord: '#7289da'
        },
      },
    },
  },

  i18n: {
    locales: [
      { code: 'ja', name: 'Japanese', iso: 'ja-JP', file: 'ja.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'nl', name: 'Dutch', iso: 'nl-NL', file: 'nl.json' },
      { code: 'cn', name: 'Chinese', iso: 'zh-CN', file: 'cn.json' },
      { code: 'ru', name: 'Russian', iso: 'ru-RU', file: 'ru.json' },
      { code: 'uk', name: 'Ukrainian', iso: 'ua-UA', file: 'uk.json' },
      { code: 'sv', name: 'Svenska', iso: 'sv-SV', file: 'sv.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'no_prefix',
    lazy: true
  },

  'google-adsense': {
    id: process.env.GA_ADSENSE_ID,
    analyticsUacct: process.env.GA_TRACKING_ID,
    analyticsDomainName: process.env.DOMAIN,
    pageLevelAds: true,
    test: false
  },

  'google-gtag': {
    id: process.env.GA_TRACKING_ID
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
