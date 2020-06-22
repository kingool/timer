import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//hotplaymovie
    name: 'HotPlayMoive',
    component: () => import(/* webpackChunkName: "about" */ '../views/HotPlayMoive.vue')
  },
  {
    path: '/comingmovie',
    name: 'MovieComing',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovieComing.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
  },
  {
    path: '/Moviedetails',
    name: 'Moviedetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/Moviedetails.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

export default router
