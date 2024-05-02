import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/region',
    name: '省市区',
    component: () => import('../views/region/RegionView.vue')
  },
  {
    path: '/editor/toast-ui',
    name: 'ToastUi',
    component: () => import('../views/editor/ToastUiEditorView.vue')
  },
  {
    path: '/editor/wangeditor',
    name: 'WangEditor',
    component: () => import('../views/editor/WangEditorView.vue')
  },
  {
    path: '/password',
    name: 'Password',
    component: () => import('../views/PasswordView.vue')
  },
  {
    path: '/uuid',
    name: 'UUID',
    component: () => import('../views/UUIDView.vue')
  },
  {
    path: '/encryption/BCrypt',
    name: 'BCrypt',
    component: () => import('../views/encryption/BCryptView.vue')
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
    path: '/encryption/JWT',
    name: 'JWT',
    component: () => import('../views/encryption/JWTView.vue')
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
    component: () => import('../views/IPView.vue')
  },
  {
    path: '/idCard',
    name: 'idCard',
    component: () => import('../views/idCard/index.vue')
  },
  {
    path: '/docker/images/migrate',
    name: 'Docker Images Migrate',
    component: () => import('../views/docker/images/MigrateView.vue')
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
