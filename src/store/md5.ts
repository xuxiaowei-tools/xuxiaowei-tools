import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

const md5DefineStore = defineStore('md5', {
  state: () => ({
    md5Text: ref<string>('123'), // MD5 加密文本
    md5TextCiphertextCase: ref<boolean>(false) // MD5 加密密文大小写，true：大写，false：小写
  }),
  getters: {
    /**
     * MD5 加密文本
     * @param state
     */
    getMd5Text (state) {
      return state.md5Text
    },
    /**
     * MD5 加密密文大小写，true：大写，false：小写
     * @param state
     */
    getMd5TextCiphertextCase (state) {
      return state.md5TextCiphertextCase
    }
  },
  actions: {
    /**
     * MD5 加密文本
     * @param md5Text
     */
    setMd5Text (md5Text: string) {
      this.md5Text = md5Text
    },
    /**
     * MD5 加密密文大小写，true：大写，false：小写
     * @param md5TextCiphertextCase
     */
    setMd5TextCiphertextCase (md5TextCiphertextCase: boolean) {
      this.md5TextCiphertextCase = md5TextCiphertextCase
    }
  }
})

const md5Store = md5DefineStore(createPinia())

// 订阅缓存的修改
md5Store.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(md5Store.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const aesStoreOld = localStorage.getItem(md5Store.$id)
if (aesStoreOld) {
  // 返回已存在的缓存
  md5Store.$state = JSON.parse(aesStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export default md5Store
