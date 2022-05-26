class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 1. 判断data是否是对象
    if (!data || typeof data !== 'object') return
    // 2. 遍历data中的所有属性
    Reflect.ownKeys(data).forEach(key => this.defineReactive(data, key, data[key]))
  }
  /**
   * @param {Object} obj - data对象
   * @param {String} key - 属性
   * @param {*} val - 属性对应的值，将此参数通过传递过来是为了避免在get里调用data[key]会触发死循环造成内存溢出报错
   */
  defineReactive(obj, key, val) {
    const _this = this
    // 如果val是对象，把val内部的属性变为响应式数据
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      set(newVal) {
        if (newVal === val) return
        // 如果data中的属性被重新赋值为新对象的时候，把新对象内部的属性变为响应式数据
        _this.walk(newVal)
        val = newVal
        // 发送通知
      }
    })
  }
}