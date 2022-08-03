import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'

const { toClipboard } = useClipboard()

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

export default dblclick
