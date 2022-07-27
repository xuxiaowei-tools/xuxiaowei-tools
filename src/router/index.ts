import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { aesStore } from '../store'
import { createPinia } from 'pinia'
const pinia = createPinia()

const aes = aesStore(pinia)

// bug 复现
// 在 AES 页面，修改 key，刷新后，AES 页面中的值能保持修改后的
// 但是在此处依然获取的是预设值
console.log('在路由中测试获取缓存', aes.getKey)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/encryption/RSA',
    name: 'RSA',
    component: () => import('../views/encryption/RSAView.vue')
  },
  {
    path: '/encryption/AES',
    name: 'AES',
    component: () => import('../views/encryption/AESView.vue')
  },
  {
    path: '/encryption/MD5',
    name: 'MD5',
    component: () => import('../views/encryption/MD5View.vue')
  },
  {
    path: '/timestamp',
    name: 'timestamp',
    component: () => import('../views/timestamp/index.vue')
  },
  {
    path: '/ip',
    name: 'IP',
    component: () => import('../views/IP.vue')
  },
  {
    path: '/idCard',
    name: 'idCard',
    component: () => import('../views/idCard/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
