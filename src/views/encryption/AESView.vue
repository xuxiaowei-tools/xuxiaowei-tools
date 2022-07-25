<template>
  <el-row justify="space-evenly">
    <el-col :span="22" style="text-align: center">
      <h1>AES 对称性加密</h1>
    </el-col>
  </el-row>

  <el-row style="text-align: center">
    <el-col :span="22">
      <el-radio-group v-model="type">
        <el-radio border label="1">仅秘钥 key</el-radio>
        <el-radio border label="2">秘钥 key + 偏移量 iv</el-radio>
      </el-radio-group>
    </el-col>
  </el-row>

  <br>

  <el-row justify="space-evenly">
    <el-col :span="11">
      <el-select v-model="mode" placeholder="请选择模式" class="w-100%">
        <el-option v-for="item in modeOptions" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-col>
    <el-col :span="11">
      <el-select v-model="padding" placeholder="请选择填充方案" class="w-100%">
        <el-option v-for="item in paddingOptions" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-col>
  </el-row>

  <br>

  <el-row justify="space-evenly">
    <el-col :span="11">
      <el-input v-model="key" placeholder="请输入秘钥" clearable @dblclick="dblclick" data-dblclick="秘钥已复制到剪贴板">
        <template #prepend>
          <span>秘钥 key</span>
        </template>
        <template #append>
          <el-select v-model="keyMode" placeholder="选择秘钥编码">
            <el-option v-for="item in modeEncOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-input>
    </el-col>
    <el-col :span="11" v-if="type === '2'">
      <el-input v-model="iv" placeholder="请输入偏移量" clearable @dblclick="dblclick" data-dblclick="偏移量已复制到剪贴板">
        <template #prepend>
          <span>偏移量 iv</span>
        </template>
        <template #append>
          <el-select v-model="ivMode" placeholder="选择偏移量编码">
            <el-option v-for="item in ivEncOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <br>

  <el-row class="button-row" justify="space-evenly">
    <el-col :span="11">
      <el-button @click="encrypt" class="encrypt-button w-100%">加密</el-button>
    </el-col>
    <el-col :span="11">
      <el-button @click="decrypt" class="decrypt-button w-100%">解密</el-button>
    </el-col>
  </el-row>

  <br>

  <el-row justify="space-evenly">
    <el-col :span="11">
      <el-select v-model="decryptEnc" placeholder="请选择解密编码" class="w-100%">
        <el-option v-for="item in decryptEncOptions" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-col>
  </el-row>

  <br>

  <el-row class="text-row" justify="space-evenly">
    <el-col :span="11">
      <el-input v-model="originalText" class="originalText-input" placeholder="原文" type="textarea" @dblclick="dblclick"
                rows="15" data-dblclick="原文已复制到剪贴板"/>
    </el-col>
    <el-col :span="11">
      <el-input v-model="ciphertext" class="ciphertext-input" placeholder="密文" type="textarea" @dblclick="dblclick"
                rows="15" data-dblclick="密文已复制到剪贴板"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LocationQueryRaw, useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import useClipboard from 'vue-clipboard3'

const route = useRoute()
const router = useRouter()

const { toClipboard } = useClipboard()

// 类型
// 1：仅秘钥 key
// 2：秘钥 key + 偏移量 iv
// type 是 1 或 2 时，使用原来的值，如果不是，使用 1
const type = ref((route.query.type === '1' || route.query.type === '2') ? route.query.type : '1')

// 模式
const mode = ref('ECB')
// https://github.com/brix/crypto-js/blob/develop/docs/QuickStartGuide.wiki#block-modes-and-padding
const modeOptions = [
  {
    value: 'CBC',
    label: 'CBC'
  },
  {
    value: 'CFB',
    label: 'CFB'
  },
  {
    value: 'CTR',
    label: 'CTR'
  },
  {
    value: 'OFB',
    label: 'OFB'
  },
  {
    value: 'ECB',
    label: 'ECB'
  }
]

