import { ref } from 'vue'
import { createPinia, defineStore } from 'pinia'

// 不能直接导出使用（需要设置订阅修改$subscribe、自定义获取数据$state的方法）
const dockerImagesMigrateDefineStore = defineStore('dockerImagesMigrate', {
  state: () => ({
    images: ref<string>('jimmidyson/configmap-reload:v0.5.0\n' +
      'grafana/grafana:9.3.2\n ' +
      '  \n   \n  quay.io/brancz/kube-rbac-proxy:v0.14.0\n   ' +
      '\n  quay.io/prometheus/node-exporter:v1.5.0   \n' +
      ' registry.k8s.io/prometheus-adapter/prometheus-adapter:v0.10.0 \n ' +
      '\n\nquay.io/prometheus-operator/prometheus-operator:v0.62.0       \n   ' +
      '\n' +
      '  ' +
      '  \n '),
    type: ref<string>('1'),
    repositoryUrl: ref<String>('registry.jihulab.com/xuxiaowei-cloud/xuxiaowei-cloud')
  }),
  getters: {

  },
  actions: {
    /**
     * images
     * @param images
     */
    setImages (images: string) {
      this.images = images
    },
    /**
     * type
     * @param type
     */
    setType (type: string) {
      this.type = type
    },
    /**
     * repositoryUrl
     * @param repositoryUrl
     */
    setRepositoryUrl (repositoryUrl: String) {
      this.repositoryUrl = repositoryUrl
    }
  }
})

const dockerImagesMigrateStore = dockerImagesMigrateDefineStore(createPinia())

// 订阅缓存的修改
dockerImagesMigrateStore.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(dockerImagesMigrateStore.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const dockerImagesMigrateStoreOld = localStorage.getItem(dockerImagesMigrateStore.$id)
if (dockerImagesMigrateStoreOld) {
  // 返回已存在的缓存
  dockerImagesMigrateStore.$state = JSON.parse(dockerImagesMigrateStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export default dockerImagesMigrateStore
