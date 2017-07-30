# Day07 - Array Cardio 中文指南二

> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 7 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

第七天的练习是接着之前[Day04 - Array Cardio 中文指南一](http://bbs.kongyixueyuan.com/topic/40/day04-array-cardio-%E6%8C%87%E5%8D%97%E4%B8%80)的练习，继续熟练数组的方法，依旧没有页面显示效果，所以请打开浏览器的Console面板进行调试运行。

![](http://om1c35wrq.bkt.clouddn.com/dya7%20-%20000.png)
![](http://om1c35wrq.bkt.clouddn.com/day7%20-%20001.png)




## 任务表
网站给了两个数组，分别为`people`数组和`comments`数组，如下：

```JavaScript
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];
```

**在此两数组的基础上实现一下几个操作：**
1. 是否至少有一人年满`19`周岁？
2. 是否每一个人都年满`19`周岁？
3. 是否存在`id=823423`的评论？
4. 找到`id=823423`的评论的序列号(下标)。
5. 删除`id=823423`的评论。


## 是否至少有一人年满19周岁？

### `Array.prototype.some()`

> [some参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

- CASE

```js
let isBiggerThan10 = (element, index, array) => {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

- Syntax

```js
arr.some(callback[, thisArg])
```


- Parameters

    - element：当前在操作的对象。
    
    - index：当前操作对象的索引。
    
    - array：在操作的数组指针。

- Return value
返回`true`或者`false`，返回true，说明数组中有满足条件的数据存在，返回false，说明数组里面没有满足条件的数组存在。

### 项目源码

- 版本一：

```js
const isAdult = people.some(function(person){
  const currentYear = new Date().getFullYear();
  if(currentYear - person.year >= 19){
    return true;
  }
});
console.log(isAdult);
```

- 版本二：

```JavaScript
const isAdult = people.some((person) => {
  const currentYear = new Date().getFullYear();
  if(currentYear - person.year >= 19){
    return true;
  }
});
console.log(isAdult);
```

- 版本三：

```JavaScript
const isAdult = people.some(person => (new Date().getFullYear() - person.year) >= 19 );
console.log(isAdult);
```

## 是否每一个人都年满`19`周岁？

### `Array.prototype.every()`

> [every参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)


- CASE

```js
let isBigEnough = (element, index, array) => { 
  return element >= 10; 
} 

[12, 5, 8, 130, 44].every(isBigEnough);   // false 
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

- Syntax

```js
arr.every(callback)
```

- Parameters

- Parameters

    - element：当前在操作的对象。
    
    - index：当前操作对象的索引。
    
    - array：在操作的数组指针。

- Return value
返回`true`或者`false`，返回true，代表数组中所有数据都满足条件，否则，至少有一条数据不满足条件。


### 项目源码

```JavaScript
const everyAdult = people.every(person => (new Date().getFullYear() - person.year) >= 19);
console.log({everyAdult});
```

## 是否存在`id=823423`的评论？

### `Array.prototype.find(callback)`

>  [find参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

- CASE

```js
let  isBigEnough = (element) => {
  return element >= 15;
}

[12, 5, 8, 130, 44].find(isBigEnough); // 130
```

- Syntax

```js
arr.find(callback)
```


- Parameters

    - element：当前在操作的对象。
    
    - index：当前操作对象的索引。
    
    - array：在操作的数组指针。

- Return value
如果有满足条件对象，返回该对象，否则返回`undefined `。

### 项目源码

```JavaScript
const findComment = comments.find(comment => comment.id === 823423);
console.log(findComment);
}
```


## 找到`id=823423`的评论的序列号(下标)

### `Array.prototype.findIndex()`

>  [findIndex参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)


- CASE

```js
let isBigEnough = (element) => {
  return element >= 15;
}

[12, 5, 8, 130, 44].findIndex(isBigEnough); 
// index of 4th element in the Array is returned,
// so this will result in '3'
```

- Syntax

arr.findIndex(callback)

- Parameters

    - element：当前在操作的对象。
    
    - index：当前操作对象的索引。
    
    - array：在操作的数组指针。

- Return value
返回满足条件的当前对象在数组中的索引，如果找不到满足条件的对象，返回`-1`。



### 项目源码

```JavaScript
const findCommentIndex = comments.findIndex(comment => comment.id === 823423);
console.log(findCommentIndex);
```


## 删除`id=823423`的评论

> [splice参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
> [slice参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)


###  `Array.prototype.splice()`

- CASE

在索引2的位置移除0个元素，并且插入"drum"

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum');

// myFish 是 ["angel", "clown", "drum", "mandarin", "sturgeon"] 
// removed is [], 没有元素被移除。
```

从索引3开始移除1个元素。

```js
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// 移除的原色是 ["mandarin"]
// myFish 为 ["angel", "clown", "drum", "sturgeon"]
```


从索引2移除一个元素，并且插入"trumpet"

```js
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, 'trumpet');

// myFish 为 ["angel", "clown", "trumpet", "sturgeon"]
// 移除的元素为 ["drum"]
```

从索引0开始移除2个元素，并且插入"parrot", "anemone" 和 "blue"。

```js
var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');

// myFish为 ["parrot", "anemone", "blue", "trumpet", "sturgeon"] 
// 移除的元素是 ["angel", "clown"]
```


从索引2开始移除所有元素

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

// myFish 为 ["angel", "clown"] 
// 移除的原色为 ["mandarin", "sturgeon"]
```


- Syntax

```js
array.splice(start)
array.splice(start, deleteCount)
array.splice(start, deleteCount, item1, item2, ...)
```
**array.splice(start)：** 从索引`start`开始移除后面所有的元素。

**array.splice(start, deleteCount)：** 从索引`start`元素删除`deleteCount`个元素。


**array.splice(start, deleteCount, item1, item2, ...)：**从`start`索引开始，删除`deleteCount`个元素，然后插入`item1`,`item2`,...

### `Array.prototype.slice()`

- CASE

```js
var a = ['zero', 'one', 'two', 'three'];
var sliced = a.slice(1, 3);

console.log(a);      // ['zero', 'one', 'two', 'three']
console.log(sliced); // ['one', 'two']
```

- Syntax

```js
arr.slice()
arr.slice(begin)
arr.slice(begin, end)
```
**arr.slice()**等价于**arr.slice(0,arr.length)**

**arr.slice(begin)**等价于**arr.slice(begin,arr.length)**

`arr.slice(begin, end)`：创建一个新数组，将索引`begin`-`end`(不包含end)的元素放到新数组中并返回新数组，原数组不被修改。


### 项目源码 - 删除`id=823423`的评论

```
const comments = [
 { text: 'Love this!', id: 523423 },
 { text: 'Super good', id: 823423 },
 { text: 'You are the best', id: 2039842 },
 { text: 'Ramen is my fav food ever', id: 123523 },
 { text: 'Nice Nice Nice!', id: 542328 }
];
    
const findCommentIndex = comments.findIndex(comment => comment.id === 823423);

// delete the comment with the ID of 823423
//comments.splice(findCommentIndex,1);

const newComments = [
 ...comments.slice(0,findCommentIndex),
 ...comments.slice(findCommentIndex+1)
]; 
```

`splice`会修改原数组，`slice`不会改变原数组的值。


## 源码下载

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

>社群品牌：[从零到壹全栈部落](http://www.kongyixueyuan.com)
>
>定位：寻找共好，共同学习，持续输出全栈技术社群
>
>业界荣誉：IT界的逻辑思维
>
>文化：输出是最好的学习方式
>
>官方公众号：全栈部落
>
>社群发起人：[春哥(从零到壹创始人，交流微信：liyc1215)](http://weibo.com/mobiledevelopment)
>
>技术交流社区：[全栈部落BBS](http://bbs.kongyixueyuan.com)
>
>全栈部落完整系列教程：[全栈部落完整电子书学习笔记](http://fullstack.kongyixueyuan.com)

|关注全栈部落官方公众号，每晚十点接收系列原创技术推送|
|:---------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo.png)|





