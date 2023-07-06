import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// @ts-ignore
import { resolve } from 'path'

// https://github.com/unocss/unocss/#vite
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    Unocss({ /* options */ })
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境移除console日志
        drop_console: true,
        // 生产环境移除debugger测试
        drop_debugger: true
      }
    },
    // 构建后是否生成 source map 文件。默认： false
    sourcemap: false,
    // 指定生成静态资源的存放路径（相对于 build.outDir）。默认： assets
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 最小化拆分包：https://rollupjs.org/guide/en/#outputmanualchunks
        manualChunks: (id) => {
          if (id.indexOf('node_modules') !== -1) { // 每个 node_modules 一个包
            return id.split('node_modules/')[1].split('/')[0]
          }
        }
      }
    }
  }
})
