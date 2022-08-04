<template>
  <el-row justify="space-evenly">
    <el-col :span="22" style="text-align: center">
      <h1>UUID</h1>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="40">
    <el-col :span="11">
      <el-input v-model="subLength" type="number" placeholder="选择截取长度">
        <template #prepend>
          <span>长度</span>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11">
      <el-switch v-model="upperCase" active-text="大写字母" inactive-text="小写字母"/>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center">
    <el-col :span="22">
      <el-input v-model="num" placeholder="请输入生成的个数">
        <template #prepend>
          <el-select v-model="separator" placeholder="选择是否带分隔符" class="w-100px">
            <el-option :value="true" label="带分隔符"/>
            <el-option :value="false" label="不带分隔符"/>
          </el-select>
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
      <div class="uuid" @dblclick="dblclickDiv" data-dblclick="已复制到剪贴板">
        <!-- 转大写 -->
        {{ upperCase ? data.toUpperCase() : data }}
      </div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { ElMessage, ElMessageBox } from 'element-plus'

import { dblclickDiv } from '../utils/clipboard'
import uuidStore from '../store/uuid'

// 是否忽略警告
const warning = ref<boolean>(false)

// 转大写
const upperCase = ref<boolean>(uuidStore.getUpperCase)
watch(() => upperCase.value, (newValue, oldValue) => {
  uuidStore.setUpperCase(newValue)
})

// 长度
const subLength = ref<number | undefined>(uuidStore.getSubLength)
// 最小长度
const subLengthMin = ref<number>(1)
// 最大长度
const subLengthMax = ref<number>(36)
watch(() => subLength.value, (newValue, oldValue) => {
  // @ts-ignore
  if (newValue !== undefined && newValue !== '') {
    if (newValue < subLengthMin.value) {
      ElMessage({ message: `长度不能小于 ${subLengthMin.value}`, type: 'warning' })

      subLength.value = subLengthMin.value
      uuidStore.setSubLength(subLengthMin.value)
    } else if (newValue > subLengthMax.value) {
      ElMessage({ message: `长度不能大于 ${subLengthMax.value}`, type: 'warning' })

      subLength.value = subLengthMax.value
      uuidStore.setSubLength(subLengthMax.value)
    } else {
      uuidStore.setSubLength(newValue)
    }
  }
})

// 长度截取
const substring = (data: string) => {
  if (subLength.value !== undefined) {
    if (subLength.value < subLengthMin.value) {
      // 长度小于最小长度，不做处理
    } else if (subLength.value > subLengthMax.value) {
      // 长度大于最大长度，不做处理
    } else {
      return data.substring(0, subLength.value)
    }
  }
  return data
}

// 分隔符
const separator = ref<boolean>(uuidStore.getSeparator)
watch(() => separator.value, (newValue, oldValue) => {
  uuidStore.setSeparator(newValue)
})

// 数量
const num = ref<number | string>(uuidStore.getNum)
watch(() => num.value, (newValue, oldValue) => {
  uuidStore.setNum(newValue)
})

// 数据
const dataList = ref<string[]>([])

const generate = () => {
  if (num.value === '') {
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
  for (let i = 0; i < num.value; i++) {
    if (separator.value) {
      // 包含分隔符
      dataList.value.push(substring(uuidv4()))
    } else {
      // 不包含分隔符
      dataList.value.push(substring(uuidv4().replaceAll('-', '')))
    }
  }
}

</script>

<style scoped>

.uuid {
  margin: 2px 0;
}

</style>
