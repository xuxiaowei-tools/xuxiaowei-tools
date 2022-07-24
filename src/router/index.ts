import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RSAView from '../views/encryption/RSAView.vue'
import AESView from '../views/encryption/AESView.vue'
import MD5View from '../views/encryption/MD5View.vue'
import Timestamp from '../views/timestamp/index.vue'
import IdCard from '../views/idCard/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/encryption/RSA',
    name: 'RSA',
    component: RSAView
  },
  {
    path: '/encryption/AES',
    name: 'AES',
    component: AESView
  },
  {
    path: '/encryption/MD5',
    name: 'MD5',
    component: MD5View
  },
  {
    path: '/timestamp',
    name: 'timestamp',
    component: Timestamp
  },
  {
    path: '/idCard',
    name: 'idCard',
    component: IdCard
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
