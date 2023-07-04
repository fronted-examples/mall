import drag from './drag'

const directives = {
  drag
}

export default {
  install (Vue) {
    Object.keys(directives).forEach((item) => {
      Vue.directive(item, directives[item])
    })
  }
}
