<template>
  <div class="relative bg-#f3f3f3 min-h-40px mt-10px text-center">
    <div class="inline-flex lh-40px w-980px">
      <div class="px-20px mytab">自动生成身份证号</div>
      <div class="px-20px mytab">身份证号码转换</div>
      <div class="px-20px mytab">还有啥</div>
    </div>
  </div>
  <generateIdCard />
</template>

<script lang="ts" setup>
import generateIdCard from './components/generateIdCard.vue'

</script>
<style lang="scss" scoped>
.mytab:hover {
  color: aquamarine;
  background-color: burlywood;
}
</style>
