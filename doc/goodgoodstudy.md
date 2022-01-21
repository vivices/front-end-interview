### 1.选择Map还是Object
内存占用，相同的内存大小，Map比Object能多存储大约50%的键值对
查找性能，如果Object以数组形式存储的键值对（{ 0: 'qwe', 1: '23'... }），浏览器会进行优化，对Map则是不可能的，而2者的查找速度都不会随着键值对的增加而提升，所以如果涉及到大量查找操作，有时候选择Object会好一些
删除性能，Object的delete操作饱受诟病，对大多数引擎Map的删除操作比插入和查找都更快，如果代码设计大量删除，毫无疑问选择Map
插入性能，2者内存消耗大致相同，不过Map会稍快，插入不会随键值对数量增加而增加，所以大量插入选Map
### 2.变量提升
函数编译阶段会初始化内部声明的变量，var，function会放在变量环境中，初始值为undefined，let, const会存放在词法环境中，初始状态是unitialized，区别在于unitialized状态的变量读取时会抛异常，undefined可以读取
【变量环境 & 词法环境】是函数执行上下文中的2个环境状态，编译后的执行阶段会按照【词法环境 -> 变量环境 -> 闭包/上一个作用域】的顺序去查找变量
### 3.for..in.. 和 for...of..的区别
前者获取对象的key，后者获取对象的value
前者会遍历整个原型链，后者只遍历当前对象
前者遍历数组的所有可枚举属性（包括原型链上的）后者只遍历数组的下标值
总结：前者遍历对象，其他类型使用后者遍历
### 4. Object.getPrototypeOf()是ES5新增的获取__proto__的方法
### 5. 为什么要用 setTimeout 模拟 setInterval ？
1. 说说setInterval的缺点:
    - 某些间隔可能会被跳过
      - 每个 setTimeout 产生的任务会直接 push 到任务队列中；而 setInterval 在每次把任务 push 到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)
    - 可能有多个定时器连续执行
      - 当上一个定时器的代码执行时间等于间隔时间的时候，执行完毕会有最新的定时器代码推入执行栈执行
2. ``` 
    let timer = null
    interval(func, wait){
        let interv = function(){
            func.call(null);
            timer = setTimeout(interv, wait);
        };
        timer= setTimeout(interv, wait);
    }
    ``` 
## 6.性能优化必须掌握
```
web性能优化的15条实用技巧（很基础，算是性能优化的入门，必须掌握的）
https://juejin.cn/post/6844903956590624782
当后端一次性丢给你10万条数据, 作为前端工程师的你,要怎么处理?
https://juejin.cn/post/6844904184689475592
《你应该掌握的前端性能优化面试点》
https://juejin.cn/post/6985188556939460638
项目中实用的前端性能优化（月哥写的）
https://juejin.cn/post/6987268877096845320
前端面试题之性能优化高频面试题集锦
https://juejin.cn/post/6992370209961017380#heading-3
前端性能优化总结
https://juejin.cn/post/6844904195707895816
前端性能优化之雅虎35条军规
https://juejin.cn/post/6844903657318645767
前端性能优化 24 条建议（2020）
https://juejin.cn/post/6892994632968306702
```
## 7. localStorage 和 sessionStorage区别
 - localStorage永久存放在浏览器中，需要手动清除，可添加addeventlistener监听数据变化
 - sessionStorage关闭tab或浏览器后失效