<template>
  <el-row justify="space-evenly">
    <el-col :span="22" style="text-align: center">
      <h1>UUID</h1>
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
      <div class="uuid" @dblclick="dblclickDiv" data-dblclick="已复制到剪贴板">{{data}}</div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { dblclickDiv } from '../utils/clipboard'
import { ElMessage } from 'element-plus'
import uuidStore from '../store/uuid'

// 分隔符
const separator = ref<boolean>(uuidStore.getSeparator)
watch(() => separator.value, (newValue, oldValue) => {
  uuidStore.setSeparator(newValue)
})

// 数量
const num = ref<number|string>(uuidStore.getNum)
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

  // 清空数据
  dataList.value = []

  // 循环添加
  for (let i = 0; i < num.value; i++) {
    if (separator.value) {
      // 包含分隔符
      dataList.value.push(uuidv4())
    } else {
      // 不包含分隔符
      dataList.value.push(uuidv4().replaceAll('-', ''))
    }
  }
}

</script>

<style scoped>

.uuid {
  margin: 2px 0;
}

</style>
