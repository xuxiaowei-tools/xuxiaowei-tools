<template>
  <el-row justify="space-evenly">
    <el-col :span="22" style="text-align: center">
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
      <el-input v-model="ipv6Show" readonly @dblclick="dblclick" data-dblclick="IP v6 已复制到剪贴板">
        <template #prepend>
          <span>IP v6</span>
        </template>
      </el-input>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { ipv4Ipify, ipv6Ipify } from '../api/ipify'

const { toClipboard } = useClipboard()

const ipv4 = ref('')
const ipv6 = ref('')
const ipv6Show = ref('')

watch(() => ipv4.value, (newValue, oldValue) => {
  // 监听 ipv4 发生改变时执行 ipv6 显示
  ipv6ShowFun()
})

watch(() => ipv6.value, (newValue, oldValue) => {
  // 监听 ipv6 发生改变时执行 ipv6 显示
  ipv6ShowFun()
})

const ipv6ShowFun = () => {
  if (ipv4.value === ipv6.value) { // ipv4 与 ipv6 内容一致时，说明不存在 ipv6
    ipv6Show.value = '未获取到 IP v6'
  } else {
    ipv6Show.value = ipv6.value
  }
}

// 获取当前网络的ipv4
ipv4Ipify().then((response: string) => {
  ipv4.value = response
})

// 获取当前网络的ipv6（如果ipv6不存在，则返回ipv4）
ipv6Ipify().then((response: string) => {
  ipv6.value = response
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
