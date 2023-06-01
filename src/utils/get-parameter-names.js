export function getFunctionArgsName (func) {
  //匹配函数括号里的参数
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1]

  //分解参数成数组
  return args.split(",").map(function (arg) {
    //去空格和内联注释
    return arg.replace(/\/\*.*\*\//, "").trim()
  }).filter(function (args) {
    //确保没有undefineds
    return args
  })
}