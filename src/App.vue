<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <el-divider direction="vertical" />
    <router-link to="/encryption/RSA">RSA</router-link>
    <el-divider direction="vertical" />
    <router-link to="/encryption/AES">AES</router-link>
    <el-divider direction="vertical" />
    <router-link to="/encryption/MD5">MD5</router-link>
    <el-divider direction="vertical" />
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style scoped>

</style>
