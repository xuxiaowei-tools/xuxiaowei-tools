<template>
  <el-row justify="space-evenly">
    <el-col :span="22" class="text-center">
      <h1>IP</h1>
    </el-col>
  </el-row>

  <el-row justify="space-evenly">
    <el-col :span="11">
      <el-input v-model="ipv4" readonly @dblclick="dblclick" data-dblclick="IP v4 已复制到剪贴板">
        <template #prepend>
          <span>IP v4</span>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <br>

  <el-row justify="space-evenly">
    <el-col :span="11">
      <el-input v-model="ipv6" readonly @dblclick="dblclick" data-dblclick="IP v6 已复制到剪贴板">
        <template #prepend>
          <span>IP v6</span>
        </template>
      </el-input>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { ipv4Ipify, ipv6Ipify } from '../api/ipify'

const { toClipboard } = useClipboard()

const ipv4 = ref('')
const ipv6 = ref('')

// 获取当前网络的ipv4
ipv4Ipify().then((response: any) => {
  if (response !== null && response !== '' && response.indexOf('.') > 0) {
    // ipv4 内容携带 .
    ipv4.value = response
  } else {
    ipv4.value = '未获取到 IP v4'
  }
})

// 获取当前网络的ipv6（如果ipv6不存在，则返回ipv4）
ipv6Ipify().then((response: any) => {
  if (response !== null && response !== '' && response.indexOf(':') > 0) {
    // ipv6 内容携带 :
    ipv6.value = response
  } else {
    ipv6.value = '未获取到 IP v6'
  }
})

// 双击复制
const dblclick = async (e: any) => {
  try {
    await toClipboard(e.target.value)
    ElMessage({
      message: e.target.dataset.dblclick,
      type: 'success'
    })
  } catch (e) {
    console.error(e)
  }
}

</script>

<style scoped>

</style>
