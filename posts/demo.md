---
title: "Demo"
date: 2021-03-17T01:03:22+08:00
hero: /images/hero-3.jpg
excerpt:
draft: true
---

1. 拷贝一个很多嵌套的对象怎么实现?
2. 写成怎样的深拷贝才算合格
## 浅拷贝
创建一个新的对象，来接受要重新复制或引用的对象值。 (只能复制一层)

- 如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；
- 如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，就会影响另一个对象
### 1. Object.assign() 用于对象的合并
`**Object.assign()**`** **将源对象（source）的所有可枚举属性，复制到目标对象（target）。它将返回目标对象。
ES6中object的一个方法, 第一个参数是拷贝的目标对象, 后面的参数是拷贝的来源对象(也可以是多个来源)
`Object.assign(target,...sources)`
```javascript
let target = {}
let source = { a: { b : 1 }}
Object.assign(target, source)
console.log(target) // {a: {b: 1}}


```
```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```
### 2. 扩展运算符 
**`let cloneObj = {...obj}`  `let newArr = [...arr]`**
> cmd+E 代码块

```javascript
/* 对象的拷贝 */
let obj = {a:1, b:{c:1}}
let obj2 = {...obj}
obj.a = 2
console.log(obj) //  { a: 2, b: { c: 1 } }
console.log(obj2) // { a: 1, b: { c: 1 } }
obj.b.c = 2
console.log(obj)  // { a: 2, b: { c: 2 } }
console.log(obj2) // // { a: 1, b: { c: 2 } }

/* 数组的拷贝 */
let arr = [1, 2, 3]
let newArr = [...arr]  // 跟arr.slice() 效果一样
console.log(newArr) // [ 1, 2, 3 ]
arr[2] = 5
console.log(arr)   // [ 1, 2, 5 ]
console.log(newArr) // [ 1, 2, 3 ]
```
扩展运算符和Object.assign都只能是浅拷贝，`但是如果属性都是基本类型的值，使用扩展运算符浅拷贝更加方便`
### 3. concat 拷贝数组
**`Array.concat()`**方法用于合并两个或多个数组。此方法不会更改现有数组，而是`返回一个新数组`
```javascript
let arr = [1, 2, 3]
let newArr = arr.concat()
newArr[1] = 100
console.log(arr) // [1, 2, 3]
console.log(newArr) // [1, 100, 3]
```
```javascript
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

// ---连接三个数组---
var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];

var nums = num1.concat(num2, num3);

console.log(nums);
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]

// --将值连接到数组--
var alpha = ['a', 'b', 'c'];

var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]
```
### 4. slice 拷贝数组
`**slice()**` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。
> arr.slice(begin, end)

- **begin** : 提取起始处的索引（从 `0` 开始），从该索引开始提取原数组元素
- **end:** 提取终止处的索引（从 `0` 开始），在该索引处结束提取原数组元素。`slice` 会提取原数组中索引从 `begin` 到 `end` 的所有元素（包含 `begin`，但不包含 `end`）
   - 如果 `end` 被省略，则 `slice` 会一直提取到原数组末尾
```javascript
let arr = [1, 2, {val:4}]
let newArr = arr.slice()   // newArr  [1, 2, {val:4}]
newArr(2).val = 1000 
console.log(arr) // 浅拷贝,会影响原数组中的val(引用类型)  [1, 2, {val:1000}]
```

- 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。



- 对于字符串、数字及布尔值来说（不是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 或者 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象），`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。



### 5. 手写实现一个浅拷贝
 [null和undefined区别](https://www.zhihu.com/question/56841737)
思路:

1. 对基础类型做一个最基本的拷贝
1. 对引用类型开辟一个新的存储，并且拷贝一层对象属性。
```javascript
// Array.isArray(target)判断是否是数组 IE8不支持
// toString.call(target) === '[object Array]'
const shallowClone = (target) => {
    if (target != null && (typeof target === 'object'|| typeof target === 'function')) {
      const cloneTarget = Array.isArray(target) ? []: {};
      for (let prop in target) { // 浅拷贝只遍历第一层
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = target[prop];//  [1,2]
         }
      }
      return cloneTarget;
    } else {
      return target;
    }
}

