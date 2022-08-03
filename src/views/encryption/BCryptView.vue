<template>
  <el-row justify="center">
    <el-col :span="22" style="text-align: center">
      <h1>BCrypt 加密</h1>
    </el-col>
  </el-row>

  <br>

  <el-row class="button-row" justify="center" :gutter="20">
    <el-col :span="11">
      <el-button @click="encrypt" class="encrypt-button w-100%">加密</el-button>
    </el-col>
    <el-col :span="11">

    </el-col>
  </el-row>

  <br>

  <el-row class="text-row" justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="originalText" class="originalText-input" placeholder="原文" type="textarea" @dblclick="dblclick"
                rows="5" data-dblclick="原文已复制到剪贴板"/>
    </el-col>
    <el-col :span="11">
      <el-input v-model="ciphertext" class="ciphertext-input" placeholder="密文" type="textarea" @dblclick="dblclick"
                rows="5" data-dblclick="密文已复制到剪贴板"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import bcrypt from 'bcryptjs'
import { ElMessage } from 'element-plus/es'
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()

// 原文
const originalText = ref('my message')

// 密文
const ciphertext = ref('')

// 加密
const encrypt = () => {
  const salt = bcrypt.genSaltSync(10)
  ciphertext.value = bcrypt.hashSync(originalText.value, salt)
}

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
