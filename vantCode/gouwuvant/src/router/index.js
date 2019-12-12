import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    component: Homepage
  },
  // 登录
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  // 个人中心
  {
    path: '/me',
    component: () => import('../views/Me.vue'),
    meta: {
      metalogin: true
    }
  },
  // 注册
  {
    path: '/register',
    component: () => import('../views/register.vue')
  },
  // 购物车
  {
    path: '/Shopcart',
    component: () => import('../views/Shopcart.vue'),
    meta: {
      metalogin: true
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 添加路由导航
router.beforeEach((to, from, next) => {
  // 判断要去的路由中meta是否为undefined和meta.metalogin是否为undefined和meta.metalogin为true
  if (to.meta !== undefined && to.meta.metalogin !== undefined && to.meta.metalogin) {
    let token = localStorage.getItem('token')
    if (token === null) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
