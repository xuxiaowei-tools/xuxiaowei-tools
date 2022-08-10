import { ref } from 'vue'
import { createPinia, defineStore } from 'pinia'

// 不能直接导出使用（需要设置订阅修改$subscribe、自定义获取数据$state的方法）
const jwtDefineStore = defineStore('jwt', {
  state: () => ({
    token: ref<string>('eyJhbGciOiJSUzI1NiJ9.eyJVU0VSU19JRCI6MSwic3ViIjoieHV4aWFvd2VpIiwiYXVkIjoieHV4aWFvd2VpX2NsaWVudF9pZCIsIm5iZiI6MTY1OTY3ODIwNywic2NvcGUiOlsic25zYXBpX2Jhc2UiXSwiaXNzIjoiaHR0cDpcL1wvMTcyLjE2LjU2LjIwNzoxNDAxIiwiZXhwIjoxNjU5NzIxNDA3LCJpYXQiOjE2NTk2NzgyMDcsImF1dGhvcml0aWVzIjpbIm1hbmFnZV91c2VyX2RlbGV0ZSIsInNuc2FwaV9iYXNlIiwidXNlcl9vYXV0aDJfdXNlckF1dGhlbnRpY2F0aW9uIiwidXNlcl9kZXRhaWxzIiwibWFuYWdlX2NsaWVudF9lZGl0IiwidXNlcl9vYXV0aDJfb2F1dGgyUmVxdWVzdCIsImF1ZGl0X2F1dGhvcml6YXRpb25fZGVsZXRlIiwiYXVkaXRfYXV0aG9yaXphdGlvbl9jb25zZW50X2RlbGV0ZSIsImF1ZGl0X2F1dGhvcml6YXRpb25fY29uc2VudF9yZWFkIiwibWFuYWdlX3VzZXJfYWRkIiwibWFuYWdlX3VzZXJfcmVhZCIsInVzZXJuYW1lX3Rva2VuX2RlbGV0ZSIsImNsaWVudElkX3Rva2VuX2RlbGV0ZSIsIm1hbmFnZV91c2VyX2F1dGhvcml0eSIsInVzZXJfaW5mbyIsImF1ZGl0X2F1dGhvcml6YXRpb25fcmVhZCIsIm1hbmFnZV9jbGllbnRfYWRkIiwibWFuYWdlX2NsaWVudF9kZWxldGUiLCJtYW5hZ2VfY2xpZW50X3JlYWQiLCJ1c2VyX2F1dGhvcml0aWVzIiwibWFuYWdlX3VzZXJfZWRpdCJdLCJ1c2VybmFtZSI6Inh1eGlhb3dlaSJ9.Bb82mwwy8Df9i_0vjs_YN9Se_uc8DYfkWDOjrtsPGWUw3JtcGro9JOUD_8O5xEz4PaCT9cCY4LJEUMzSIH3sGMYcUdtsma6qfNXHxgdguqgbCwkWUYaVGTKBuxcZhByX2K1r5X2qmD05zfdPwBMt7qsCxE83u6Xm2GO5j39BlDwuVHJ9-i1BYMBG6vNH-mcPkdG4EV9DNjHmkv5zW2J7cwIb8sT-8QXUv246nT8pOru8ZvUCa0_rAj6RXo0mJWkkR4TFBBwWs22tMfFUbeQ-hmCY8hn07R6bEI8JrQG8PENORKwmcu8_I2QzMLUvR3lmI8mvKPjmqH4Mek9bOOFh3Q'), // Token
    format: ref<boolean>(true) // format
  }),
  getters: {

  },
  actions: {
    /**
     * token
     * @param token
     */
    setToken (token: string) {
      this.token = token
    },
    /**
     * format
     * @param format
     */
    setFormat (format: boolean) {
      this.format = format
    }
  }
})

const jwtStore = jwtDefineStore(createPinia())

// 订阅缓存的修改
jwtStore.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(jwtStore.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const jwtStoreOld = localStorage.getItem(jwtStore.$id)
if (jwtStoreOld) {
  // 返回已存在的缓存
  jwtStore.$state = JSON.parse(jwtStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export default jwtStore
