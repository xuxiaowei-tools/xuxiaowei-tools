<template>
  <el-row justify="center">
    <el-col :span="22" style="text-align: center">
      <h1>RSA 非对称性加密</h1>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="22">
      <el-button @click="generate" class="generate-button">生成秘钥</el-button>
      <el-select v-model="bits" placeholder="请选择生成RSA密钥对位数" class="decrypt-enc-select w-150px">
        <el-option v-for="item in bitsOptions" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="publicKey" class="originalText-input" placeholder="原文" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="RSA公钥已复制到剪贴板"/>
    </el-col>
    <el-col :span="11">
      <el-input v-model="privateKey" class="ciphertext-input" placeholder="密文" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="RSA私钥已复制到剪贴板"/>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button @click="publicKeyEncrypt" class="encrypt-button w-100%">公钥加密</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="publicKeyDecrypt" class="decrypt-button w-100%">公钥解密</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="11">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button @click="privateKeyEncrypt" class="encrypt-button w-100%">私钥加密</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="privateKeyDecrypt" class="decrypt-button w-100%">私钥解密</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
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
import { ref, watch } from 'vue'
import keypair from 'keypair'
import JsEncrypt from 'jsencrypt'
import { ElMessage } from 'element-plus/es'
import useClipboard from 'vue-clipboard3'
import rsaStore from '../../store/rsa'

const { toClipboard } = useClipboard()

// 原文
const originalText = ref('my message')
// 密文
const ciphertext = ref('')

// 公钥加密
const publicKeyEncrypt = () => {
  JsEncrypt.prototype.setPublicKey(publicKey.value)
  ciphertext.value = JsEncrypt.prototype.encrypt(originalText.value).toString()
  ElMessage({ message: '公钥加密完成', type: 'success' })
}

// 公钥解密
const publicKeyDecrypt = () => {

}

// 私钥加密
const privateKeyEncrypt = () => {

}

// 私钥解密
const privateKeyDecrypt = () => {
  JsEncrypt.prototype.setPrivateKey(privateKey.value)
  originalText.value = JsEncrypt.prototype.decrypt(ciphertext.value)?.toString()
  ElMessage({ message: '私钥解密完成', type: 'success' })
}

// RSA 公钥
const publicKey = ref(rsaStore.getPublicKey)
watch(() => publicKey.value, (newValue, oldValue) => {
  rsaStore.setPublicKey(newValue)
})

// RSA 私钥
const privateKey = ref(rsaStore.getPrivateKey)
watch(() => privateKey.value, (newValue, oldValue) => {
  rsaStore.setPrivateKey(newValue)
})

// 生成RSA密钥对位数
const bits = ref(2048)
const bitsOptions = [
  {
    value: '1024',
    label: '1024 (不推荐)'
  },
  {
    value: '2048',
    label: '2048 (默认)'
  },
  {
    value: '4096',
    label: '4096 (极慢)'
  }
]

// 生过密钥对
const generate = async () => {
  const pair = keypair({ bits: bits.value }) // 默认 2048
  publicKey.value = pair.public
  privateKey.value = pair.private
  console.log(pair.public)
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

.generate-button {
  width: calc(100% - 150px);
}

</style>
