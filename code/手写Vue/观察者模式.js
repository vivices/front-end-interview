//  发布者
class Dep {
  constructor() {
    // 维护所有的观察者
    this.subs = []
  }
  // 添加观察者
  add(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 通知观察者
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}
// 观察者 - 订阅者
class Watcher {
  update() {
    console.log('updated')
  }
}