// let a = [1,2, [3, 4]]
let a = {name:'ha ha',c:{name:{yo:'xi xi'}}}
let b = shallowClone(a)
console.log(b)
```
## 深拷贝
### 1. JSON.parse(JSON.stringify())
把一个对象序列化成JSON的字符串，并将对象里面的内容转换成字符串,，最后再用JSON.parse()的方法将JSON字符串生成一个新的对象。
```javascript
let obj1 = { a: 1, b:[1, 2, 3]}
let str = JSON.stringify(obj1)
let obj2 = JSON.parse(str)
console.log(obj2)  //  a: 1, b: [ 1, 2, 3 ] }
obj1.a = 2
obj2.b.push(4)
console.log(obj1)    // { a: 2, b: [ 1, 2, 3 ] }  
console.log(obj2)   // { a: 1, b: [ 1, 2, 3, 4 ]}  obj2  obj1相互不影响
```
缺陷:

1. 拷贝的对象的值中如果有**函数，undefined，symbol**，经过JSON.stringify序列化后的字符串中,这个键值对会**丢失**
1. 拷贝**Date**引用类型会变成**字符串**
1. **无法拷贝不可枚举的属性**
1. **无法拷贝对象的原型链**
1. **拷贝RegExp 引用类型会变成空对象**
1. 对象中含有NaN、 Infinity以及 -Infinity, JSON序列化的结果会变成null
1. 无法拷贝对象的循环引用, 即对象成环(obj(key) = obj)
```javascript
function Obj() { 
  this.func = function () { alert(1) }; 
  this.obj = {a:1};
  this.arr = [1,2,3];
  this.und = undefined; 
  this.reg = /123/; 
  this.date = new Date(0); 
  this.NaN = NaN;
  this.infinity = Infinity;
  this.sym = Symbol(1);
} 
let obj1 = new Obj();
Object.defineProperty(obj1,'innumerable',{ 
  enumerable:false,
  value:'innumerable'
});
console.log('obj1',obj1);
let str = JSON.stringify(obj1);
let obj2 = JSON.parse(str);
console.log('obj2',obj2);
```
上述代码执行结果: 
![image.png](https://cdn.nlark.com/yuque/0/2021/png/302528/1615038697505-5eb4ed43-7aa1-4497-b200-3b2fd7c1d688.png#align=left&display=inline&height=384&margin=%5Bobject%20Object%5D&name=image.png&originHeight=768&originWidth=1100&size=340521&status=done&style=none&width=550)
### 2. 基础版本(手写递归实现,并考虑数组) 未处理循环引用
```javascript
// 判断数组
const isObject = (obj)=>{
    let type = typeof obj;
    return (type === 'function' || type === 'object' ) && !!obj;  // !!null
}

const deepClone = (target) =>{
    if(isObject(target)){
        // 考虑数组
        let cloneObj = Array.isArray(target) ? [] : {}
        for(let key in target){
            cloneObj[key] = deepClone(target[key])
        }
        return cloneObj
    }else{
        return target
    }
}
```
缺陷

1. 上述deepClone不能复制不可枚举的属性以及Symbol类型
1. 对象的属性里面成环, 循环引用没有解决

测试
```javascript
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
// target.target = target  // 循环引用,call stack 溢出
const deepTarget = deepClone(target)
console.log(deepTarget)
deepTarget.field3.child = 'yo'
console.log(target)
console.log(deepTarget)
```
如果要拷贝的对象存在循环引用时, 即对象的属性间接或直接的引用了自身的情况
因为递归进入死循环导致栈内存溢出了
![image.png](https://cdn.nlark.com/yuque/0/2021/png/302528/1615042963079-b10532a3-99ac-43b0-85f2-cb7094930dfb.png#align=left&display=inline&height=280&margin=%5Bobject%20Object%5D&name=image.png&originHeight=560&originWidth=1558&size=471031&status=done&style=none&width=779)
### 3. 考虑Date、RegExp等
思路

1. 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys()方法
1. 当参数为 Date 、RegExp 类型，则直接生成一个新的实例返回
1. 利用 WeakMap 类型作为 hash 表，（因为 WeakMap是弱引用类型，可以有效防止内存泄漏），作为检测循环引用 // lodash自己构造了一个stack

ps.循环效率
while>for>forEach>for in>for of
```javascript
// 可继续遍历
const objectTag = '[object Object]'
// const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const mapTag = '[object Map]'
const setTag = '[object Set]'


