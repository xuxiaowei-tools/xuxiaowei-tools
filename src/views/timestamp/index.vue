<template>
  <div class="w-960px ma px-30px py-30px mt-50px">
    <!-- 时间戳转时间 -->
    <div class="flex justify-center lh-30px color-#333">
      <div class="w-80px block text-right"><span>时间戳：</span></div>
      <el-input v-model="inputValue" :oninput="inputValue = inputNum(inputValue)" class="flex-1">
        <template #append>
          <el-select v-model="typeValue" placeholder="Select" style="width: 80px">
            <el-option label="毫秒" value="1" />
            <el-option label="秒" value="2" />
          </el-select>
        </template>
      </el-input>
      <el-button @click="changeStr" class="mx-20px">转换</el-button>
      <el-input v-model="outPutValue" class="flex-1"></el-input>
    </div>

    <!-- 时间转时间戳 -->
    <div class="flex justify-center lh-30px color-#333 mt-30px">
      <div class="w-80px block text-right"><span>时间：</span></div>
      <el-input v-model="timeInput" class="flex-1">
        <template #append>
          <el-button @click="getNow">现在</el-button>
        </template>
      </el-input>
      <el-button @click="changeStamp" class="mx-20px">转换</el-button>
      <el-input v-model="outPutStamp" class="flex-1">
        <template #append>
          <el-select v-model="stampTypeValue" placeholder="Select" style="width: 80px">
            <el-option label="毫秒" value="1" />
            <el-option label="秒" value="2" />
          </el-select>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

/**
 * 时间戳转时间
 */
const change = (val: number) => {
  const n = new Date(val)
  const now = new Date(n)
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + now.toTimeString().slice(0, 8)
}
const inputValue = ref<string | undefined | null>(null)
const outPutValue = ref<string>('')
const typeValue = ref<string>('1')
const changeStr = () => {
  let stamp: any = ''
  typeValue.value === '1' ? stamp = inputValue.value : stamp = inputValue.value + '000'
  if (stamp?.length && stamp?.length > 16) {
    outPutValue.value = '输入的时间戳太长了'
    return
  }
  outPutValue.value = change(parseInt(stamp))
}

const timeInput = ref('')
const outPutStamp = ref<string | number>('')
const stampTypeValue = ref('1')

// 时间转时间戳
const changeStamp = () => {
  outPutStamp.value = stampTypeValue.value === '1' ? new Date(timeInput.value).getTime() : parseInt((new Date(timeInput.value).getTime() / 1000).toString())
}

// 获取当前时间
const getNow = () => {
  timeInput.value = change(Date.now())
}

// 只能输入数字
const inputNum = (value: string | undefined | null) => {
  if (value === undefined || value === null) { return }
  return (value.toString())
    .replace(/[^\d.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/^\./g, '')
}
</script>
