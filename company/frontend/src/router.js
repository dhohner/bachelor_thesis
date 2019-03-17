import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store/'

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/control',
      name: 'control',
      component: () =>
        import(/* webpackChunkName: "control" */ './views/Control.vue'),
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    }
  ]
})
