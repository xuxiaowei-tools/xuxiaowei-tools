import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import 'uno.css'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
