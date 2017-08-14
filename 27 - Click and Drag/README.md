# Day27 - Click and Drag

> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 27 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

[在线效果](http://30daysofjs.michaeleinsohn.com/scroll-drag/)

![](http://om1c35wrq.bkt.clouddn.com/day27.gif)

## UI实现

#### HTML 代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Click and Drag</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="items">
    <div class="item item1">01</div>
    <div class="item item2">02</div>
    <div class="item item3">03</div>
    <div class="item item4">04</div>
    <div class="item item5">05</div>
    <div class="item item6">06</div>
    <div class="item item7">07</div>
    <div class="item item8">08</div>
    <div class="item item9">09</div>
    <div class="item item10">10</div>
    <div class="item item11">11</div>
    <div class="item item12">12</div>
    <div class="item item13">13</div>
    <div class="item item14">14</div>
    <div class="item item15">15</div>
    <div class="item item16">16</div>
    <div class="item item17">17</div>
    <div class="item item18">18</div>
    <div class="item item19">19</div>
    <div class="item item20">20</div>
    <div class="item item21">21</div>
    <div class="item item22">22</div>
    <div class="item item23">23</div>
    <div class="item item24">24</div>
    <div class="item item25">25</div>
  </div>
</body>
</html>
```


#### CSS 代码

```css
html {
  box-sizing: border-box;
  background: url('https://source.unsplash.com/NFs6dRTBgaM/2000x2000') fixed;
  background-size: cover;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 20px;
  margin: 0;
}

.items {
  height: 800px;
  padding: 100px;
  width: 100%;
  border: 1px solid white;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s;
  transform: scale(0.98);
  will-change: transform;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0;
  perspective: 500px;
}

.items.active {
  background: rgba(255, 255, 255, 0.3);
  cursor: grabbing;
  cursor: -webkit-grabbing;
  transform: scale(1);
}

.item {
  width: 200px;
  height: calc(100% - 40px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  font-weight: 100;
  color: rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 0 0 10px rgba(0, 0, 0, 0.15);
}

.item:nth-child(9n+1) {
  background: dodgerblue;
}

.item:nth-child(9n+2) {
  background: goldenrod;
}

.item:nth-child(9n+3) {
  background: paleturquoise;
}

.item:nth-child(9n+4) {
  background: gold;
}

.item:nth-child(9n+5) {
  background: cadetblue;
}

.item:nth-child(9n+6) {
  background: tomato;
}

.item:nth-child(9n+7) {
  background: lightcoral;
}

.item:nth-child(9n+8) {
  background: darkslateblue;
}

.item:nth-child(9n+9) {
  background: rebeccapurple;
}

.item:nth-child(even) {
  transform: scaleX(1.31) rotateY(40deg);
}

.item:nth-child(odd) {
  transform: scaleX(1.31) rotateY(-40deg);
}
```

#### HTML + CSS 代码解析

- 每一个`div`就是一个`item`,在本案例中一共有25个`item`。

```html
<div class="item item1">01</div>
<div class="item item2">02</div>
<div class="item item3">03</div>
<div class="item item4">04</div>
<div class="item item5">05</div>
<div class="item item6">06</div>
<div class="item item7">07</div>
<div class="item item8">08</div>
<div class="item item9">09</div>
<div class="item item10">10</div>
<div class="item item11">11</div>
<div class="item item12">12</div>
<div class="item item13">13</div>
<div class="item item14">14</div>
<div class="item item15">15</div>
<div class="item item16">16</div>
<div class="item item17">17</div>
<div class="item item18">18</div>
<div class="item item19">19</div>
<div class="item item20">20</div>
<div class="item item21">21</div>
<div class="item item22">22</div>
<div class="item item23">23</div>
<div class="item item24">24</div>
<div class="item item25">25</div>
```

- 如果大家细心观察效果图，不难发现一个规律，`n` 和 `n + 9` 的 `item`的颜色相同，所以有如下的CSS代码：

```css
.item:nth-child(9n+1) {
  background: dodgerblue;
}

.item:nth-child(9n+2) {
  background: goldenrod;
}

.item:nth-child(9n+3) {
  background: paleturquoise;
}

.item:nth-child(9n+4) {
  background: gold;
}

.item:nth-child(9n+5) {
  background: cadetblue;
}

.item:nth-child(9n+6) {
  background: tomato;
}

.item:nth-child(9n+7) {
  background: lightcoral;
}

.item:nth-child(9n+8) {
  background: darkslateblue;
}

.item:nth-child(9n+9) {
  background: rebeccapurple;
}
```


- `item`的样式CSS

```css
.item {
  width: 200px;
  height: calc(100% - 40px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  font-weight: 100;
  color: rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 0 0 10px rgba(0, 0, 0, 0.15);
}
```


- 奇偶旋转样式

```css

<!--表示HTML表格中的偶数行。-->
.item:nth-child(even) {
  transform: scaleX(1.31) rotateY(40deg);
}

<!--表示HTML表格中的奇数行。-->
.item:nth-child(odd) {
  transform: scaleX(1.31) rotateY(-40deg);
}
```

## JS逻辑代码及注释

```js
<script>
<!--获取所有的`item`-->
  const slider = document.querySelector('.items');
  <!--声明几个变量用于处理接下来的逻辑-->
  let isDown = false;
  let startX;
  let scrollLeft;

<!--监听鼠标是否处于按下去的状态，如果是，调用后面的回调函数-->
  slider.addEventListener('mousedown', (e) => {
  <!--设置isDown为真-->
    isDown = true;
    <!--增加类active，改变当前item的样式-->
    slider.classList.add('active');
    <!--计算当前item的x坐标-->
    startX = e.pageX - slider.offsetLeft;
    <!--存储当前item的滚动出了左边窗口的值-->
    scrollLeft = slider.scrollLeft;
  });

<!--监听鼠标是否处于离开的的状态，如果是，调用后面的回调函数-->
  slider.addEventListener('mouseleave', () => {
  <!--设置isDown的值为false-->
    isDown = false;
    <!--将当前的item的样式恢复-->
    slider.classList.remove('active');
  });


<!--监听鼠标是否处于抬起来的状态，如果是，调用后面的回调函数-->
  slider.addEventListener('mouseup', () => {
    <!--设置isDown的值为false-->
    isDown = false;
    <!--将当前的item的样式恢复-->
    slider.classList.remove('active');
  });


<!--监听鼠标是否处于移动的状态，如果是，调用后面的回调函数-->
  slider.addEventListener('mousemove', (e) => {
  <!--如果没有isDown的值为false，直接返回-->
    if (!isDown) return;  // stop the fn from running
    <!--如果事件可取消，则取消该事件，而不停止事件的进一步传播。-->
    e.preventDefault();
    <!--改变当前item的scrollLeft值-->
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });

</script>
```


## 源码下载
[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)






