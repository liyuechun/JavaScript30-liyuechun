# Day18 - Reduce、Map混合使用计算时分秒

> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment) 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 18 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

![](http://om1c35wrq.bkt.clouddn.com/day18%E6%95%88%E6%9E%9C%E5%9B%BE.png)

第18天挑战的内容主要是如何将一系列的`data-time`加起来，最终计算总时间，总时间用时分秒显示。


## HTML、CSS代码

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Adding Up Times with Reduce</title>
</head>

<body>
  <ul class="videos">
    <li data-time="5:43">
      Video 1
    </li>
    <li data-time="2:33">
      Video 2
    </li>
    <li data-time="3:45">
      Video 3
    </li>
    <li data-time="0:47">
      Video 4
    </li>
    <li data-time="5:21">
      Video 5
    </li>
    <li data-time="6:56">
      Video 6
    </li>
    <li data-time="3:46">
      Video 7
    </li>
    <li data-time="5:25">
      Video 8
    </li>
    <li data-time="3:14">
      Video 9
    </li>
    <li data-time="3:31">
      Video 10
    </li>
    <li data-time="5:59">
      Video 11
    </li>
    <li data-time="3:07">
      Video 12
    </li>
    <li data-time="11:29">
      Video 13
    </li>
    <li data-time="8:57">
      Video 14
    </li>
    <li data-time="5:49">
      Video 15
    </li>
    <li data-time="5:52">
      Video 16
    </li>
    <li data-time="5:50">
      Video 17
    </li>
    <li data-time="9:13">
      Video 18
    </li>
    <li data-time="11:51">
      Video 19
    </li>
    <li data-time="7:58">
      Video 20
    </li>
    <li data-time="4:40">
      Video 21
    </li>
    <li data-time="4:45">
      Video 22
    </li>
    <li data-time="6:46">
      Video 23
    </li>
    <li data-time="7:24">
      Video 24
    </li>
    <li data-time="7:12">
      Video 25
    </li>
    <li data-time="5:23">
      Video 26
    </li>
    <li data-time="3:34">
      Video 27
    </li>
    <li data-time="8:22">
      Video 28
    </li>
    <li data-time="5:17">
      Video 29
    </li>
    <li data-time="3:10">
      Video 30
    </li>
    <li data-time="4:43">
      Video 31
    </li>
    <li data-time="19:43">
      Video 32
    </li>
    <li data-time="0:47">
      Video 33
    </li>
    <li data-time="0:47">
      Video 34
    </li>
    <li data-time="3:14">
      Video 35
    </li>
    <li data-time="3:59">
      Video 36
    </li>
    <li data-time="2:43">
      Video 37
    </li>
    <li data-time="4:17">
      Video 38
    </li>
    <li data-time="6:56">
      Video 39
    </li>
    <li data-time="3:05">
      Video 40
    </li>
    <li data-time="2:06">
      Video 41
    </li>
    <li data-time="1:59">
      Video 42
    </li>
    <li data-time="1:49">
      Video 43
    </li>
    <li data-time="3:36">
      Video 44
    </li>
    <li data-time="7:10">
      Video 45
    </li>
    <li data-time="3:44">
      Video 46
    </li>
    <li data-time="3:44">
      Video 47
    </li>
    <li data-time="4:36">
      Video 48
    </li>
    <li data-time="3:16">
      Video 49
    </li>
    <li data-time="1:10">
      Video 50
    </li>
    <li data-time="6:10">
      Video 51
    </li>
    <li data-time="2:14">
      Video 52
    </li>
    <li data-time="3:44">
      Video 53
    </li>
    <li data-time="5:05">
      Video 54
    </li>
    <li data-time="6:03">
      Video 55
    </li>
    <li data-time="12:39">
      Video 56
    </li>
    <li data-time="1:56">
      Video 57
    </li>
    <li data-time="4:04">
      Video 58
    </li>
  </ul>
</body>
</html>
```


## JS代码

#### 方法一


```js
//获取整个 li NodeList
let items = document.querySelectorAll('ul li');
//创建一个空数组，存储所有data-time字符串
let itemtimearray = [];
//通过for循环将每个li中的data.time添加到 itemtimearray 数组中
for (let item of items) {
 itemtimearray.push(item.dataset.time);
}

//遍历itemtimearray数组，返回一个新的数组
let spiltitmes = itemtimearray.map(item => {
//通过 : 将字符串拆分成数组 
 let temp = item.split(':');
 //返回对象包涵分和秒的对象
 return {
   min: temp[0],
   sencond: temp[1]
 }
});

//初始化分和秒
let totalMin = 0;
let totalSec = 0;
//通过reduce函数将spiltitmes数组中所有的min叠加并存储到totalMin中
totalMin = spiltitmes.reduce((total, time) => {
 return total += parseInt(time.min);
}, 0);
//通过reduce函数将spiltitmes数组中所有的sencond叠加并存储到totalSec中
totalSec = spiltitmes.reduce((total, time) => {
 return total += parseInt(time.sencond);
}, 0);
//求余计算秒
let finalSecond = parseInt(totalSec % 60);
//计算一共多少分钟
let finalMin = parseInt(totalMin + (totalSec / 60)) % 60;
//计算一共多少小时
let finalHour = parseInt((totalMin + (totalSec / 60)) / 60);
//输出时分秒
console.log(`共${finalHour}小时,${finalMin}分钟,${finalSecond}秒。`);
```




#### 方法二

```js
// 1. [...items] => 将其展开为数组
// 2. Array.from(items) => 使用Array.from()将items转换为数组 
// 获取所有节点
// 3. const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
// 4. parseFloat:
// [].map(parseFloat) => [].map(function(x) {retunr parseFloat(x)});


// 获取所有的带有data-time属性的节点
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));


const seconds = timeNodes
//返回一个包涵所有data-time值的数组
 .map(node => node.dataset.time)
 //返回一个将data-time解析成秒的数组
 .map(timeCode => {
   //timeCode为 1:43 这样格式的字符串
   //timeCode.split(':') 返回一个新数组，数组里面装的是分和秒的时间
   //[].map(parseFloat) => [].map(function(x) {retunr parseFloat(x)});
   const [mins, secs] = timeCode.split(':').map(parseFloat);
   //将分乘以60+秒，计算所有的秒，并返回
   return (mins * 60) + secs;
 })
 //将数组中的所有的秒叠加并返回
 .reduce((total, vidSeconds) => total + vidSeconds);

//通过求余取整计算时分秒
let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
//打印输出
console.log(hours, mins, secondsLeft);
```

完结：所有代码解释在代码注释中。



## 源码下载

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

|全栈部落|区块链部落|
|:---------:|:------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo100.jpeg)|![](http://orhm8wuhd.bkt.clouddn.com/qukuailian100.jpg)|





