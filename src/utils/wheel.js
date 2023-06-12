export function wheelDirection ($event) {
  $event = $event || window.event

  /**
   * 判断浏览器IE，谷歌滑轮事件
   */
  const wheelDelta = $event.wheelDelta
  if (wheelDelta) {
    if (wheelDelta > 0) { // 当滑轮向上滚动时
      alert("滑轮向上滚动")
    }

    if (wheelDelta < 0) { // 当滑轮向下滚动时
      alert("滑轮向下滚动")
    }
  }

  /**
   * Firefox滑轮事件
   */
  const detail = $event.detail
  if (!wheelDelta && detail) {
    if (detail > 0) { // 当滑轮向下滚动时
      alert("滑轮向下滚动")
    }

    if (detail < 0) { // 当滑轮向上滚动时
      alert("滑轮向上滚动")
    }
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