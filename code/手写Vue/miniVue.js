import Observer from './observer.js'
class MiniVue {
  constructor(options) {
    // 1. 通过属性保存选项数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.$el === 'string' ? document.querySelector(options.$el) : options.$el
    /**
     * 2. 把data中的成员转换成getter和setter并注入到vue实例中
     *    这样就可以使用this.xxx来访问到this.data.xxx
     *    
     *    这里将data注入vue实例和Observer监听数据变化的区别有
     *      * 代理的第一个对象不同，前者是this（vm）既vue实例，而后者传入的是data
     */
    this._proxyData(this.$data) 
    // 3. 调用observer对象，监听数据变化 - 响应式数据核心
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