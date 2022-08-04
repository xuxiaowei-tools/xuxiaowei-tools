<template>
  <el-row justify="center">
    <el-col :span="22" class="text-center">
      <h1>MD5</h1>
    </el-col>
  </el-row>

  <br>

  <el-row class="button-row" justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="md5Text" placeholder="请输入要计算MD5的文本" @dblclick="dblclick" clearable
                data-dblclick="MD5的文本已复制到剪贴板">
        <template #append>
          <el-button @click="md5TextEncrypt">加密</el-button>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11">
      <el-input v-model="md5TextCiphertext" readonly @dblclick="dblclick" data-dblclick="MD5的文本加密结果已复制到剪贴板">
        <template #append>
          <el-select v-model="md5TextCiphertextCase" placeholder="请选择解密编码" class="decrypt-enc-select w-100px">
            <el-option label="小写" :value="false"/>
            <el-option label="大写" :value="true"/>
          </el-select>
        </template>
      </el-input>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CryptoJS from 'crypto-js'
import md5Store from '../../store/md5'
import dblclick from '../../utils/clipboard'

// MD5 加密文本
const md5Text = ref(md5Store.getMd5Text)
// MD5 加密密文
const md5TextCiphertext = ref('')
// MD5 加密密文大小写，true：大写，false：小写
const md5TextCiphertextCase = ref<boolean>(md5Store.getMd5TextCiphertextCase)

watch(() => md5Text.value, (newValue, oldValue) => {
  md5Store.setMd5Text(md5Text.value)
})

watch(() => md5TextCiphertextCase.value, (newValue, oldValue) => {
  md5Store.setMd5TextCiphertextCase(md5TextCiphertextCase.value)
  if (md5TextCiphertextCase.value) {
    md5TextCiphertext.value = md5TextCiphertext.value.toUpperCase()
  } else {
    md5TextCiphertext.value = md5TextCiphertext.value.toLowerCase()
  }
})

// MD5 文本加密方法
const md5TextEncrypt = () => {
  const md5 = CryptoJS.MD5(md5Text.value)
  if (md5TextCiphertextCase.value) {
    md5TextCiphertext.value = md5.toString().toUpperCase()
  } else {
    md5TextCiphertext.value = md5.toString()
  }
}

</script>

<style scoped>

</style>
