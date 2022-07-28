import { ref } from 'vue'
import { createPinia, defineStore } from 'pinia'

// 不能直接导出使用（需要设置订阅修改$subscribe、自定义获取数据$state的方法）
const aesDefineStore = defineStore('aes', {
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

const aesStore = aesDefineStore(createPinia())

// 订阅缓存的修改
aesStore.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(aesStore.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const aesStoreOld = localStorage.getItem(aesStore.$id)
if (aesStoreOld) {
  // 返回已存在的缓存
  aesStore.$state = JSON.parse(aesStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export default aesStore
