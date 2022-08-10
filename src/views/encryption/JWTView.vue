<template>
  <el-row justify="center">
    <el-col :span="22" class="text-center">
      <h1>JWT</h1>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="22">
      <el-button @click="decode" class="decode-button">解码</el-button>
      <el-select v-model="format" placeholder="是否格式化" class="decode-select w-100px">
        <el-option label="格式化" :value="true"/>
        <el-option label="不格式化" :value="false"/>
      </el-select>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="22">
      <el-input v-model="token" class="token-input" placeholder="原文" type="textarea" @dblclick="dblclick"
                rows="8" data-dblclick="token已复制到剪贴板"/>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="headerShow" class="token-input" placeholder="原文" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="header已复制到剪贴板"/>
    </el-col>
    <el-col :span="11">
      <el-input v-model="payloadShow" class="token-input" placeholder="原文" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="payload已复制到剪贴板"/>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import jwtDecode from 'jwt-decode'
import dblclick from '../../utils/clipboard'

const token = ref<string>('eyJhbGciOiJSUzI1NiJ9.eyJVU0VSU19JRCI6MSwic3ViIjoieHV4aWFvd2VpIiwiYXVkIjoieHV4aWFvd2VpX2NsaWVudF9pZCIsIm5iZiI6MTY1OTY3ODIwNywic2NvcGUiOlsic25zYXBpX2Jhc2UiXSwiaXNzIjoiaHR0cDpcL1wvMTcyLjE2LjU2LjIwNzoxNDAxIiwiZXhwIjoxNjU5NzIxNDA3LCJpYXQiOjE2NTk2NzgyMDcsImF1dGhvcml0aWVzIjpbIm1hbmFnZV91c2VyX2RlbGV0ZSIsInNuc2FwaV9iYXNlIiwidXNlcl9vYXV0aDJfdXNlckF1dGhlbnRpY2F0aW9uIiwidXNlcl9kZXRhaWxzIiwibWFuYWdlX2NsaWVudF9lZGl0IiwidXNlcl9vYXV0aDJfb2F1dGgyUmVxdWVzdCIsImF1ZGl0X2F1dGhvcml6YXRpb25fZGVsZXRlIiwiYXVkaXRfYXV0aG9yaXphdGlvbl9jb25zZW50X2RlbGV0ZSIsImF1ZGl0X2F1dGhvcml6YXRpb25fY29uc2VudF9yZWFkIiwibWFuYWdlX3VzZXJfYWRkIiwibWFuYWdlX3VzZXJfcmVhZCIsInVzZXJuYW1lX3Rva2VuX2RlbGV0ZSIsImNsaWVudElkX3Rva2VuX2RlbGV0ZSIsIm1hbmFnZV91c2VyX2F1dGhvcml0eSIsInVzZXJfaW5mbyIsImF1ZGl0X2F1dGhvcml6YXRpb25fcmVhZCIsIm1hbmFnZV9jbGllbnRfYWRkIiwibWFuYWdlX2NsaWVudF9kZWxldGUiLCJtYW5hZ2VfY2xpZW50X3JlYWQiLCJ1c2VyX2F1dGhvcml0aWVzIiwibWFuYWdlX3VzZXJfZWRpdCJdLCJ1c2VybmFtZSI6Inh1eGlhb3dlaSJ9.Bb82mwwy8Df9i_0vjs_YN9Se_uc8DYfkWDOjrtsPGWUw3JtcGro9JOUD_8O5xEz4PaCT9cCY4LJEUMzSIH3sGMYcUdtsma6qfNXHxgdguqgbCwkWUYaVGTKBuxcZhByX2K1r5X2qmD05zfdPwBMt7qsCxE83u6Xm2GO5j39BlDwuVHJ9-i1BYMBG6vNH-mcPkdG4EV9DNjHmkv5zW2J7cwIb8sT-8QXUv246nT8pOru8ZvUCa0_rAj6RXo0mJWkkR4TFBBwWs22tMfFUbeQ-hmCY8hn07R6bEI8JrQG8PENORKwmcu8_I2QzMLUvR3lmI8mvKPjmqH4Mek9bOOFh3Q')

const header = ref<string>('')
const headerShow = ref<string>('')

const payload = ref<string>('')
const payloadShow = ref<string>('')

const format = ref<boolean>(true)
watch(() => format.value, (newValue, oldValue) => {
  show(newValue)
})

const decode = () => {
  header.value = JSON.stringify(jwtDecode(token.value, { header: true }))
  payload.value = JSON.stringify(jwtDecode(token.value))

  // const tokenSplit = token.value?.split('.')
  // if (tokenSplit?.length >= 1) {
  //   header.value = window.atob(tokenSplit[0])
  // }
  //
  // if (tokenSplit?.length >= 2) {
  //   payload.value = window.atob(tokenSplit[1])
  // }

  show(format.value)
}

const show = (boo: boolean) => {
  if (boo) {
    headerShow.value = JSON.stringify(JSON.parse(header.value), null, '\t')
    payloadShow.value = JSON.stringify(JSON.parse(payload.value), null, '\t')
  } else {
    headerShow.value = header.value
    payloadShow.value = payload.value
  }
}

</script>

<style scoped>

.decode-button {
  width: calc(100% - 100px);
}

</style>
