import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'

const { toClipboard } = useClipboard()

/**
 * 双击复制：input 中的内容
 * @param e
 */
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

/**
 * 双击复制：div 中的内容
 * @param e
 */
export const dblclickDiv = async (e: any) => {
  try {
    await toClipboard(e.target.innerText)
    ElMessage({
      message: e.target.dataset.dblclick,
      type: 'success'
    })
  } catch (e) {
    console.error(e)
  }
}

export default dblclick
