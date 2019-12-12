import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/me',
    component: () => import('../views/me.vue')
  },
  {
    path: '/editpass',
    component: () => import('../views/editpass.vue')
  },
  {
    path: '/rankinglist',
    component: () => import('../views/rankinglist.vue')
  },
  {
    path: '/htmlitem/:id/item',
    component: () => import('../components/HTMLitem.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
