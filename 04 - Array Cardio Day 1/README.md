# Day04 - Array Cardio 指南一

> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 3 篇。完整指南在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 实现效果

这一部分主要是熟悉 Array 的几个基本方法，其中有两个（filter、map）是 ES6 定义的迭代方法，这些迭代方法都有一个特点，就是对数组的每一项都运行给定函数，根据使用的迭代方法的不同，有不同的返回结果。

文档给出了一个初始操作的 `inventor` 数组，基于这个数组可以练习一下`Array`的各个方法，请用`Google Chrome`浏览器打开 `HTML` 后在`Console`面板中查看输出结果。

## 炫酷的调试技巧

在 Console 中我们常用到的可能是 `console.log()` ，但它还有一个很炫的输出，按照表格来输出，效果如下：

```js
console.table(thing)
```

![console.table()](http://om1c35wrq.bkt.clouddn.com/day4-000.png)


## 原始数据

本节中我们将围绕如下数据进行相关操作以便快速掌握数组的相关方法的使用。

```js
    const inventors = [{
        first: 'Albert',
        last: 'Einstein',
        year: 1879,
        passed: 1955
      },
      {
        first: 'Isaac',
        last: 'Newton',
        year: 1643,
        passed: 1727
      },
      {
        first: 'Galileo',
        last: 'Galilei',
        year: 1564,
        passed: 1642
      },
      {
        first: 'Marie',
        last: 'Curie',
        year: 1867,
        passed: 1934
      },
      {
        first: 'Johannes',
        last: 'Kepler',
        year: 1571,
        passed: 1630
      },
      {
        first: 'Nicolaus',
        last: 'Copernicus',
        year: 1473,
        passed: 1543
      },
      {
        first: 'Max',
        last: 'Planck',
        year: 1858,
        passed: 1947
      },
      {
        first: 'Katherine',
        last: 'Blodgett',
        year: 1898,
        passed: 1979
      },
      {
        first: 'Ada',
        last: 'Lovelace',
        year: 1815,
        passed: 1852
      },
      {
        first: 'Sarah E.',
        last: 'Goode',
        year: 1855,
        passed: 1905
      },
      {
        first: 'Lise',
        last: 'Meitner',
        year: 1878,
        passed: 1968
      },
      {
        first: 'Hanna',
        last: 'Hammarström',
        year: 1829,
        passed: 1909
      }
    ];

    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry',
      'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert',
      'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester',
      'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano',
      'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle',
      'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose',
      'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black Elk', 'Blair, Robert',
      'Blair, Tony', 'Blake, William'
    ];
    
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car',
      'truck', 'pogostick'
    ];

```

## 筛选 16 世纪出生的发明家

[filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

过滤操作，有点像 SQL 里面的 select 语句。筛出运行结果是 true 的组成数组返回。

````js
const __fifteen = inventors.filter(function(inventor) {
  if (inventor.year >= 1500 && inventor.year < 1600 ) {
	  return true;
  } else {
      return false;
  }
});
console.table(__fifteen);
````	  

前面几篇已经提到过箭头函数，这里可以简化一下，用箭头函数来写，而且由于 if 语句的存在并不是必要的，可以写成下面这样：

````js
const fifteen = inventors.filter(inventor =>(inventor.year >= 1500 && inventor.year < 1600));
console.table(fifteen);
````

控制台效果图：

![](http://om1c35wrq.bkt.clouddn.com/day4-001.png)

  
## 展示他们的姓和名

[map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

map 形象的理解就是，把数组中的每个元素进行处理后，返回一个新的数组。

例子如下：

````js 
// Array.prototype.map()
// 2. 展示他们的姓和名
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.log(fullNames);
````
控制台效果图：

![](http://om1c35wrq.bkt.clouddn.com/day4-002.png)


## 把他们按照年龄从大到小进行排序

[sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

默认情况下，`Array.prototype.sort()` 会将数组以字符串的形式进行升序排列（10 会排在 2 之前），但 sort 也可以接受一个函数作为参数。所以需要对数字大小排序时需要自己设定一个比较函数，例子如下：

````js
// Array.prototype.sort()
// 3. 把他们按照年龄从大到小进行排序
const ordered = inventors.sort((a, b) => {
 if(a.year > b.year) {
   return 1;
 } else {
   return -1;
 }
});

console.table(ordered);
````

上面的代码可以简写成：

```js
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
console.table(ordered);
```

控制台效果图：

![](http://om1c35wrq.bkt.clouddn.com/day4-003.png)


## 计算所有的发明家加起来一共活了多少岁

[reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```js
// Array.prototype.reduce()
// 4. 计算所有的发明家加起来一共活了多少岁
<!--0为total的初始值-->
const totalYears = inventors.reduce((total, inventor) => {
 return total + (inventor.passed - inventor.year);
}, 0);

console.log(totalYears);
```

控制台效果图：
![](http://om1c35wrq.bkt.clouddn.com/day4-004.png)


## 按照他们活了多久来进行排序

```js
// 5. 按照他们活了多久来进行排序
const oldest = inventors.sort((a, b) => {
 const lastInventor = a.passed - a.year;
 const nextInventor = b.passed - b.year;
 return lastInventor > nextInventor ? -1 : 1;
});
console.table(oldest);
```

控制台效果图：

![](http://om1c35wrq.bkt.clouddn.com/day4-005.png)


## `map、filter`结合使用筛选出网页中含有`CSS`标题的数据名称



```js
const category = document.querySelectorAll('.subject-list h2 a');
const links = Array.from(category);
const CSS_BOOK = links
           .map(link => link.textContent)
           .filter(streetName => streetName.includes('CSS'));
```

由 `querySelectorAll()` 获取到的是一个 `NodeList` ，它并非是 Array 类型的数据，所以并不具有 map 和 filter 这样的方法，所以如果要进行筛选操作则需要把它转化成 Array 类型，使用下面示例之中的 `Array.from()` 来转化。

Google Chrome浏览球操作如下：

- 打开`https://book.douban.com/tag/web`网页。
- 在控制台按如下图操作即可

![](http://om1c35wrq.bkt.clouddn.com/day4-006.png)


## 按照姓氏来对发明家进行排序

```js
const alpha = people.sort((lastOne, nextOne) => {
 const [aLast, aFirst] = lastOne.split(', ');
 const [bLast, bFirst] = nextOne.split(', ');
 return aLast > bLast ? 1 : -1;
});
console.log(alpha);
```

控制台效果图：

![](http://om1c35wrq.bkt.clouddn.com/day4-007.png)


## 统计给出数组中各个物品的数量

[reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

这是一个归并数组的方法，它接受一个函数作为参数（这个函数可以理解成累加器），它会遍历数组的所有项，然后构建一个最终的返回值，这个值就是这个累加器的第一个参数。第二个参数中的`0`是`previousValue`的初始值，例子如下：

````js
[0,1,2,3,4].reduce((previousValue, currentValue, index, array) => {
  return previousValue + currentValue;
},0);
````

而此处我们需要统计一个给定数组中各个项的值，恰好可以用到这个方法，在累加器之中，将统计信息存入一个新的对象，最后返回统计值。

```js
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car',
      'truck', 'pogostick'
    ];

const transportation = data.reduce( (obj, item) => {
 if (!obj[item]) {
   obj[item] = 0;
 }
 obj[item]++;
 return obj;
}, {});

console.log(transportation);
```
![](http://om1c35wrq.bkt.clouddn.com/day4-008.png)


## 源码下载

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)


|扫码申请加入全栈部落|
|:---------------:|
|![](http://upload-images.jianshu.io/upload_images/75699-a5d38be84e4eac70.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)|

