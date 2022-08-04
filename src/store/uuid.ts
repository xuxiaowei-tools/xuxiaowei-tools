import { ref } from 'vue'
import { createPinia, defineStore } from 'pinia'

// 不能直接导出使用（需要设置订阅修改$subscribe、自定义获取数据$state的方法）
const uuidDefineStore = defineStore('uuid', {
  state: () => ({
    num: ref<number | string>(5), // 生成数量
    separator: ref<boolean>(true), // 分隔符
    upperCase: ref<boolean>(false), // 转大写
    length: ref<number | undefined>() // 长度
  }),
  getters: {
    /**
     * 生成数量
     * @param state
     */
    getNum (state) {
      return state.num
    },
    /**
     * 分隔符
     * @param state
     */
    getSeparator (state) {
      return state.separator
    },
    /**
     * 转大写
     * @param state
     */
    getUpperCase (state) {
      return state.upperCase
    },
    /**
     * 长度
     * @param state
     */
    getLength (state) {
      return state.length
    }
  },
  actions: {
    /**
     * 生成数量
     * @param num
     */
    setNum (num: number | string) {
      this.num = num
    },
    /**
     * 分隔符
     * @param separator
     */
    setSeparator (separator: boolean) {
      this.separator = separator
    },
    /**
     * 转大写
     * @param upperCase
     */
    setUpperCase (upperCase: boolean) {
      this.upperCase = upperCase
    },
    /**
     * 长度
     * @param length
     */
    setLength (length: number | undefined) {
      this.length = length
    }
  }
})

const uuidStore = uuidDefineStore(createPinia())

// 订阅缓存的修改
uuidStore.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(uuidStore.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const uuidStoreOld = localStorage.getItem(uuidStore.$id)
if (uuidStoreOld) {
  // 返回已存在的缓存
  uuidStore.$state = JSON.parse(uuidStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export default uuidStore
