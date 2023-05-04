/**
 * promise并发请求数量控制
 * @param {*} poolLimit 最大并发量
 * @param {*} array 并发请求的参数数组
 * @param {*} request 并发请求
 * @param {*} callback 所有并发请求完成后的回调
 */
export const promisePool = (poolLimit, array, request, finish) => {
  const requests = [...array]
  const result = []
  const errors = []
  const promises = []
  const length = requests.length
  let ajaxNum = 0
  let maxCount = 0

  const pool = (requests) => {
    while (ajaxNum < poolLimit && requests.length) {
      ajaxNum++
      const i = requests.shift()

      promises.push(request(i).then((res) => {
        result.push(res)
        ajaxNum--

        pool(requests)
      }).catch(() => {
        ajaxNum--
        errors.push(i)
      }))
    }

    console.log('执行: ', ajaxNum)

    if (promises.length === length) {
      maxCount++
      // 由于循环会多次执行promises.length === length，这里判断只执行初次
      if (maxCount === 1) {
        Promise.all(promises).finally(() => {
          result.length === length && typeof finish === 'function' && finish(true, result) // 全部上传执行成功

          errors.length && typeof finish === 'function' && finish(false, result) // 未全部执行成功
        })
      }
    }
  }

  pool(requests)
}
