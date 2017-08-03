# Day14 - JavaScript 引用和值拷贝

> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment) 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 14 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

## 项目效果

![](http://om1c35wrq.bkt.clouddn.com/day14--00.png)



## 按值操作

基本类型由值操作。以下类型在JavaScript中被视为基本类型：

- `String`

- `Number`

- `Boolean`

- `Null`

- `Undefined`

基本数据类型赋值你可以理解成值拷贝，从深拷贝和浅拷贝的角度去思考的话，你可以理解成`深拷贝`，当你修改一个变量的值时，不会影响其他变量的值。

### 实例

```Javascript
let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let name = 'liyuechun';
let name2 = name;
console.log(name, name2);
name = 'liyc';
console.log(name, name2);
```
![](http://om1c35wrq.bkt.clouddn.com/day14--01.png)
由此可见，基本类型，按值操作，新建的变量会将值复制给新的变量，各自的改变不会互相影响。


## 通过引用操作

对象`Object`类型是按引用操作的，如果它不是基本类型中的一个，那么它就是对象，这里如果我们细究的话，JavaScript中每一个东西都可以当做对象，甚至是基本的类型（不包括`null`和`undefined`），但我们尽量不要钻这个牛角尖。

一些JavaScript中的对象：

`Object`

`Function`

`Array`

`Set`

`Map`

### 浅拷贝

```js
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// 引用拷贝
const team = players;

console.log(`players: ${players}`, `team:${team}`);

// 我们做如下操作：
team[3] = 'Lux';

console.log(`players: ${players}`, `team:${team}`);

const team2 = players.slice();

console.log(`players: ${players}`, `team:${team}`, `team2:${team2}`);
```

![](http://om1c35wrq.bkt.clouddn.com/day14--02.png)

由上效果显示，浅拷贝拷贝的是指针，当你去操作一个指针时，其实所有指针指向的同一个对象的值都会发生变化。


### 深拷贝

```js
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// 创建新数组并且将原来的数组拼接到新数组中
const team3 = [].concat(players);

// ES6 Spread语法
const team4 = [...players];
team4[3] = 'heeee hawww';
console.log(`team4:${team4}`);

const team5 = Array.from(players);
console.log(`team5:${team5}`);
```

![](http://om1c35wrq.bkt.clouddn.com/day14--03.png)

由上面的效果显示，但我们修改team4时，players并没有发生任何变化，上面的`contact`,`...`,`Array.from`都属于深拷贝，会将原来的内容重新拷贝一份，所以当你操作一个指针时不会影响原对象。


### 深拷贝 与 浅拷贝对比

```js
//创建object对象
const person = {
 name: '黎跃春',
 age: 29
};

// 浅拷贝
console.log(`person:${JSON.stringify(person)}`);
const captain = person;
captain.number = 99;
console.log(`person:${JSON.stringify(person)}`);
console.log(`captain:${JSON.stringify(captain)}`);

// 深拷贝
const cap2 = Object.assign({}, person, {
 number: 99,
 age: 12
});
console.log(`cap2:${JSON.stringify(cap2)}`);
console.log(`person:${JSON.stringify(person)}`);
```

![](http://om1c35wrq.bkt.clouddn.com/day14--04.png)

- `JSON.stringify`将对象转换成字符串，打印时效果清晰。
- `captain = person`属于浅拷贝
- `Object.assign`的三个参数中，第一个参数属于初始值，它最终的值是第二个和第三个参数的并集，如果第二个、第三个参数有相同的属性，那个第三个参数会覆盖第二个参数里面的值。

### 采用JSON字符串

```js
// 对象的嵌套
const liyc = {
 name: '黎跃春',
 age: 100,
 social: {
   sina: '黎跃春-追时间的人',
   facebook: '黎跃春'
 }
};

console.log(`liyc:${liyc}`);

const dev = Object.assign({}, liyc);
console.log(`dev:${dev}`);

const dev2 = JSON.stringify(liyc);
console.log(`dev2:${dev2}`);

const dev3 = JSON.parse(JSON.stringify(liyc));
console.log(`dev3:${dev3}`);
```
![](http://om1c35wrq.bkt.clouddn.com/day14--05.png)


首先调用`JSON.stringify()`方法将对象解析为字符串，再调用`JSON.parse()`方法，将字符串解析为对象，这是一个小技巧，在处理对象的复制时很有用。

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)


|全栈部落|区块链部落|
|:---------:|:------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo100.jpeg)|![](http://orhm8wuhd.bkt.clouddn.com/qukuailian100.jpg)|


