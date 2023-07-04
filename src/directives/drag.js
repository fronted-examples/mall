/**
 * 元素移动指令
 *
 * outRange 为true意味着元素可以任意摆放，为false只能在页面或者父元素内部摆放
 * arg目前有三种取值undefined(不传)、left-top(左上角为原点)、left-bottom(左下角为原点)，用于更改transition动画的方向
 */
const drag = {
  /**
     * 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
     * 可执行插入节点操作
     * @param {*} el 节点
     */
  inserted: function (el, { value, modifiers, arg }) {
    const { outRange, disabled, fixed } = modifiers

    console.log('arg: ', modifiers)

    if (disabled) {
      return
    }

    el.onmousedown = function (e) {
      el.style.position = fixed ? 'fixed' : 'absolute'
      el.style.cursor = 'move'
      el.style.zIndex = 10001

      // e.pageX, e.pageY 是鼠标在页面上的坐标
      // el.offsetLeft, el.offsetTop 是元素相对于页面左上角的偏移位置
      // distanceX, distanceY 便是鼠标相对于元素左上角的偏移位置
      const distanceX = e.pageX - el.offsetLeft
      const distanceY = e.pageY - el.offsetTop

      document.onmousemove = function (e) {
        let x, y

        if (!outRange) {
          // e.pageX - disx  鼠标在页面上的位置 - 鼠标在元素中的偏移位置  得到的是元素相对于页面左上角的偏移位置
          if ((e.pageX - distanceX) > 0) { // 元素相对于页面左上角的偏移位置 大于0时
            if ((e.pageX - distanceX) > document.documentElement.clientWidth - el.clientWidth) { // 元素相对于页面左上角的偏移位置 移出到页面以外（右侧）
              x = document.documentElement.clientWidth - el.clientWidth // el.clientWidth是元素自身的宽高
            } else {
              x = e.pageX - distanceX
            }
          } else { // 元素移到到页面以外（左侧）
            x = 0
          }

          if ((e.pageY - distanceY) > 0) {
            if ((e.pageY - distanceY) > document.documentElement.clientHeight - el.clientHeight) { // 元素移动到页面以外（底部）
              y = document.documentElement.clientHeight - el.clientHeight
            } else {
              y = e.pageY - distanceY
            }
          } else { // 元素移动到页面以外（顶部）
            y = 0
          }
        }

        if (outRange) {
          x = e.pageX - distanceX

          y = e.pageY - distanceY
        }

        /**
           * 对应元素的定位方向要定位left,bottom
           */
        if (arg === 'left-bottom') {
          el.style.left = x + 'px'
          el.style.bottom = 'calc(100% - ' + (el.clientHeight + y) + 'px)'

          if (!value) {
            return
          }

          value.left = x
          value.bottom = 'calc(100% - ' + (el.clientHeight + y) + 'px)'
        }

        /**
           * 对应元素的定位方向要定位为top,left
           */
        if (!arg || arg === 'left-top') {
          el.style.left = x + 'px'
          el.style.top = y + 'px'

          if (!value) {
            return
          }

          value.top = y
          value.left = x
        }

        // console.log(value)
      }
    }

    el.onmouseleave = function (e) {
      el.style.cursor = 'default'
      document.onmousemove = document.onmouseup = null
    }

    el.onmouseup = function (e) {
      el.style.cursor = 'default'
      document.onmousemove = document.onmouseup = null
    }
  },
  // 只调用一次， 指令与元素解绑时调用。
  unbind: function (el, binding) {
    el.onmouseleave = function (e) {
      document.onmousemove = document.onmouseup = null
    }

    el.onmouseup = function (e) {
      document.onmousemove = document.onmouseup = null
    }
  }
}

export default drag
