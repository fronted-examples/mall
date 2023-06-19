export function getWheelData ($event) {
  $event = $event || window.event

  /**
   * 判断浏览器IE，谷歌滑轮事件
   * wheelDelta > 0 -> 滑轮向上滚动
   * wheelDelta < 0 -> 滑轮向下滚动
   */
  const wheelDelta = $event.wheelDelta

  const result = {}
  if (wheelDelta) {
    result['wheelDelta'] = wheelDelta
  }

  /**
   * Firefox滑轮事件
   * detail > 0 -> 滑轮向下滚动
   * detail < 0 -> 滑轮向上滚动
   */
  const detail = $event.detail
  if (!wheelDelta && detail) {
    result['detail'] = detail
  }

  return result
}

/**
 *
 * @param {*} $event
 * @param {*} callback
 */
export function getWheelDirection ($event, callback) {
  const result = getWheelData($event)

  if (Object.prototype.toString.call(callback) === '[object Function]') {
    callback(result)
  }
}

// //给页面绑定滑轮滚动事件
// if(document.addEventListener){//firefox
//   document.addEventListener("DOMMouseScroll", scrollFunc, false);
// } else {
// //滚动滑轮触发scrollFunc方法  //ie 谷歌
// window.onmousewheel=scrollFunc;
// }

//    给页面绑定鼠标滚轮事件,针对火狐的非标准事件
// window.addEventListener("DOMMouseScroll", scrollFunc);
// //    给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
// window.addEventListener("wheel", scrollFunc);
// //    ie不支持wheel事件，若一定要兼容，可使用mousewheel
// window.addEventListener("mousewheel", scrollFunc);