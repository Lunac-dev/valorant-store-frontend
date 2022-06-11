import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import VueI18n from 'vue-i18n'
import VueSession from 'vue-session'
var options = {
  persist: true
}
Vue.use(VueSession, options)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@mdi/font/css/materialdesignicons.css'
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    // 翻訳用のjson
    ja : require('./assets/lang/ja.json'),
    en : require('./assets/lang/en.json')
  }
});

window.Swal = VueSweetalert2;

Vue.config.productionTip = false

Vue.use({
  install (Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: 'http://localhost:3000/'
    })
  }
})


new Vue({
  vuetify,
  router,
  i18n: i18n,
  render: h => h(App)
}).$mount('#app')
