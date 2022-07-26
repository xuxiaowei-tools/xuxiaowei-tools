import { ref } from 'vue'
import { defineStore, createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export default store

export const aesStore = defineStore({
  id: 'aes',
  // @ts-ignore
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'aes', // 秘钥
        storage: localStorage // 存储方式，默认：sessionStorage，可选：localStorage
      }
    ]
  },
  state: () => ({
    key: ref<string>('1234567890ABCDEF'), // AES 秘钥
    iv: ref<string>('abcdefghijklmnop'), // AES 偏移量
    mode: ref<string>('ECB'), // AES 模式
    padding: ref<string>('Pkcs7') // AES 填充
  }),
  getters: {
    /**
     * AES 秘钥
     * @param state
     */
    getKey (state) {
      return state.key
    },
    /**
     * AES 偏移量
     * @param state
     */
    getIv (state) {
      return state.iv
    },
    /**
     * AES 模式
     * @param state
     */
    getMode (state) {
      return state.mode
    },
    /**
     * AES 填充
     * @param state
     */
    getPadding (state) {
      return state.padding
    }
  },
  actions: {
    /**
     * AES 秘钥
     * @param key
     */
    setKey (key: string) {
      this.key = key
    },
    /**
     * AES 偏移量
     * @param iv
     */
    setIv (iv: string) {
      this.iv = iv
    },
    /**
     * AES 模式
     * @param mode
     */
    setMode (mode: string) {
      this.mode = mode
    },
    /**
     * AES 填充
     * @param padding
     */
    setPadding (padding: string) {
      this.padding = padding
    }
  }
})
