<template>
  <el-row justify="center">
    <el-col :span="22" class="text-center">
      <h1>ToastUi</h1>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center">
    <el-col :span="22">
      <div id="editor"></div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style

onMounted(() => {
  const querySelectorEditor = document.querySelector('#editor')
  if (querySelectorEditor instanceof HTMLElement) {
    const editor = new Editor({
      el: querySelectorEditor,
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical'
    })

    editor.getMarkdown()
  }
})

</script>

<style scoped>

</style>
