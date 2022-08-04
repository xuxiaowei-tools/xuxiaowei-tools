import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'
import { NUMBERS, LOWER_CASE, UPPER_CASE, SPECIALS } from '../utils/random-utils'

const passwordDefineStore = defineStore('password', {
  state: () => ({
    numbers: ref<string>(NUMBERS), // 数字
    includeNumbers: ref<boolean>(true), // 是否包含数字

    specials: ref<string>(SPECIALS), // 符号
    includeSpecials: ref<boolean>(true), // 是否包含符号

    lowerCase: ref<string>(LOWER_CASE), // 小写字母
    includeLowerCase: ref<boolean>(true), // 是否包含小写字母

    upperCase: ref<string>(UPPER_CASE), // 大写字母
    includeUpperCase: ref<boolean>(true), // 是否包含大写字母

    passwordLength: ref<number>(10), // 长度
    num: ref<number>(5) // 数量
  }),
  getters: {
    /**
     * 数字
     * @param state
     */
    getNumbers (state) {
      return (state.numbers === '' || state.numbers === undefined) ? NUMBERS : state.numbers
    },

    /**
     * 符号
     * @param state
     */
    getSpecials (state) {
      return (state.specials === '' || state.specials === undefined) ? SPECIALS : state.specials
    },

    /**
    * 小写字母
    * @param state
    */
    getLowerCase (state) {
      return (state.lowerCase === '' || state.lowerCase === undefined) ? LOWER_CASE : state.lowerCase
    },

    /**
     * 大写字母
     * @param state
     */
    getUpperCase (state) {
      return (state.upperCase === '' || state.upperCase === undefined) ? UPPER_CASE : state.upperCase
    },

    /**
     * 长度
     * @param state
     */
    getPasswordLength (state) {
      return state.passwordLength
    },
    /**
     * 数量
     * @param state
     */
    getNum (state) {
      return state.num
    }
  },
  actions: {
    /**
     * 数字
     * @param numbers
     */
    setNumbers (numbers: string) {
      this.numbers = numbers
    },
    /**
     * 是否包含数字
     * @param includeNumbers
     */
    setIncludeNumbers (includeNumbers: boolean) {
      this.includeNumbers = includeNumbers
    },

    /**
     * 符号
     * @param specials
     */
    setSpecials (specials: string) {
      this.specials = specials
    },
    /**
     * 是否包含符号
     * @param includeSpecials
     */
    setIncludeSpecials (includeSpecials: boolean) {
      this.includeSpecials = includeSpecials
    },

    /**
     * 小写字母
     * @param lowerCase
     */
    setLowerCase (lowerCase: string) {
      this.lowerCase = lowerCase
    },
    /**
     * 是否包含小写字母
     * @param includeLowerCase
     */
    setIncludeLowerCase (includeLowerCase: boolean) {
      this.includeLowerCase = includeLowerCase
    },

    /**
     * 大写字母
     * @param upperCase
     */
    setUpperCase (upperCase: string) {
      this.upperCase = upperCase
    },
    /**
     * 是否包含大写字母
     * @param includeUpperCase
     */
    setIncludeUpperCase (includeUpperCase: boolean) {
      this.includeUpperCase = includeUpperCase
    },

    /**
     * 长度
     * @param passwordLength
     */
    setPasswordLength (passwordLength: number) {
      this.passwordLength = passwordLength
    },
    /**
     * 数量
     * @param num
     */
    setNum (num: number) {
      this.num = num
    }

  }
})

const passwordStore = passwordDefineStore(createPinia())

// 订阅缓存的修改
passwordStore.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(passwordStore.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const passwordStoreOld = localStorage.getItem(passwordStore.$id)
if (passwordStoreOld) {
  // 返回已存在的缓存
  passwordStore.$state = JSON.parse(passwordStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export default passwordStore
