<template>
  <el-row justify="space-evenly">
    <el-col :span="22" style="text-align: center">
      <h1>Password</h1>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="numbers" placeholder="请输入数字">
        <template #prepend>
          <span>数字</span>
        </template>
        <template #append>
          <el-switch v-model="includeNumbers" active-text="包含" inactive-text="不包含"/>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11">
      <el-input v-model="specials" placeholder="请输入符号">
        <template #prepend>
          <span>符号</span>
        </template>
        <template #append>
          <el-switch v-model="includeSpecials" active-text="包含" inactive-text="不包含"/>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="lowerCase" placeholder="请输入小写字母">
        <template #prepend>
          <span>小写字母</span>
        </template>
        <template #append>
          <el-switch v-model="includeLowerCase" active-text="包含" inactive-text="不包含"/>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11">
      <el-input v-model="upperCase" placeholder="请输入大写字母">
        <template #prepend>
          <span>大写字母</span>
        </template>
        <template #append>
          <el-switch v-model="includeUpperCase" active-text="包含" inactive-text="不包含"/>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="11">
      <el-input v-model="passwordLength" type="number" clearable placeholder="请输入生成的长度">
        <template #prepend>
          <span>长度</span>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11">
      <el-input v-model="num" type="number" placeholder="请输入生成的个数">
        <template #prepend>
          <span>生成个数</span>
        </template>
        <template #append>
          <el-button @click="generate">生成</el-button>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <br>

  <el-row class="text-center">
    <el-col :span="22" v-for="data in dataList" :key="data">
      <div class="uuid" @dblclick="dblclickDiv" data-dblclick="已复制到剪贴板">{{ data }}</div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus/es'

import randomUtils from '../utils/random-utils'
import { dblclickDiv } from '../utils/clipboard'
import passwordStore from '../store/password'

// 是否忽略警告
const warning = ref<boolean>(false)

// 数字
const numbers = ref<string>(passwordStore.getNumbers)
watch(() => numbers.value, (newValue, oldValue) => {
  passwordStore.setNumbers(newValue)
})

// 是否包含数字
const includeNumbers = ref<boolean>(passwordStore.includeNumbers)
watch(() => includeNumbers.value, (newValue, oldValue) => {
  passwordStore.setIncludeNumbers(newValue)
})

// 符号
const specials = ref(passwordStore.specials)
watch(() => specials.value, (newValue, oldValue) => {
  passwordStore.setSpecials(newValue)
})

// 是否包含符号
const includeSpecials = ref<boolean>(passwordStore.includeSpecials)
watch(() => includeSpecials.value, (newValue, oldValue) => {
  passwordStore.setIncludeSpecials(newValue)
})

// 小写字母
const lowerCase = ref(passwordStore.getLowerCase)
watch(() => lowerCase.value, (newValue, oldValue) => {
  passwordStore.setLowerCase(newValue)
})

// 是否包含小写字母
const includeLowerCase = ref<boolean>(passwordStore.includeLowerCase)
watch(() => includeLowerCase.value, (newValue, oldValue) => {
  passwordStore.setIncludeLowerCase(newValue)
})

// 大写字母
const upperCase = ref(passwordStore.getUpperCase)
watch(() => upperCase.value, (newValue, oldValue) => {
  passwordStore.setUpperCase(newValue)
})

// 是否包含大写字母
const includeUpperCase = ref<boolean>(passwordStore.includeUpperCase)
watch(() => includeUpperCase.value, (newValue, oldValue) => {
  passwordStore.setIncludeUpperCase(newValue)
})

// 长度
const passwordLength = ref<number>(passwordStore.getPasswordLength)
watch(() => passwordLength.value, (newValue, oldValue) => {
  passwordStore.setPasswordLength(newValue)
})

// 数量
const num = ref<number>(passwordStore.getNum)
watch(() => num.value, (newValue, oldValue) => {
  passwordStore.setNum(newValue)
})

// 数据
const dataList = ref<string[]>([])

// 生成密码
const generate = () => {
  // @ts-ignore
  if (num.value === '' || isNaN(Number(num.value))) {
    ElMessage({ message: '生成数量不能为空', type: 'warning' })
    return
  }

  if (warning.value) {
    exec()
  } else {
    const tmp = 10000
    if (num.value > tmp) {
      ElMessageBox.confirm(`纯 JavaScript 运算，生成数量超过 ${tmp}，可能会导致浏览器卡死，是否继续？`, '警告', {
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
// 清空数据
  dataList.value = []

  // 循环添加
  for (let i = 0; i < (num.value === undefined ? 5 : num.value); i++) {
    const tmp = randomUtils(passwordLength.value, {
      numbers: includeNumbers.value ? numbers.value : false,
      specials: includeSpecials.value ? specials.value : false,
      lowerCase: includeLowerCase.value ? lowerCase.value : false,
      upperCase: includeUpperCase.value ? upperCase.value : false
    })

    if (tmp === '') {
      ElMessage({ message: '随机字符串、长度不合法', type: 'warning' })
      break
    } else if (tmp.length !== Number(passwordLength.value)) {
      ElMessage({ message: '随机字符串、长度不合法', type: 'warning' })
      break
    }

    dataList.value.push(tmp)
  }
}

</script>

<style scoped>

</style>
