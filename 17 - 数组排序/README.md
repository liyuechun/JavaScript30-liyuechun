# Day17 - Sort Without Articles

> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment) 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 17 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

![效果图](http://om1c35wrq.bkt.clouddn.com/day17%E6%95%88%E6%9E%9C%E5%9B%BE.png)

今天的挑战是对数组进行排序。将乐队按照乐曲名称进行排序，曲名前面的`a/an/the`的单词不参与排序。

## 源码

```js
  <script>
    const bandsele = document.querySelector('#bands');
    // 取消每一个字符串的开头的a|an|the
    function strip(str) {
      return str.replace(/^(a |an |the )/ig, '').trim();
    }

    const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled',
      'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive',
      'Anywhere But Here', 'An Old Dog'
    ];

    // 获取到已经排过序的数组
    const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
    bandsele.innerHTML =
      sortedBands
      .map(band => `<li>${band}</li>`)
      .join('');
  </script>
```

## 正则表达式

`/^(a |an |the )/ig` `^`代表以什么什么开头，`^(a |an |the )`代表以`a `或者`an `或者`the `开头，`i`代表不区分大小写，`g`代表整个字符串全局搜索。

## replace

[replace→参考文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

replace() 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是`一个字符串`或者`一个正则表达式`, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。

replace() 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。

##### 语法

>str.replace(regexp|substr, newSubStr|function)


**参数:**

- regexp (pattern)
一个 RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
- substr (pattern)
一个要被 newSubStr 替换的字符串。其被视为一整个字符串，而不是一个正则表达式。仅仅是第一个匹配会被替换。
- newSubStr (replacement)
 用于替换掉第一个参数在原字符串中的匹配部分的 字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。
- function (replacement)
一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。
返回值
一个部分或全部匹配由替代模式所取代的新的字符串。



`str.replace(/^(a |an |the )/ig, '').trim();` 代表如果字符串前面包涵`a `或者`an `或者`the `中的一个，将其替换成`''`,`trim()`代表将新字符串两边的空格去掉。

##### 示例


- 在 replace() 中使用正则表达式

在下面的例子中，replace() 中使用了正则表达式及忽略大小写标示。

```js
var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);  // Twas the night before Christmas...
```

- 在 replace() 中使用 global 和 ignore 选项

下面的例子中,正则表达式包含有全局替换(g)和忽略大小写(i)的选项,这使得replace方法用'oranges'替换掉了所有出现的"apples".

```js
var re = /apples/gi;
var str = "Apples are round, and apples are juicy.";
var newstr = str.replace(re, "oranges");

// oranges are round, and oranges are juicy.
console.log(newstr);
```

## sort()

 `Array.prototype.sort()`：对产生的新的乐队名称进行排序，可以自定义一个__排序函数__，规定该排序函数的比较规则。
[sort() -> 参考文档](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)


|全栈部落|区块链部落|
|:---------:|:------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo100.jpeg)|![](http://orhm8wuhd.bkt.clouddn.com/qukuailian100.jpg)|

