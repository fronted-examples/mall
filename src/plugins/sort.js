export default {
  /**
   * 冒泡升序排序
   * @param {Array} array
   * @returns {Array}
   */
  bubbleAscSort: function (array) {
    const max = array.length - 1
    for (let j = 0; j < max; j++) {
      // 声明一个变量，作为标志位
      let done = true
      for (let i = 0; i < max - j; i++) {
        if (array[i] > array[i + 1]) {
          let temp = array[i]
          array[i] = array[i + 1]
          array[i + 1] = temp
          done = false
        }
      }
      if (done) {
        break
      }
    }

    return array
  },
  /**
   * 冒泡降序排序
   * @param {Array} array
   * @returns {Array}
   */
  bubbleDescSort: function (array) {
    const max = array.length - 1
    for (let j = 0; j < max; j++) {
      // 声明一个变量，作为标志位
      let done = true
      for (let i = 0; i < max - j; i++) {
        if (array[i] < array[i + 1]) {
          let temp = array[i]
          array[i] = array[i + 1]
          array[i + 1] = temp
          done = false
        }
      }
      if (done) {
        break
      }
    }

    return array
  },
  /**
   * 插入排序算法
   * @param  {Array} array 需要排序的数组
   * @return {Array}     从小到大排序好的数组
   *
   * 算法分析
   * 最佳情况：输入数组按升序排列。T(n) = O(n)
   * 最坏情况：输入数组按降序排列。T(n) = O(n2)
   * 平均情况：T(n) = O(n2)
   */
  insertSort: function (array) {
    var len = array.length
    for (var i = 1; i < len; i++) {
      var key = array[i]
      var j = i - 1
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j]
        j--
      }
      array[j + 1] = key
    }
    return array
  },
  /**
   * 二分法插入排序
   * @param  {array} array 需要排序的数组
   * @return {array}     排序后的数组
   *
   * 算法分析
   * 最佳情况：T(n) = O(nlogn)
   * 最差情况：T(n) = O(n2)
   * 平均情况：T(n) = O(n2)
   */
  binaryInsertSort: function (array) {
    for (var i = 1; i < array.length; i++) {
      let key = array[i]
      let left = 0
      let right = i - 1
      while (left <= right) {
        let middle = parseInt((left + right) / 2)
        if (key < array[middle]) {
          right = middle - 1
        } else {
          left = middle + 1
        }
      }
      for (let j = i - 1; j >= left; j--) {
        array[j + 1] = array[j]
      }
      array[left] = key
    }
    return array
  },
  shellSort: function (array) {
    let increment = array.length
    let i
    let temp // 暂存
    do {
      // 设置增量
      increment = Math.floor(increment / 3) + 1
      for (i = increment; i < array.length; i++) {
        if (array[i] < array[i - increment]) {
          temp = array[i]
          for (var j = i - increment; j >= 0 && temp < array[j]; j -= increment) {
            array[j + increment] = array[j]
          }
          array[j + increment] = temp
        }
      }
    } while (increment > 1)

    return array
  },
  /**
   * 对象升序排列
   * @param {*} array
   */
  objectDescSort: function (array, defaultParam = 'offset') {
    const max = array.length - 1

    for (let j = 0; j < max; j++) {
      // 声明一个变量，作为标志位
      let done = true
      for (let i = 0; i < max - j; i++) {
        if (array[i][defaultParam] > array[i + 1][defaultParam]) {
          let temp = array[i]
          array[i] = array[i + 1]
          array[i + 1] = temp
          done = false
        }
      }
      if (done) {
        break
      }
    }

    return array
  }
}