const deepTags = [mapTag,setTag,arrayTag,objectTag] // argsTag不能new
// 不可继续遍历类型 等,还有一些不考虑了
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const regexpTag = '[object RegExp]'
const symbolTag = '[object Symbol]'

const funcTag = '[object Function]' // 新加 lodash.js中没有 //函数单拿出来


const isObject = (obj)=>{
    let type = typeof obj;
    return (type === 'function' || type === 'object' ) && !!obj;
}

function getTag(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
  }

// 克隆正则
//w匹配任意一个包括下划线的任何单词字符等价于[A-Za-z0-9_]
const reFlags = /\w*$/  
const cloneRegExp=(regexp) =>{
    const result = new regexp.constructor(regexp.source, reFlags.exec(regexp)) // //返回当前匹配的文本;
    result.lastIndex = regexp.lastIndex //表示下一次匹配的开始位置
    return result
}

// 克隆Symbol
function cloneSymbol(symbol) {
    return Object(Symbol.prototype.valueOf.call(symbol))
  }

const initCloneByTag = (object,tag)=>{
    const Ctor = object.constructor // 返回创建该实例对象的Object构造函数的引用
        //例如 var o = {} o.constructor === Object var a =[] a.constructor === Array 
    //这里涉及到原型链， 比如o的原型链即__proto__调用内部[[prototype]]指向Object.prototype,在Object.prototy上找到了constructor属性，该属性指向Object;
    switch (tag) {
        case boolTag:
        case dateTag:
          //如果是布尔类型，调用内部ToNumber，如果是object，调用内部ToPrimitive（即先调用valueof，再调用toString）
          return new Ctor(+object)  // +转换为数字true -> 1 
        case numberTag:
        case stringTag:
        case errorTag:
          return new Ctor(object)
        case regexpTag:
          return cloneRegExp(object)
          // Symbol 类型时
        case symbolTag:
          return cloneSymbol(object)
        case funcTag:
        	return cloneFunc(object)
      }
}

// function isPrototype(value) {
//     const Ctor = value && value.constructor
//     const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto
  
//     return value === proto
//   }

// function initCloneObject(object) {
//     return (typeof object.constructor === 'function' && !isPrototype(object))
//       ? Object.create(Object.getPrototypeOf(object))
//       : {}
// }
function initCloneObj(obj){
    const Ctor = obj.constructor
    return new Ctor()
}

  // 克隆函数部分
  function arrayEach(array, iteratee) {
    let index = -1
    const length = array.length
  
    while (++index < length) {
    //   if (iteratee(array[index], index, array) === false) {
    //     break
    //   }
        iteratee(array[index],index)
    }
    return array
  }

