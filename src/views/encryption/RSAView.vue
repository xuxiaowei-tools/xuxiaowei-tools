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
      <el-input v-model="publicKey" class="originalText-input" placeholder="请输入RSA公钥" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="RSA公钥已复制到剪贴板"/>
    </el-col>
    <el-col :span="11">
      <el-input v-model="privateKey" class="ciphertext-input" placeholder="请输入RSA私钥" type="textarea" @dblclick="dblclick"
                rows="10" data-dblclick="RSA私钥已复制到剪贴板"/>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-button @click="publicKeyEncrypt" class="encrypt-button w-100%">公钥加密</el-button>
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
// @ts-ignore
import jsrsasign from 'jsrsasign'
import JsEncrypt from 'jsencrypt'
import { ElMessage, ElMessageBox } from 'element-plus/es'

import dblclick from '../../utils/clipboard'
import rsaStore from '../../store/rsa'

// 是否忽略警告
const warning = ref<boolean>(false)

// 原文
const originalText = ref<string|null>('my message')
// 密文
const ciphertext = ref('')

// 公钥加密
const publicKeyEncrypt = () => {
  if (publicKey.value === null || publicKey.value === '') {
    ElMessage.error('公钥加密时，公钥不能为空！')
    return
  }

  if (originalText.value === null || originalText.value === '') {
    ElMessage.error('公钥加密时，原文不能为空！')
    return
  }

  JsEncrypt.prototype.setPrivateKey('') // 清空私钥
  JsEncrypt.prototype.setPublicKey(publicKey.value)
  const encrypt = JsEncrypt.prototype.encrypt(originalText.value)

  if (encrypt === false) {
    ElMessage.error('公钥加密失败，请检查公钥是否正确！')
    return
  }

  ciphertext.value = encrypt
  ElMessage({ message: '公钥加密完成', type: 'success' })
}

// 私钥加密
const privateKeyEncrypt = () => {
  const privateKeyValue = privateKey.value
  if (privateKeyValue === null || privateKeyValue === '') {
    ElMessage.error('私钥加密时，私钥不能为空！')
    return
  }

  if (originalText.value === null || originalText.value === '') {
    ElMessage.error('私钥加密时，原文不能为空！')
    return
  }

  JsEncrypt.prototype.setPublicKey('') // 清空公钥
  JsEncrypt.prototype.setPrivateKey(privateKey.value)
  const encrypt = JsEncrypt.prototype.encrypt(originalText.value)

  if (encrypt === false) {
    ElMessage.error('私钥加密失败，请检查私钥是否正确！')
    return
  }

  ciphertext.value = encrypt
  ElMessage({ message: '私钥加密完成', type: 'success' })
}

// 私钥解密
const privateKeyDecrypt = () => {
  if (privateKey.value === null || privateKey.value === '') {
    ElMessage.error('私钥解密时，私钥不能为空！')
    return
  }

  if (ciphertext.value === null || ciphertext.value === '') {
    ElMessage.error('私钥解密时，密文不能为空！')
    return
  }

  JsEncrypt.prototype.setPublicKey('') // 清空公钥
  JsEncrypt.prototype.setPrivateKey(privateKey.value)
  const decrypt = JsEncrypt.prototype.decrypt(ciphertext.value)

  if (decrypt === false) {
    ElMessage.error('私钥解密失败，请检查私钥是否正确！')
    return
  }

  if (decrypt === null) {
    ElMessage.error('私钥解密失败，请检查密文是否正确！')
    return
  }

  originalText.value = decrypt
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
const bits = ref(1024)
const bitsOptions = [
  {
    value: 512,
    label: '512 (不推荐)'
  },
  {
    value: 1024,
    label: '1024 (速度快)'
  },
  {
    value: 2048,
    label: '2048 (速度慢)'
  },
  {
    value: 4096,
    label: '4096 (极慢)'
  }
]

// 生过密钥对
const generate = async () => {
  if (warning.value) {
    exec()
  } else {
    if (bits.value === 2048 || bits.value === 4096) {
      ElMessageBox.confirm(`纯 JavaScript 运算，生成 ${bits.value} 位 RSA 非对称秘钥对速度${bits.value === 2048 ? '慢' : '极慢'}，可能会导致浏览器卡死，是否继续？`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        warning.value = true
        exec()
      }).catch(() => {

      })
    } else {
      exec()
    }
  }
}

const exec = () => {
  const rsaKeypair = jsrsasign.KEYUTIL.generateKeypair('RSA', bits.value)
  publicKey.value = jsrsasign.KEYUTIL.getPEM(rsaKeypair.pubKeyObj)
  privateKey.value = jsrsasign.KEYUTIL.getPEM(rsaKeypair.prvKeyObj, 'PKCS8PRV')
}

</script>

<style scoped>

.generate-button {
  width: calc(100% - 150px);
}

</style>
