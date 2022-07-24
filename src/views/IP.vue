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
      <el-input v-model="ipv6" v-if="ipv4 !== ipv6" readonly @dblclick="dblclick" data-dblclick="IP v6 已复制到剪贴板">
        <template #prepend>
          <span>IP v6</span>
        </template>
      </el-input>
      <el-input v-model="ipv6Non" v-else readonly @dblclick="dblclick" data-dblclick="IP v6 已复制到剪贴板">
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
const ipv6Non = ref('未获取到 IP v6')

ipv4Ipify().then((response: string) => {
  ipv4.value = response
})

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
