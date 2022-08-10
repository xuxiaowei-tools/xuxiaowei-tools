<template>
  <el-row justify="center">
    <el-col :span="22" class="text-center">
      <h1>省市区</h1>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center">
    <el-select-v2 v-model="provinceId" :options="provinceOptions" placeholder="" size="large"/>
    <el-select-v2 v-model="cityId" :options="cityOptions" placeholder="" size="large"/>
    <el-select-v2 v-model="countyId" :options="countyOptions" placeholder="" size="large"/>
    <el-select-v2 v-model="townId" :options="townOptions" placeholder="" size="large"/>
  </el-row>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import province from './province.json'
import city from './city.json'
import county from './county.json'
import town from './town.json'

// 省
const provinceOptions = ref(province)
const provinceId = ref<string>('1')

// 市
const cityOptions = ref(city[provinceId.value])
const cityId = ref<string>('1')

// 区
const countyOptions = ref(county[cityId.value])
const countyId = ref<string>('1')

// 街道
const townOptions = ref(town[countyId.value])
const townId = ref<string>('1')

watch(() => provinceId.value, (newValue, oldValue) => {
  // 市与省联动
  cityOptions.value = city[newValue] ? city[newValue] : []
  cityId.value = city[newValue]?.[0]?.value

  // 区与市联动
  countyOptions.value = county[cityId.value] ? county[cityId.value] : []
  countyId.value = county[cityId.value]?.[0]?.value

  // 街道与区联动
  townOptions.value = town[countyId.value] ? town[countyId.value] : []
  townId.value = town[countyId.value]?.[0]?.value
})

watch(() => cityId.value, (newValue, oldValue) => {
  // 区与市联动
  countyOptions.value = county[newValue] ? county[newValue] : []
  countyId.value = county[newValue]?.[0]?.value

  // 街道与区联动
  townOptions.value = town[countyId.value] ? town[countyId.value] : []
  townId.value = town[countyId.value]?.[0]?.value
})

watch(() => countyId.value, (newValue, oldValue) => {
  // 街道与区联动
  townOptions.value = town[newValue] ? town[newValue] : []
  townId.value = town[newValue]?.[0]?.value
})

</script>

<style scoped>

</style>
