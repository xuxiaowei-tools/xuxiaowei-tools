<template>
  <div class="checkTitle bg-#f3f3f3 min-h-40px mt-10px text-center mb-30px">
    <div class="flex ma lh-40px pl-20px max-w-960px">
      <div class="px-10px mytab cursor-pointer" @click="check(1)">自动生成身份证号</div>
      <div class="px-10px mytab cursor-pointer" @click="check(2)">身份证号码转换</div>
      <!-- <div class="px-10px mytab cursor-pointer" :class="checked === 3 ? 'bg-#deb887' : ''" @click="check(3)">还有啥</div> -->
    </div>
  </div>
  <generateIdCard v-show="checked === 1" />
  <changeCardNum v-show="checked === 2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import generateIdCard from './components/generateIdCard.vue'
import changeCardNum from './components/changeCardNum.vue'

const checked = ref(1)
const check = (val: number) => {
  checked.value = val
}

</script>
<style lang="scss" scoped>
.checkTitle {
  position: absolute;
  left: 0;
  right: 0;
}

.mytab:hover {
  color: aquamarine;
  background-color: #deb887;
}
</style>
