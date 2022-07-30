<template>
  <div class="ma max-w-960px min-h-300px p-10px mt-60px">
    <div class="w-full h-full b-color-#e5e5e5 b box-border pb-20px rounded-3px">
      <div class="h-40px bg-#B38A4D lh-40px pl-20px rounded-t-3px">身份证号码转换</div>
      <!-- <div class="lh-60px">随机身份证号码生成</div> -->
      <div class="flex justify-start lh-30px py-10px px-10px mt-16px">
        <div class="w-130px block text-right"><span>15位身份证号：</span></div>
        <el-input v-model="inputValue" :oninput="inputValue = inputNum(inputValue)" class="flex-1" />
      </div>
      <el-button class="mt-10px flex ma" :icon="Pointer" @click="generateBtn">转换</el-button>
      <el-scrollbar height="100px" v-if="changeValue" class="px-30px py-20px">
        <p class="scrollbar-demo-item">{{ changeValue }}</p>
      </el-scrollbar>
    </div>
    <!-- 时间戳转时间 -->
  </div>
</template>

<script lang="ts" setup>
import { Pointer } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { provinceAndCitys, powers, parityBit } from '../utils'

// 待输入的15位身份证号
const inputValue = ref<string | undefined | null>(null)

// 转换后的18位身份证号
const changeValue = ref<string | undefined | null>(null)

const generateBtn = () => {
  if (checkIdCard()) {
    const address = inputValue.value?.substring(0, 6)
    const otherNo = inputValue.value?.substring(6, 15)

    // 前17位编码
    const cardNoStart = `${address}19${otherNo}`

    // 获取最后一位
    const strLast = getParityBit(cardNoStart)
    changeValue.value = `${cardNoStart}${strLast}`
  } else {
    ElMessage.error('请输入正确的15位身份证号')
  }
}

/**
 * 验证15位身份证号是否符合规则
 */
const checkIdCard = () => {
  const idCardNo = inputValue.value
  if (idCardNo && idCardNo.length === 15) {
    let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo)
    if (!check) return false
    // 校验地址码
    const addressCode = idCardNo.substring(0, 6)
    check = checkAddressCode(addressCode)
    if (!check) return false
    const birDayCode = '19' + idCardNo.substring(6, 12)
    // 校验日期码
    return checkBirthDayCode(birDayCode)
  }
  return false
}

/**
 * 计算校检码
 * @param idCardNo 前17位编码
 */
const getParityBit = (idCardNo: string) => {
  let power = 0
  for (let i = 0; i < 17; i++) {
    power += parseInt(idCardNo.charAt(i), 10) * parseInt(powers[i])
  }
  /* 取模 */
  const mod = power % 11
  return parityBit[mod]
}

/**
 * 验证生日是否符合
 * @param birDayCode 生日的编码
 */
const checkBirthDayCode = (birDayCode: string) => {
  const check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode)
  if (!check) return false
  const yyyy = parseInt(birDayCode.substring(0, 4), 10)
  const mm = parseInt(birDayCode.substring(4, 6), 10)
  const dd = parseInt(birDayCode.substring(6), 10)
  const xdata = new Date(yyyy, mm - 1, dd)
  if (xdata > new Date()) {
    return false// 生日不能大于当前日期
  } else if ((xdata.getFullYear() === yyyy) && (xdata.getMonth() === mm - 1) && (xdata.getDate() === dd)) {
    return true
  } else {
    return false
  }
}

/**
 * 验证区域是否正确
 * 这里只判断省
 */
const checkAddressCode = (addressCode: string) => {
  const check = /^[1-9]\d{5}$/.test(addressCode)
  if (!check) return false
  if (provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
    return true
  } else {
    return false
  }
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
<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 12px 10px;
}

.scrollbar-demo-item {
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
