<template>
  <el-row justify="space-evenly">
    <el-col :span="22" style="text-align: center">
      <h1>AES 对称性加密</h1>
    </el-col>
  </el-row>

  <el-row justify="space-evenly">
    <el-col :span="11">
      <el-input v-model="key" placeholder="请输入秘钥" clearable @dblclick="dblclick" data-dblclick="秘钥已复制到剪贴板"/>
    </el-col>
    <!--    暂未开发-->
    <!--    <el-col :span="11">-->
    <!--      <el-input v-model="iv" placeholder="请输入偏移量" clearable @dblclick="dblclick" data-dblclick="偏移量已复制到剪贴板"/>-->
    <!--    </el-col>-->
  </el-row>

  <br>

  <el-row class="button-row" justify="space-evenly">
    <el-col :span="11">
      <el-button @click="encrypt" class="encrypt-button">加密</el-button>
    </el-col>
    <el-col :span="11">
      <el-button @click="decrypt" class="decrypt-button">解密</el-button>
    </el-col>
  </el-row>

  <br>

  <el-row class="text-row" justify="space-evenly">
    <el-col :span="11">
      <el-input v-model="originalText" class="originalText-input" placeholder="原文" type="textarea" @dblclick="dblclick"
                rows="15" data-dblclick="原文已复制到剪贴板"/>
    </el-col>
    <el-col :span="11">
      <el-input v-model="ciphertext" class="ciphertext-input" placeholder="密文" type="textarea" @dblclick="dblclick"
                rows="15" data-dblclick="密文已复制到剪贴板"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()

// 秘钥
const key = ref('secret key 123')

// 暂未开发
// 偏移量
// const iv = ref(null)

// 原文
const originalText = ref('my message')

// 密文
const ciphertext = ref('')

// 加密
const encrypt = () => {
  ciphertext.value = CryptoJS.AES.encrypt(originalText.value, key.value).toString()
}

// 解密
const decrypt = () => {
  const bytes = CryptoJS.AES.decrypt(ciphertext.value, key.value)
  originalText.value = bytes.toString(CryptoJS.enc.Utf8)
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

<style scoped lang="scss">

// 按钮行
.button-row {
  // 加密按钮
  .encrypt-button {

  }

  // 解密按钮
  .decrypt-button {

  }

  // 加密、解密按钮
  .encrypt-button,
  .decrypt-button {
    width: 100%;
  }
}

// 原文、密文行
.text-row {

  // 原文
  .originalText-input {

  }

  // 密文
  .ciphertext-input {

  }

}

</style>
