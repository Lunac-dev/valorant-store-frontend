import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Store from './components/Store.vue'
import NotFound from './components/NotFound.vue'
import About from './components/About.vue'
import Logout from './components/Logout.vue'
import Getuser from './components/Getuser.vue'
import VCTMatches from './components/Vct-matches.vue'
import Link from './components/Link.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/vct-matches',
      name: 'vct-matches',
      component: VCTMatches
    },
    {
      path: '/link',
      name: 'link',
      component: Link
    },
    {
      path: '/store',
      name: 'store',
      component: Store,
    },
    {
      name: 'logout',
      path: '/logout',
      component: Logout,
      exact: false,
    },
    {
      name: 'getuser',
      path: '/getuser',
      component: Getuser,
      exact: false,
    },
    {
      name: 'notFound',
      path: '/*',
      component: NotFound,
      meta: { title: '404 Not Found'},
      exact: false,
    }
  ]
})