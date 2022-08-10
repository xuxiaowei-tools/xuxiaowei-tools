<template>

  <el-row justify="center">
    <el-col :span="22" class="text-center">
      <h1>WangEditor</h1>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center">
    <el-col :span="22">
      <div id="toolbar-container"></div>
      <div id="editor-container"></div>
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, IEditorConfig, IDomEditor } from '@wangeditor/editor'

onMounted(() => {
  const editorConfig: Partial<IEditorConfig> = {}
  editorConfig.placeholder = '请输入内容'
  editorConfig.onChange = (editor: IDomEditor) => {
    // 当编辑器选区、内容变化时，即触发
    console.log('content', editor.children)
    console.log('html', editor.getHtml())
  }

  // 创建编辑器
  const editor = createEditor({
    selector: '#editor-container',
    config: editorConfig,
    mode: 'default' // 或 'simple' 参考下文
  })

  // 创建工具栏
  createToolbar({
    editor,
    selector: '#toolbar-container',
    mode: 'default' // 或 'simple' 参考下文
  })
})

</script>

<style scoped>

#toolbar-container {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

#editor-container {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  min-height: 500px;

  border-top: none;
}

#toolbar-container,
#editor-container {
  border-color: rgb(218, 221, 230);
  border-style: solid;
  border-width: 1px;
}

</style>
