import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

const rsaDefineStore = defineStore('rsa', {
  state: () => ({
    publicKey: ref<string>('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCD5XD8TEL7d6EwN6WohUhLMPbx7LumqTY4hD0wHQDVB8QcOtyKiHTJEL+KnmY662gkDJnxiaeMUqX5c2AneXf3wLCYi6I8JmFqSNhOdxNdo/YvklPcmBAmxpW2grZdO4J2MWVykHrAMD07YJOKXDZcwe4HQgpoIH7hKvalcc4QnQIDAQAB'), // RSA 公钥
    privateKey: ref<string>('MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIPlcPxMQvt3oTA3paiFSEsw9vHsu6apNjiEPTAdANUHxBw63IqIdMkQv4qeZjrraCQMmfGJp4xSpflzYCd5d/fAsJiLojwmYWpI2E53E12j9i+SU9yYECbGlbaCtl07gnYxZXKQesAwPTtgk4pcNlzB7gdCCmggfuEq9qVxzhCdAgMBAAECgYBYoWqOL5TnNFlddFdeacnNtSaMJR9n+9cSnVIcrbCsdl6C9c7TTKTlo9qChLR/rUa6yrj7xRuQwM0FVlFr1UUWeoiYK4A7KKSMwbe5HZkj5hZM1O9T/nqXrdI+qztqUcPMoThE1W3pSJ1SuFH2NSoWyXuyYXRdoAyTwoVSVZ4WBQJBAOeqB4PlrNCVgCveabrc/WTTSuUvu42NKG7n7huaQtrDH7uy0GIumq8MwuZl+R6ZUtyxv2CA9MK0dPyPKSkDbCcCQQCRwG2g2XPgCDXyy0Sl+GOEnkf2JWKVhuGrlCf41gwJP77JPMekSrNi0Yw27c0YwdFmrtm/GKAGhL4vYtvxo+ObAkEAqkRl0aN1KLk4wwVtYFIcS4agfWJfzuH43crJTrBKgs72+9WpIwBt4ErY1M4OE1dNd7eMmTkurAxGD3qJHgPN8QJAbIQSm0GLjm9Oi1hf4hpPLfwSo+ctwRpNhsul/xSOnYxCZd3E3kNnz9koRfVDUH1thMAGCsswyemnF+zIyN42pQJAI6ZJSx+bUacrS6yhPLKJXDRrZtp7xCGLesc6kMK6Yyaa2FcQWs+XZncPEdlFxsFgOgAsBd9s+PpCv6DRFIR9Lg==') // RSA 私钥
  }),
  getters: {
    /**
     * RSA 公钥
     * @param state
     */
    getPublicKey (state) {
      return state.publicKey
    },
    /**
     * RSA 私钥
     * @param state
     */
    getPrivateKey (state) {
      return state.privateKey
    }
  },
  actions: {
    /**
     * RSA 公钥
     * @param publicKey
     */
    setPublicKey (publicKey: string) {
      this.publicKey = publicKey
    },
    /**
     * RSA 私钥
     * @param privateKey
     */
    setPrivateKey (privateKey: string) {
      this.privateKey = privateKey
    }
  }
})

const rsaStore = rsaDefineStore(createPinia())

// 订阅缓存的修改
rsaStore.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(rsaStore.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const aesStoreOld = localStorage.getItem(rsaStore.$id)
if (aesStoreOld) {
  // 返回已存在的缓存
  rsaStore.$state = JSON.parse(aesStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export default rsaStore
