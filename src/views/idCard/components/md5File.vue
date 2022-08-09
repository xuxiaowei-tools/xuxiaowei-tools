<template>
  <div class="ma max-w-960px min-h-300px p-10px mt-60px">
    <h1 class="text-center">文件md5在线计算</h1>
    <!-- <el-upload  action="a" :limit="1" :on-change="ReadFileMD5" :http-request="UploadSceneModel"
      :auto-upload="false">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload> -->
    <!-- :on-exceed="handleExceed" -->
    <el-upload ref="upload" class="upload-demo" action="a" :limit="1" :on-change="fileChange"
      :auto-upload="false">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="ReadFileMD5">
        MD5计算
      </el-button>
    </el-upload>
    <div class="text-#555555 text-14px h-60px b b-color-#e5e5e5 mt-20px rounded-4px p-10px">
      {{md5Value}}
    </div>
  </div>

</template>

<script lang="ts" setup>
// 这里是vite 创建得 vue3 导入SparkMD5  vue2用require导入
// @ts-ignore
import SparkMD5 from 'spark-md5'
import { ref } from 'vue'
const files = ref()
const md5Value = ref()
const fileChange = (param:any) => {
  files.value = param.raw
}
const ReadFileMD5 = () => {
  const file = files.value
  const sliceLength = 10
  const chunkSize = Math.ceil(file.size / sliceLength)
  const fileReader = new FileReader()
  const md5 = new SparkMD5()
  let index = 0
  const loadFile = () => {
    const slice = file.slice(index, index + chunkSize)
    fileReader.readAsBinaryString(slice)
  }
  loadFile()
  console.log(md5Value.value)
  fileReader.onload = e => {
    md5.appendBinary(e.target?.result)
    if (index < file.size) {
      index += chunkSize
      loadFile()
    } else {
      // md5.end() 就是文件md5码
      console.log(md5.end())
      md5Value.value = md5.end()
      console.log(md5Value.value)
    }
  }
}
</script>
