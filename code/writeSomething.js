/**
 * 
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

let stu = new People('lilei', 16)

stu.sayHi()

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
