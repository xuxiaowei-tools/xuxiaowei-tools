<template>
  <h1>RSA</h1>
</template>

<script setup lang="ts">
import keypair from 'keypair'

const pair = keypair({ bits: 2048 }) // 默认 2048
console.log(pair.public)
console.log(pair.private)
</script>

<style scoped>

</style>
