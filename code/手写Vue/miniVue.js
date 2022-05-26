import Observer from './observer.js'
class MiniVue {
  constructor(options) {
    // 1. 通过属性保存选项数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.$el === 'string' ? document.querySelector(options.$el) : options.$el
    // 2. 把data中的成员转换成getter和setter并注入到vue实例中
    this._proxyData(this.$data)
    // 3. 调用observer对象，监听数据变化
    new Observer(this.$data)
    // 4. 调用conpiler对象，解析指令和差值表达式
  }

  _proxyData(data) {
    Reflect.ownKeys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          if (newVal === data[key]) return
          data[key] = newVal
        }
      })
    })
  }
}