// 填充方案
const padding = ref('Pkcs7')
// https://github.com/brix/crypto-js/blob/develop/docs/QuickStartGuide.wiki#block-modes-and-padding
const paddingOptions = [
  {
    value: 'Pkcs7',
    label: 'Pkcs7'
  },
  {
    value: 'Iso97971',
    label: 'Iso97971'
  },
  {
    value: 'AnsiX923',
    label: 'AnsiX923'
  },
  {
    value: 'Iso10126',
    label: 'Iso10126'
  },
  {
    value: 'ZeroPadding',
    label: 'ZeroPadding'
  }
]

// 解密编码
const decryptEnc = ref('Utf8')
const decryptEncOptions = [
  {
    value: 'Utf8',
    label: 'Utf8'
  },
  {
    value: 'Hex',
    label: 'Hex'
  },
  {
    value: 'Latin1',
    label: 'Latin1'
  },
  {
    value: 'Utf16',
    label: 'Utf16'
  },
  {
    value: 'Utf16BE',
    label: 'Utf16BE'
  },
  {
    value: 'Utf16LE',
    label: 'Utf16LE'
  },
  {
    value: 'Base64',
    label: 'Base64'
  },
  {
    value: 'Base64url',
    label: 'Base64url'
  }
]

// 秘钥
const key = ref('1234567890ABCDEF')
const keyMode = ref('Utf8')
const modeEncOptions = [
  {
    value: '',
    label: 'default'
  },
  {
    value: 'Utf8',
    label: 'Utf8'
  },
  {
    value: 'Hex',
    label: 'Hex'
  },
  {
    value: 'Latin1',
    label: 'Latin1'
  },
  {
    value: 'Utf16',
    label: 'Utf16'
  },
  {
    value: 'Utf16BE',
    label: 'Utf16BE'
  },
  {
    value: 'Utf16LE',
    label: 'Utf16LE'
  },
  {
    value: 'Base64',
    label: 'Base64'
  },
  {
    value: 'Base64url',
    label: 'Base64url'
  }
]

// 偏移量
const iv = ref('')
const ivMode = ref('Utf8')
const ivEncOptions = [
  {
    value: '',
    label: 'default'
  },
  {
    value: 'Utf8',
    label: 'Utf8'
  },
  {
    value: 'Hex',
    label: 'Hex'
  },
  {
    value: 'Latin1',
    label: 'Latin1'
  },
  {
    value: 'Utf16',
    label: 'Utf16'
  },
  {
    value: 'Utf16BE',
    label: 'Utf16BE'
  },
  {
    value: 'Utf16LE',
    label: 'Utf16LE'
  },
  {
    value: 'Base64',
    label: 'Base64'
  },
  {
    value: 'Base64url',
    label: 'Base64url'
  }
]

// 原文
const originalText = ref('my message')

// 密文
const ciphertext = ref('')

// 加密
const encrypt = () => {
  const keyValue = valueParse(keyMode.value, key.value)
  try {
    if (type.value === '1') {
      // 1：仅秘钥 key
      ciphertext.value = CryptoJS.AES.encrypt(originalText.value, keyValue, {
        mode: getMode(mode.value),
        padding: getPadding(padding.value)
      }).toString()
    } else {
      // 2：秘钥 key + 偏移量 iv
      const ivParse = valueParse(ivMode.value, iv.value)
      ciphertext.value = CryptoJS.AES.encrypt(originalText.value, keyValue, {
        ivParse,
        mode: getMode(mode.value),
        padding: getPadding(padding.value)
      }).toString()
    }
    ElMessage({ message: '加密完成', type: 'success' })
  } catch (e) {
    if (type.value === '1') {
      ElMessage.error('加密失败，请确认秘钥 key、模式 mode、填充 padding 是否正确')
    } else {
      ElMessage.error('加密失败，请确认秘钥 key、偏移量 iv、模式 mode、填充 padding 是否正确')
    }
    console.error(e)
  }
}

