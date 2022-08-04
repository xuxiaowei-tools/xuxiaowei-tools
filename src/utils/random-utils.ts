// 数字
const NUMBERS = '0123456789'
// 小写字母
const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz'
// 大写字母
const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// 符号
const SPECIALS = '~!@#$%^*()_+-=[]{}|;:,./<>?'

/**
 * 随机生成字符串
 * @param length
 * @param options
 */
const randomUtils = (length: number, options: any) => {
  length || (length = 8) // 长度：默认值 8
  options || (options = {})

  let chars = ''
  let result = ''

  if (options === true) {
    chars = NUMBERS + LOWER_CASE + UPPER_CASE + SPECIALS
  } else if (typeof options === 'string') {
    chars = options
  } else {
    if (options.numbers !== false && options.numbers !== '') {
      const tmp = (typeof options.numbers === 'string') ? options.numbers : NUMBERS
      chars += tmp

      length--
      result += tmp[Math.floor(Math.random() * tmp.length)] // 包含数字时，最少有一个
    }

    if (options.lowerCase !== false && options.lowerCase !== '') {
      const tmp = (typeof options.lowerCase === 'string') ? options.lowerCase : LOWER_CASE
      chars += tmp

      length--
      result += tmp[Math.floor(Math.random() * tmp.length)] // 包含小写字母时，最少有一个
    }

    if (options.upperCase !== false && options.upperCase !== '') {
      const tmp = (typeof options.upperCase === 'string') ? options.upperCase : UPPER_CASE
      chars += tmp

      length--
      result += tmp[Math.floor(Math.random() * tmp.length)] // 包含大写字母时，最少有一个
    }

    if (options.specials && options.specials !== '') {
      const tmp = (typeof options.specials === 'string') ? options.specials : SPECIALS
      chars += tmp

      length--
      result += tmp[Math.floor(Math.random() * tmp.length)] // 包含符号时，最少有一个
    }
  }

  // 条件中不包含字符串集合
  if (chars === '') {
    // 返回空
    return ''
  }

  while (length > 0) {
    length--
    result += chars[Math.floor(Math.random() * chars.length)]
  }

  return result.split('').sort(function () {
    return Math.random() - 0.5
  }).join('')
}

export default randomUtils

export {
  NUMBERS,
  LOWER_CASE,
  UPPER_CASE,
  SPECIALS
}
