<script setup lang="ts">
import { ref, watch } from 'vue'
import dblclick from '../../../utils/clipboard'
import dockerImagesMigrateStore from '../../../store/docker/images/migrate'
import { ElMessage } from 'element-plus'

const type = ref<string>(dockerImagesMigrateStore.type)
watch(() => type.value, (newValue, oldValue) => {
  dockerImagesMigrateStore.setType(newValue)
})

const repositoryUrl = ref<String>(dockerImagesMigrateStore.repositoryUrl)
watch(() => repositoryUrl.value, (newValue, oldValue) => {
  dockerImagesMigrateStore.setRepositoryUrl(newValue)
})

const images = ref<string>(dockerImagesMigrateStore.images)
watch(() => images.value, (newValue, oldValue) => {
  dockerImagesMigrateStore.setImages(newValue)
})

const imagesResult = ref<string[]>([])

const result = ref<string>('')
const rows = ref<number>(0)
const resultRows = ref<number>(16)

const removeDomainFromUrl = (url: string) => {
  const parts = url.split('/')
  if (parts[0].includes('.')) {
    return parts.slice(1).join('/')
  } else {
    return url
  }
}

// 获取人工命令
const getArtificialCommand = () => {
  result.value += '\n# 将 docker 镜像保存成文件的命令\n'
  for (const image of imagesResult.value) {
    result.value += `docker save -o ${image.replaceAll('/', '-').replaceAll(':', '-')}.tar ${image} \n`

    rows.value++
  }

  result.value += '\n# 将上面得到的结果上传到需要导入镜像的服务器上\n'

  result.value += '\n# docker 导入镜像命令\n'
  for (const image of imagesResult.value) {
    result.value += `docker load -i ${image.replaceAll('/', '-').replaceAll(':', '-')}.tar \n`

    rows.value++
  }

  result.value += '\n# kubernetes（k8s） 导入镜像命令\n'
  for (const image of imagesResult.value) {
    result.value += `ctr -n=k8s.io image import ${image.replaceAll('/', '-').replaceAll(':', '-')}.tar \n`

    rows.value++
  }
}

// 仓库迁移命令
const getRepositoryCommand = () => {
  result.value += '\n# 镜像重名到自己的仓库\n'
  for (const image of imagesResult.value) {
    result.value += `docker tag ${image} ${repositoryUrl.value}/${removeDomainFromUrl(image)} \n`

    rows.value++
  }

  result.value += '\n# 请先登录 Docker 仓库后再执行推送命令\n'

  result.value += '\n# 镜像推送到自己的仓库\n'
  for (const image of imagesResult.value) {
    result.value += `docker push ${repositoryUrl.value}/${removeDomainFromUrl(image)} \n`

    rows.value++
  }

  result.value += '\n# 将上面推送到自己仓库的镜像拉取到需要导入镜像的服务器中，并恢复原始名称\n'

  result.value += '\n# kubernetes（k8s） 拉取镜像 \n'
  for (const image of imagesResult.value) {
    result.value += `ctr -n=k8s.io image pull ${repositoryUrl.value}/${removeDomainFromUrl(image)} \n`

    rows.value++
  }

  result.value += '\n# kubernetes（k8s） 恢复原始镜像名称 \n'
  for (const image of imagesResult.value) {
    result.value += `ctr -n=k8s.io image tag ${repositoryUrl.value}/${removeDomainFromUrl(image)} ${image} \n`

    rows.value++
  }
}

const getCommand = () => {
  if (type.value === '1') {
    /* empty */
  } else {
    if (repositoryUrl.value === '') {
      ElMessage.error('仓库地址不能为空')
      return
    }
  }

  // 按行解析字段字符串
  const imagesArray = images.value.split('\n')

  // 清空历史记录
  imagesResult.value = []
  result.value = ''
  rows.value = 0

  // 遍历每一行字段进行处理
  for (const image of imagesArray) {
    const trimmedImage = image.trim() // 去除前后空格

    // 如果是空字符串，则跳过当前循环
    if (trimmedImage === '') {
      continue
    }

    // console.log(trimmedImage)

    imagesResult.value.push(trimmedImage)
    // console.log(commands.value)

    rows.value++
  }

  result.value += '\n# 拉取 docker 镜像命令\n'
  for (const image of imagesResult.value) {
    result.value += `docker pull ${image} \n`

    rows.value++
  }

  if (type.value === '1') {
    getArtificialCommand()
  } else {
    getRepositoryCommand()
  }

  resultRows.value = rows.value + 16
}

</script>

<template>
  <el-row justify="space-evenly">
    <el-col :span="22" class="text-center">
      <h1>Docker 镜像迁移</h1>
      <li>从一台机器中的镜像迁移到另外一台机器上</li>
      <li>离线安装 kubernetes（k8s） 镜像导入命令</li>
      <li>下载国外镜像，推送到国内镜像网站，实现镜像下载自由</li>
    </el-col>
  </el-row>

  <br>

  <el-row class="text-center">
    <el-col :span="22">
      <el-radio-group v-model="type">
        <el-radio border label="1">人工迁移命令</el-radio>
        <el-radio border label="2">仓库迁移命令</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="22">
      <li>仓库迁移模式，国内镜像网站推荐使用 <a href="https://jihulab.com">极狐GitLab</a></li>
      <li>极狐GitLab Docker 镜像的域名是 registry.jihulab.com</li>
      <li>使用 极狐GitLab 储存镜像时，镜像名称需要使用 极狐GitLab 仓库名称作为前缀</li>
      <li>例如：以 <a href="https://jihulab.com/xuxiaowei-cloud/xuxiaowei-cloud">https://jihulab.com/xuxiaowei-cloud/xuxiaowei-cloud</a>
        项目为例，如果想把镜像推送到这个仓库名下，需要将镜像名修改为以
        registry.jihulab.com/xuxiaowei-cloud/xuxiaowei-cloud
        为前缀，推送镜像结果查看网站 <a href="https://jihulab.com/xuxiaowei-cloud/xuxiaowei-cloud/container_registry">https://jihulab.com/xuxiaowei-cloud/xuxiaowei-cloud/container_registry</a>
      </li>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="22">
      <el-button @click="getCommand" class="get-command-button">获取命令</el-button>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20" v-if="type !== '1'">
    <el-col :span="22">
      <el-input placeholder="仓库地址，如：registry.jihulab.com/xuxiaowei-cloud/xuxiaowei-cloud" v-model="repositoryUrl"/>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="22">
      <el-input v-model="images" class="token-input" placeholder="请填写镜像名称，每行一个镜像" type="textarea"
                @dblclick="dblclick" rows="16"/>
    </el-col>
  </el-row>

  <br>

  <el-row justify="center" :gutter="20">
    <el-col :span="22">
      <el-input v-model="result" class="token-input" placeholder="结果" type="textarea" @dblclick="dblclick"
                :rows="resultRows" data-dblclick="结果已复制到剪贴板"/>
    </el-col>
  </el-row>

</template>

<style lang="scss">

.get-command-button {
  // 右上角半径：0
  border-top-right-radius: 0;
  // 右下角半径：0
  border-bottom-right-radius: 0;
}

.get-command-select .el-input__wrapper {
  // 左上角半径：0
  border-top-left-radius: 0;
  // 左下角半径：0
  border-bottom-left-radius: 0;
}

</style>

<style scoped>

.get-command-button {
  width: 100%;
}

</style>
