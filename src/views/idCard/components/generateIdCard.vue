<template>
  <div class="ma max-w-960px min-h-400px p-10px mt-60px">
    <div class="w-full h-full b-color-#e5e5e5 b box-border  rounded-3px">
      <div class="h-40px bg-#B38A4D lh-40px pl-20px rounded-t-3px">在线随机身份证号码生成器</div>
      <!-- <div class="lh-60px">随机身份证号码生成</div> -->
      <div class="flex justify-start lh-30px py-10px px-10px mt-16px">
        <div class="w-120px block text-right"><span>出生地：</span></div>
        <el-select v-model="address.province" placeholder="请选择" class="ml-10px w-250px">
          <el-option v-for="value, key in area['86']" :key="key" :label="value" :value="key" />
        </el-select>
        <el-select v-model="address.city" placeholder="请选择" class="ml-10px w-250px">
          <el-option v-for="value, key in area[address.province!]" :key="key" :label="value" :value="key" />
        </el-select>
        <el-select v-model="address.area" placeholder="请选择" class="ml-10px w-250px">
          <el-option v-for="value, key in area[address.city!]" :key="key" :label="value" :value="key" />
        </el-select>
      </div>
      <div class="flex justify-start lh-30px  py-10px px-10px">
        <div class="w-120px block text-right"><span>出生日期：</span></div>
        <el-select v-model="birth.year" placeholder="请选择" class="ml-10px w-130px">
          <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="birth.month" placeholder="请选择" class="ml-10px w-130px">
          <el-option v-for="item in monthList" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="birth.day" placeholder="请选择" class="ml-10px w-130px">
          <el-option v-for="item in dayList" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="flex justify-start lh-30px  py-10px px-10px">
        <div class="w-120px block text-right"><span>性别：</span></div>
        <el-select v-model="sex" placeholder="请选择" class="ml-10px w-130px">
          <el-option v-for="item in sexList" :key="item" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="flex justify-start lh-30px py-10px px-10px">
        <div class="w-120px block text-right"><span>生成个数：</span></div>
        <el-select v-model="createNum" placeholder="请选择" class="ml-10px w-130px">
          <el-option v-for="item in [1, 5, 10, 20, 50]" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <el-button class="mt-10px flex ma" :icon="Pointer" @click="generateBtn">生成</el-button>
      <el-scrollbar max-height="400px" class="px-30px py-20px">
        <p v-for="item in showIdCardList" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </el-scrollbar>
      <div class="text-14px px-20px lh-30px pb-10px">
        <span class="text-#996666 text-16px">身份证号码生成器说明：</span><br />
        身份证号码仅用于软件开发中的测试，否则后果自付。
      </div>
    </div>

    <!-- 时间戳转时间 -->
  </div>
</template>

<script lang="ts" setup>
import { Pointer } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch, computed, reactive } from 'vue'
import area from '../utils/area'

const showIdCardList = ref<string[]>([])

// 获取随机属性
const randomProperty = (obj: object) => {
  const keys = Object.keys(obj)
  const s = parseInt((Math.random() * (keys.length + 1) - 1).toString())
  return keys[s]
}

/**
 *  根据选择的省市区生成区域编码
 *  广东省中山市下面直接是街道  长度为8位，所以需要截取一下
 */
const getAddress = () => {
  let addressNum = ''
  // 省市区全选择的情况
  if (address.province && address.city && address.area) {
    addressNum = address.area.toString().slice(0, 6)
  } else if (address.province && address.city) {
    // 选择省市的情况
    addressNum = randomProperty(area[address.city!]).slice(0, 6)
  } else if (address.province) {
    // 选择省的情况
    addressNum = randomProperty(area[randomProperty(area[address.province!])]).slice(0, 6)
  } else {
    addressNum = randomProperty(area[randomProperty(area[randomProperty(area['86'])])]).slice(0, 6)
  }
  return addressNum
}

/**
 * 点击生成按钮
 */
const generateBtn = () => {
  showIdCardList.value = []
  if (!birth.year || !birth.month || !birth.day) {
    ElMessage({
      message: '请选择出生日期',
      type: 'warning'
    })
    return
  }
  const birthday = `${birth.year}${birth.month > 9 ? birth.month : '0' + birth.month}${birth.day > 9 ? birth.day : '0' + birth.day}` // 生日

  const num = createNum.value || 1
  for (let i = 0; i < num; i++) {
    generate(getAddress(), birthday)
  }
}

/**
 * 生成身份证号
 * @param address 省市区编码
 * @param birthday 生日编码
 */
const generate = (address: string, birthday: string) => {
  let sexVal
  if (sex.value === 1) {
    sexVal = [1, 3, 5, 7, 9][Math.floor(Math.random() * 5)]
  } else if (sex.value === 2) {
    sexVal = [2, 4, 6, 8, 0][Math.floor(Math.random() * 5)]
  } else {
    sexVal = Math.floor(Math.random() * 10)
  }
  const s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + sexVal.toString()
  const array = (address + birthday + s).split('')

  const coefficientArray = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']// 加权因子
  const lastNumberArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']// 校验码
  let total = 0
  for (const i in array) {
    total = total + parseInt(array[i]) * parseInt(coefficientArray[i])
  }
  const lastNumber = lastNumberArray[parseInt((total % 11).toString())]
  const idNoString = address + birthday + s + lastNumber
  showIdCardList.value.push(idNoString)
}

// 生成个数
const createNum = ref(null)

// 性别
const sex = ref(null)
const sexList = [{ label: '男', value: 1 }, { label: '女', value: 2 }]

/** 生日 */
interface birthType {
  year: null | number;
  month: null | number;
  day: null | number;
}

const birth = reactive<birthType>({
  year: 1999,
  month: 1,
  day: 18
})

const yearList = Array.from(new Array(2099 + 1).keys()).slice(1900)
const monthList = Array.from(new Array(12 + 1).keys()).slice(1)
const dayList = computed(() => {
  if (!birth.month || [1, 3, 5, 7, 8, 10, 12].includes(birth.month)) {
    return Array.from(new Array(31 + 1).keys()).slice(1)
  }
  if (birth.month === 2) {
    if (birth.year && (birth.year % 4 === 0 && (birth.year % 100 !== 0 || birth.year % 400 === 0))) {
      return Array.from(new Array(29 + 1).keys()).slice(1)
    } else {
      return Array.from(new Array(28 + 1).keys()).slice(1)
    }
  } else {
    return Array.from(new Array(30 + 1).keys()).slice(1)
  }
})

// 年份变化时，若已选择日期，判断日期是否存在
watch(
  () => birth.year,
  () => {
    if (birth.day && !dayList.value.includes(birth.day)) {
      birth.day = null
    }
  }
)
// 月份变化时，若已选择日期，判断日期是否存在
watch(
  () => birth.month,
  () => {
    if (birth.day && !dayList.value.includes(birth.day)) {
      birth.day = null
    }
  }
)

/** 地址 */
interface addressType {
  province: null | string;
  city: null | string;
  area: null | string;
}
const address = reactive<addressType>({
  province: null,
  city: null,
  area: null
})

// 监听count
watch(
  () => address.province,
  () => {
    address.city = null
    address.area = null
  },
  {
    immediate: true // 立即执行
  }
)
// 监听count
watch(
  () => address.city,
  () => {
    address.area = null
  },
  {
    immediate: true // 立即执行
  }
)
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
