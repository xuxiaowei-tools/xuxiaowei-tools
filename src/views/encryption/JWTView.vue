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

const header = ref<string>('')
const headerShow = ref<string>('')

const payload = ref<string>('')
const payloadShow = ref<string>('')

const format = ref<boolean>(jwtStore.format)
watch(() => format.value, (newValue, oldValue) => {
  jwtStore.setFormat(newValue)

  show(newValue)
})

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
}

</script>

<style scoped>

.decode-button {
  width: calc(100% - 100px);
}

</style>
