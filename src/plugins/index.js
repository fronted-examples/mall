import file from './file'
import sort from './sort'

export default {
  install (Vue) {
    // 文件操作
    Vue.prototype.$file = file
    // 排序
    Vue.prototype.$sort = sort
  }
}
