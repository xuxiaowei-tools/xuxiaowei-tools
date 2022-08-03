<template>
  <el-row justify="center">
    <el-col :span="22" style="text-align: center">
      <h1>BCrypt 加密</h1>
    </el-col>
  </el-row>

  <el-row class="text-center">
    <el-col :span="22">
      <el-radio-group v-model="prefix">
        <el-radio border label="">无</el-radio>
        <el-radio border :label="bcryptPrefix">{{bcryptPrefix}}}</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>

  <br>

  <el-row class="button-row" justify="center" :gutter="20">
    <el-col :span="11">
      <el-button @click="encrypt" class="encrypt-button w-100%">加密</el-button>
    </el-col>
    <el-col :span="11">
      <el-button @click="compare" class="encrypt-button w-100%">比较</el-button>
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
import bcryptjs from 'bcryptjs'
import { ElMessage } from 'element-plus/es'
import { ref, watch } from 'vue'
import useClipboard from 'vue-clipboard3'
import { LocationQueryRaw, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { toClipboard } = useClipboard()

// 原文
const originalText = ref('my message')

// 密文
const ciphertext = ref('')

// 前缀
const prefix = ref('')
watch(() => prefix.value, (newValue, oldValue) => {
  // 切换填充方案时，改变 URL 参数
  const query = JSON.parse(JSON.stringify(route.query))
  query.prefix = newValue
  const locationQueryRaw = ref<LocationQueryRaw>(query)

  router.replace({
    query: locationQueryRaw.value
  })
})

// Security 前缀
const bcryptPrefix = ref('{bcrypt}')

// 加密
const encrypt = () => {
  const salt = bcryptjs.genSaltSync(10)
  const hash = bcryptjs.hashSync(originalText.value, salt)
  ciphertext.value = prefix.value === '' ? hash : prefix.value + hash
  ElMessage({ message: '加密完成', type: 'success' })
}

const compare = () => {
  let compare
  if (ciphertext.value.startsWith(bcryptPrefix.value)) {
    compare = bcryptjs.compareSync(originalText.value, ciphertext.value.substring(bcryptPrefix.value.length))
  } else {
    compare = bcryptjs.compareSync(originalText.value, ciphertext.value)
  }
  if (compare) {
    ElMessage({ message: '密码与原文匹配', type: 'success' })
  } else {
    ElMessage.error('密码与原文不匹配')
  }
}

router.isReady().then(() => {
  const query = JSON.parse(JSON.stringify(route.query))
  const queryPrefix = query.prefix

  if (queryPrefix !== undefined) {
    prefix.value = queryPrefix
  }

  const prefixList = ref<string[]>(['', bcryptPrefix.value])
  if (prefixList.value.indexOf(prefix.value) === -1) {
    prefix.value = ''
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
