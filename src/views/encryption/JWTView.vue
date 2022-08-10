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
      <el-input v-model="token" class="token-input" placeholder="token" type="textarea" @dblclick="dblclick"
                rows="8" data-dblclick="token已复制到剪贴板"/>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="alg" @dblclick="dblclick" readonly data-dblclick="加密方式 alg 已复制到剪贴板">
        <template #prepend>
          <span>加密方式 alg</span>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11">
      <el-input v-model="issuer" @dblclick="dblclick" readonly data-dblclick="签发者 issuer、iss 已复制到剪贴板">
        <template #prepend>
          <span>签发者 issuer、iss</span>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-tooltip class="box-item" effect="dark" :content="issuedAttooltip" placement="top-end"
                  :disabled="issuedAt === ''">
        <el-input v-model="issuedAt" @dblclick="dblclick" readonly data-dblclick="签发时间 issuedAt、iat 已复制到剪贴板">
          <template #prepend>
            <span>签发时间 issuedAt、iat</span>
          </template>
        </el-input>
      </el-tooltip>
    </el-col>
    <el-col :span="11">
      <el-tooltip class="box-item" effect="dark" :content="expirationAttooltip" placement="top-end"
                  :disabled="expiration === ''">
        <el-input v-model="expiration" @dblclick="dblclick" readonly
                  data-dblclick="过期时间 expiration、exp 已复制到剪贴板">
          <template #prepend>
            <span>过期时间 expiration、exp</span>
          </template>
        </el-input>
      </el-tooltip>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="audience" @dblclick="dblclick" readonly data-dblclick="观众 audience、aud 已复制到剪贴板">
        <template #prepend>
          <span>观众 audience、aud</span>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11">
      <el-input v-model="subject" @dblclick="dblclick" readonly data-dblclick="主题 subject、sub 已复制到剪贴板">
        <template #prepend>
          <span>主题 subject、sub</span>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="headerShow" class="token-input" placeholder="header" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="header已复制到剪贴板"/>
    </el-col>
    <el-col :span="11">
      <el-input v-model="payloadShow" class="token-input" placeholder="payload" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="payload已复制到剪贴板"/>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus/es'
import dblclick from '../../utils/clipboard'
import jwtStore from '../../store/jwt'

const token = ref<string>(jwtStore.token)
watch(() => token.value, (newValue, oldValue) => {
  jwtStore.setToken(newValue)
})

// 头部
const header = ref<string>('')
// 头部：显示
const headerShow = ref<string>('')

// 载荷
const payload = ref<string>('')
// 载荷：显示
const payloadShow = ref<string>('')

// 加密方式
const alg = ref<string>('')
// 签发者：issuer、iss
const issuer = ref<string>('')

// 签发时间：issuedAt、iat
const issuedAt = ref<string | number>('')
// 签发时间：鼠标覆盖展示
const issuedAttooltip = ref('')
watch(() => issuedAt.value, (newValue: number | string, oldValue: number | string) => {
  if (typeof newValue === 'number') {
    issuedAttooltip.value = new Date(newValue * 1000).toLocaleString()
  }
})

// 过期时间
const expiration = ref<string>('')
// 过期时间：鼠标覆盖展示
const expirationAttooltip = ref<string>('')
watch(() => expiration.value, (newValue: number | string, oldValue: number | string) => {
  if (typeof newValue === 'number') {
    expirationAttooltip.value = new Date(newValue * 1000).toLocaleString()
  }
})

// 观众
const audience = ref<string>('')
// 主题
const subject = ref<string>('')

// 格式化
const format = ref<boolean>(jwtStore.format)
watch(() => format.value, (newValue, oldValue) => {
  jwtStore.setFormat(newValue)

  show(newValue)
})

// 解密
const decode = () => {
  if (token.value === '') {
    ElMessage.error('token不能为空')
    return
  }

  const tokenSplit = token.value?.split('.')
  if (tokenSplit?.length >= 1) {
    try {
      header.value = window.atob(tokenSplit[0])
    } catch (e) {
      headerShow.value = ''
      console.error('解密header时异常', e)
      ElMessage.error('解密header时异常')
    }
  } else {
    ElMessage.error('未找到header')
  }

  if (tokenSplit?.length >= 2) {
    try {
      payload.value = window.atob(tokenSplit[1])
    } catch (e) {
      payloadShow.value = ''
      console.error('解密payload时异常', e)
      ElMessage.error('解密payload时异常')
    }
  } else {
    ElMessage.error('未找到payload')
  }

  show(format.value)
}

// 展示
const show = (boo: boolean) => {
  if (boo) {
    try {
      headerShow.value = JSON.stringify(JSON.parse(header.value), null, '\t')
    } catch (e) {
      console.error('格式化header异常', e)
      ElMessage.error('格式化header异常')
    }
    try {
      payloadShow.value = JSON.stringify(JSON.parse(payload.value), null, '\t')
    } catch (e) {
      console.error('格式化payload异常', e)
      ElMessage.error('格式化payload异常')
    }
  } else {
    headerShow.value = header.value
    payloadShow.value = payload.value
  }

  try {
    alg.value = JSON.parse(header.value).alg
  } catch (e) {
    console.error('提取加密方式 alg 异常', e)
  }

  try {
    issuer.value = JSON.parse(payload.value).issuer || JSON.parse(payload.value).iss
  } catch (e) {
    console.error('提取签发者 issuer、iss 异常', e)
  }

  try {
    issuedAt.value = JSON.parse(payload.value).issuedAt || JSON.parse(payload.value).iat
  } catch (e) {
    console.error('提取签发时间 issuedAt、iat 异常', e)
  }

  try {
    expiration.value = JSON.parse(payload.value).expiration || JSON.parse(payload.value).exp
  } catch (e) {
    console.error('提取过期时间 expiration、exp 异常', e)
  }

  try {
    audience.value = JSON.parse(payload.value).audience || JSON.parse(payload.value).aud
  } catch (e) {
    console.error('提取观众 audience、aud 异常', e)
  }

  try {
    subject.value = JSON.parse(payload.value).subject || JSON.parse(payload.value).sub
  } catch (e) {
    console.error('提取主题 subject、sub 异常', e)
  }
}

</script>

<style scoped>

.decode-button {
  width: calc(100% - 100px);
}

</style>