// 解密
const decrypt = () => {
  let bytes
  const keyValue = valueParse(keyMode.value, key.value)
  try {
    if (type.value === '1') {
      // 1：仅秘钥 key
      bytes = CryptoJS.AES.decrypt(ciphertext.value, keyValue, {
        mode: getMode(mode.value),
        padding: getPadding(padding.value)
      })
    } else {
      // 2：秘钥 key + 偏移量 iv
      const ivParse = CryptoJS.enc.Latin1.parse(iv.value)
      bytes = CryptoJS.AES.decrypt(ciphertext.value, keyValue,
        {
          ivParse,
          mode: getMode(mode.value),
          padding: getPadding(padding.value)
        })
    }
    ElMessage({ message: '解密完成', type: 'success' })
  } catch (e) {
    if (type.value === '1') {
      ElMessage.error('解密失败，请确认秘钥 key、模式 mode、填充 padding 是否正确')
    } else {
      ElMessage.error('解密失败，请确认秘钥 key、偏移量 iv、模式 mode、填充 padding 是否正确')
    }
    console.error(e)
  }

  if (bytes === undefined) {
    return
  }

  try {
    originalText.value = bytes.toString(getEnc(decryptEnc.value))
  } catch (e) {
    ElMessage.error('解密后转码失败')
    console.error(e)
  }
}

// 转译模式
const getMode = (mode: string) => {
  switch (mode) {
    case 'CBC':
      return CryptoJS.mode.CBC
    case 'CFB':
      return CryptoJS.mode.CFB
    case 'CTR':
      return CryptoJS.mode.CTR
    case 'OFB':
      return CryptoJS.mode.OFB
    case 'ECB':
      return CryptoJS.mode.ECB
  }
}

// 转译填充
const getPadding = (padding: string) => {
  switch (padding) {
    case 'Pkcs7':
      return CryptoJS.pad.Pkcs7
    case 'Iso97971':
      return CryptoJS.pad.Iso97971
    case 'AnsiX923':
      return CryptoJS.pad.AnsiX923
    case 'Iso10126':
      return CryptoJS.pad.Iso10126
    case 'ZeroPadding':
      return CryptoJS.pad.ZeroPadding
  }
}

// 编码
const valueParse = (enc: string, value: string): any => {
  switch (enc) {
    case '':
      return value
    case 'Hex':
      return CryptoJS.enc.Hex.parse(value)
    case 'Latin1':
      return CryptoJS.enc.Latin1.parse(value)
    case 'Utf8':
      return CryptoJS.enc.Utf8.parse(value)
    case 'Utf16':
      return CryptoJS.enc.Utf16.parse(value)
    case 'Utf16BE':
      return CryptoJS.enc.Utf16BE.parse(value)
    case 'Utf16LE':
      return CryptoJS.enc.Utf16LE.parse(value)
    case 'Base64':
      return CryptoJS.enc.Base64.parse(value)
    case 'Base64url':
      return CryptoJS.enc.Base64url.parse(value)
  }
}

// 转译编码
const getEnc = (enc: string) => {
  switch (enc) {
    case 'Hex':
      return CryptoJS.enc.Hex
    case 'Latin1':
      return CryptoJS.enc.Latin1
    case 'Utf8':
      return CryptoJS.enc.Utf8
    case 'Utf16':
      return CryptoJS.enc.Utf16
    case 'Utf16BE':
      return CryptoJS.enc.Utf16BE
    case 'Utf16LE':
      return CryptoJS.enc.Utf16LE
    case 'Base64':
      return CryptoJS.enc.Base64
    case 'Base64url':
      return CryptoJS.enc.Base64url
  }
}

// 双击复制
const dblclick = async (e: any) => {
  try {
    await toClipboard(e.target.value)
    ElMessage({
      message: e.target.dataset.dblclick,
      type: 'success'
    })
  } catch (e) {
    console.error(e)
  }
}

watch(() => type.value, (newValue, oldValue) => {
  // 切换类型时，改变 URL 参数
  const query = JSON.parse(JSON.stringify(route.query))
  query.type = newValue
  const locationQueryRaw = ref<LocationQueryRaw>(query)

  router.replace({
    query: locationQueryRaw.value
  })
})

</script>

<style scoped lang="scss">

// 按钮行
.button-row {
  // 加密按钮
  .encrypt-button {

  }

  // 解密按钮
  .decrypt-button {

  }

  // 加密、解密按钮
  .encrypt-button,
  .decrypt-button {

  }
}

// 原文、密文行
.text-row {

  // 原文
  .originalText-input {

  }

  // 密文
  .ciphertext-input {

  }

}

</style>
