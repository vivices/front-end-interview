/**
 * 增加integor接口
 */
const obj = {
  a: 1,
  b: 2,
  c: 3
}

obj[Symbol.iterator] = () => {
  let count = 0
  const keys = Object.keys(this)
  return {
    next() {
      if (count < keys.length) {
        return { value: obj[keys[count++]] }
      } else {
        return { done: true }
      }
    }
  }
}

for(let k of obj){
  console.log(k);
}

/**
 * 组合模式创建对象
 */
function People(name, age) {
  this.name = name
  this.age = age
}
People.prototype.sayHi = function() {
  console.log(`Hi Im ${this.name}, Im ${this.age} years old`)
}

let stu = new People('lilei', 16)

stu.sayHi()

/**
 * 动态原型模式创建对象
 */
function People(name, age) {
  this.name = name
  this.age = age
  if (typeof this.sayHi !== 'function') {
    this.sayHi = function() {
      console.log(`Hi Im ${this.name}, Im ${this.age} years old`)
    }
  }
}

let stu2 = new People('lilei', 16)

stu2.sayHi()

/**
 * setTimeout 实现 setInterval
 */
let timer = null
const interval = (fn, wait) => {
  let interv = () => {
    fn()
    timer = setTimeout(interv, wait)
  }
  timer = setTimeout(interv, wait)
}

/**
 * 手写new
 */
const _new = (fn, ...args) => {
  if (typeof fn !== 'function') {
    throw new Error('请传入构造函数！')
  }
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  if (res && typeof res === 'object' || typeof res === 'function') return res
  return obj
}

/**
 * 手写instanseof
 */
const _instanceof = (left, right) => {
  const proto = Reflect.getPrototypeOf(left)
  const prototype = right.prototype
  while(true) {
    if (!proto) {
      return false
    }
    if (proto === prototype) {
      return true
    }
    proto = Reflect.getPrototypeOf(proto)
  }
}

/**
 * 手写filter
 */
function _filter(arr, fn) {
  const res = []
  for(let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      res.push(arr[i])
    }
  }
  return res
}

/**
 * once函数（利用高阶函数实现
 * pay再多次都只会执行一次
 */
function _once(fn) {
  let done = false
  return function() {
    if (!done) {
      done = true
      fn.apply(this, arguments)
    }
  }
}
const pay = _once(money => {
  console.log(money)
})
pay(6)
pay(6)
pay(6)
pay(6)

/**
 * 手写memoize
 */
const memoize = (fn) => {
  let cache = {}
  return () => {
    const key = JSON.stringify(arguments)
    cache[key] = cache[key] || fn.apply(fn, arguments)
    return cache[key]
  }
}

