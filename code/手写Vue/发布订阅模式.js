/**
 * 事件处理中心
 */
class EventEmitter {
  constructor() {
    //  { 'click': [fn1, fn2], 'change': [fn1] }
    this.subs = Object.create(null)
  }
  // 注册事件
  $on(eventType, handler) {
    // if (this.subs[eventType]) {
    //   this.subs[eventType].push(handler)
    // } else {
    //   this.subs[eventType] = handler
    // }
    // 优化写法
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }
  // 触发事件
  $emit(eventType) {
    (this.subs[eventType] || []).forEach(handler => handler())
  }
}