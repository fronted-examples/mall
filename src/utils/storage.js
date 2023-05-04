/**
 * sessionStorage 和 localStorage 的2此封装
 * @param {string} type 存储方式：sessionStorage、localStorage
 * @returns {function} storage
 * @author gzq
 */
class Storage {
  constructor(type) {
    let win = global.window || window
    if (type === 'localStorage') {
      this.memory = win.localStorage
    } else {
      this.memory = win.sessionStorage
    }
  }
  /**
   * 设置缓存
   * @param {object} params
   * name: 键、value: 值、expired: 过期时间
   * @author gzq
   */
  setItem (params) {
    const defaultOParams = {
      name: '',
      value: '',
      expired: '',
      startTime: new Date().getTime() //记录何时将值存入缓存，毫秒级
    }
    const options = {}
    //将obj和传进来的params合并
    Object.assign(options, defaultOParams, params)
    if (options.expired) {
      //如果options.expired 设置了的话
      //以options.name为key，options为值放进去
      this.memory.setItem(options.name, JSON.stringify(options))
    } else {
      //如果options.expired 没有设置，就判断一下value的类型
      const type = Object.prototype.toString.call(options.value)
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (type === '[object Object]' || type === '[object Array]') {
        options.value = JSON.stringify(options.value)
      }
      this.memory.setItem(options.name, options.value)
    }
  }
  /**
   * 取值
   * @param {string} name 键
   * @author gzq
   */
  getItem (name) {
    let item = this.memory.getItem(name)
    if (!item || item == 'null' || item == 'undefined') {
      return
    }
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item)
    } catch (error) {
      //如果不行就不是json的字符串，就直接返回
      item = item
    }
    //如果有startTime的值，说明设置了失效时间
    if (item.startTime) {
      const now = new Date().getTime()
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (now - item.startTime > item.expired) {
        //缓存过期，清除缓存，返回false
        this.memory.removeItem(name)
        return false
      } else {
        //缓存未过期，返回值
        return item.value
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item
    }
  }
  /**
   * 移除缓存
   * @param {string} name 键
   * @author gzq
   */
  removeItem (name) {
    this.memory.removeItem(name)
  }
  /**
   * 移除全部缓存
   * @param {string} name 键
   * @author gzq
   */
  clear () {
    this.memory.clear()
  }
}

// 存储服务端vuex前，将window对象绑定到global上
if (process.env.VUE_ENV === "server") {
  require('@/utils/server-add-window.js')
  require('@/utils/flexible')
}


const localMemory = new Storage('localStorage')
const sessionMemory = new Storage('sessionStorage')
export {
  localMemory,
  sessionMemory
}