const deepClone = (target, hash = new WeakMap()) =>{
    if(!isObject(target)) return target
    // 循环引用的处理 // 注意!如何写惊艳面试官那篇blog中这里返回错误
    if(hash.has(target)) return hash.get(target)
    let tempTarget = Array.isArray(target) ? [] : {};
    hash.set(target, tempTarget);
    // let allDesc = Object.getOwnPropertyDescriptors(target) // 注意有s
    // let cloneTarget = Object.create(Object.getPrototypeOf(target),allDesc)
    // hash.set(target,cloneTarget)

    const tag = getTag(target)
    let cloneTarget
    if(deepTags.includes(tag)){
        cloneTarget = initCloneObj(target) // 初始化要遍历的
    }else{
        return initCloneByTag(target,tag) // 不可遍历类型直接走另外的了
    }
    // 处理map
    if (tag == mapTag) {
        target.forEach((value, key) => {
          cloneTarget.set(key, deepClone(value))
        })
        return cloneTarget
      }

    // 处理set
      if (tag == setTag) {
        target.forEach((value) => {
          cloneTarget.add(deepClone(value))
        })
        return cloneTarget
      }
    
      // 不考虑性能,用for in, 考虑性能改写为while --> arrayEach
    //   if(isObject(target)){
    //     // 考虑数组
    //     let cloneObj = Array.isArray(target) ? [] : {}
    //     for(let key in target){
    //         cloneObj[key] = deepClone(target[key])
    //     }
    //     return cloneObj
    // }
    const props = tag === arrayTag ? undefined :Object.keys(target)
    arrayEach(props || target, (subValue, key) => {
        if (props) {
          key = subValue
          subValue = target[key]
        }
        // Recursively populate clone (susceptible to call stack limits). // 这里不用loadsh的方式
        // assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
        cloneTarget[key] = deepClone(target[key],hash)
      })
    // hash.set(target,cloneTarget) // 处理循环引用
    return cloneTarget
}
```


实现的方式主要是以Object.prototype.toString.call得到tag，再分类处理，环由stack(weakMap)解决，symbol由Object.getOwnPropertySymbols方法解决。


### 4. 木易杨
```javascript
function deepClone(source, hash = new WeakMap()) {

    if (!isObject(source)) return source; 
    if (hash.has(source)) return hash.get(source); 
      
    let target = Array.isArray(source) ? [...source] : { ...source }; // 改动 1
    hash.set(source, target);
    
  	Reflect.ownKeys(target).forEach(key => { // 改动 2
        if (isObject(source[key])) {
            target[key] = deepClone(source[key], hash); 
        } else {
            target[key] = source[key];
        }  
  	});
    return target;
}
```
### 5. 拉勾改进版
```javascript
const isObject = (obj)=>{
    let type = typeof obj;
    return (type === 'function' || type === 'object' ) && obj!=null;
}

const getTag = (value)=>{
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
}

const dateTag = '[object Date]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'

const deepClone = function(obj, hash = new WeakMap()){
    if (!isObject(obj)) return obj;  // 不是对象

    // 正则,Date
    const tag = getTag(target)
    if(tag === dateTag) return new Date(obj)
    if(tag === regexpTag) return new RegExp(obj)
    // 如果循环引用
    if(hash.has(obj)) return hash.get(obj)
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    let cloneObj = Object.create(Object.getPrototypeOf(obj),allDesc)
    hash.set(obj,cloneObj)
    // 遍历
    // for(let key of Reflect.ownKeys(obj)){  // of遍历数组
    //     if(isObject(obj[key])){
    //         cloneObj[key] = deepClone(obj[key],hash)
    //     }else{
    //         cloneObj[key] = obj[key];
    //     }
        
    // }
    // console.log(Reflect.ownKeys(obj))
    Reflect.ownKeys(obj).forEach(key => { // 改动 2
        if (isObject(obj[key])) {
            cloneObj[key] = deepClone(obj[key], hash); 
        } else {
            cloneObj[key] = obj[key];
        }  
  	});
    return cloneObj
}

// 测试
const map = new Map();
map.set('key', 'value');
map.set('yohaha', 'gtd2021');

const set = new Set();
set.add('doyou');
set.add('fine');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    target:{},
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('fine ok');
    },
    func2: function (a, b) {
        return a + b;
    }
};
// target.target = target;
const deepTarget = deepClone(target)
console.log(deepTarget)
```
#### 





















---

掘金资料
![image.png](https://cdn.nlark.com/yuque/0/2021/png/302528/1615011158345-fc6ac23c-26ca-4eb5-99e5-fc1c89c8f8b8.png#align=left&display=inline&height=629&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1258&originWidth=1182&size=673762&status=done&style=none&width=591)

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**。

## 参考:

1. [浅拷贝与深拷贝](https://juejin.cn/post/6844904197595332622)
2. [基本数据类型](https://juejin.cn/post/6844903854882947080#heading-7)
3. [js 深拷贝 vs 浅拷贝](https://juejin.cn/post/6844903493925371917)  good!
4. [浅拷贝与深拷贝](https://juejin.cn/post/6844904197595332622#heading-10) good!
5. [如何写出一个惊艳面试官的深拷贝? ](https://juejin.cn/post/6844903929705136141) good!
6. [木易杨](https://github.com/moyui/BlogPosts/blob/master/2018/lodash%E6%B7%B1%E6%8B%B7%E8%B4%9D%E6%BA%90%E7%A0%81%E6%8E%A2%E7%A9%B6.md)  Best!
7. [深拷贝的终极探索（99%的人都不知道）](https://segmentfault.com/a/1190000016672263)
