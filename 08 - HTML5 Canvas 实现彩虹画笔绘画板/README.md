# Day08 - HTML5 Canvas 实现彩虹画笔绘画板指南

> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 8 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

## 项目效果

![](http://om1c35wrq.bkt.clouddn.com/day8-1.gif)

用 HTML5 中的 Canvas 的路径绘制实现一个绘画板，可供鼠标画画，颜色呈彩虹色渐变，画笔大小同样呈渐变效果。这部分不涉及 CSS 内容，全部由 JS 来实现。


## 涉及特性

Canvas：

- 模板骨架
- 基本属性
	- `getContext()`
	- `strokeStyle`
	- `fillStyle`
	- `fillRect`
	- `lineCap`
	- `lineJoin`
- 路径绘制
	- `beginPath()`
	- `lineTo()`
	- `moveTo()`
	
鼠标事件处理：

- `mousemove`
- `mousedown`
- `mouseup`
- `mouseout`

## 过程指南

1. 获取 HTML 中的 `<canvas>` 元素，并设定宽度和高度
2. `.getContext('2d')` 获取上下文，下面以 ctx 表示
3. 设定 ctx 基本属性
	- 描边和线条颜色
	- 线条宽度
	- 线条末端形状
4. 绘画效果
	1. 设定一个用于标记绘画状态的变量
	2. 鼠标事件监听，不同类型的事件将标记变量设为不同值
	3. 编写发生绘制时触发的函数，设定绘制路径起点、终点
5. 线条彩虹渐变效果（运用 hsl 的 `h` 值的变化，累加）
6. 线条粗细渐变效果（设定一个范围，当超出这个范围时，线条粗细进行逆向改变



## Canvas相关知识

[Canvas_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

### HelloWorld简单介绍

#### 一、 模板骨架

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>HTML5 Canvas 实现彩虹画笔绘画板</title>
  <script type="text/javascript">
    function draw() {
      var canvas = document.getElementById('tutorial');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
      }
    }
  </script>
  <style type="text/css">
    canvas {
      border: 1px solid black;
    }
  </style>
</head>

<body>
  <canvas id="tutorial" width="150" height="150"></canvas>
</body>

</html>
```

- canvas> 元素

```js
<canvas id="tutorial" width="150" height="150"></canvas>
```

`canvas` 看起来和 `img` 元素很相像，唯一的不同就是它并没有 `src` 和`alt` 属性。实际上，`canvas` 标签只有两个属性——`width`和`height`。这些都是可选的，并且同样利用 `DOM properties` 来设置。当没有设置宽度和高度的时候，`canvas`会初始化宽度为`300`像素和高度为`150`像素。该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。


- 渲染上下文（The rendering context）

```js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```

`canvas`元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

`canvas`起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`canvas`元素有一个叫做 `getContext()` 的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()`只有一个参数，上下文的格式。对于2D图像而言，基本教程，你可以使用[CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

- 检查支持性

替换内容是用于在不支持 `canvas` 标签的浏览器中展示的。通过简单的测试`getContext()`方法的存在，脚本可以检查编程支持性。

```js
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
    //支持
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
   //不支持
  // canvas-unsupported code here
}
```

#### 二、一个简单例子

一开始，让我们来看个简单的例子，我们绘制了两个有趣的长方形，其中的一个有着alpha透明度。我们将在接下来的例子里深入探索一下这是如何工作的。

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>HTML5 Canvas 实现彩虹画笔绘画板</title>
  <script type="text/javascript">
    function draw() {
      var canvas = document.getElementById('tutorial');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
      }
    }
  </script>
  <style type="text/css">
    canvas {
      border: 1px solid black;
    }
  </style>
</head>

<body onload="draw();">
  <canvas id="tutorial" width="300" height="300"></canvas>
</body>

</html>
```

效果图：

![](http://om1c35wrq.bkt.clouddn.com/day8-2.png)


## 项目源码分析

### 源码

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>HTML5 Canvas</title>
  <style>
    html,
    body {
      margin: 0;
      overflow: hidden;
    }

    canvas {
      overflow: hidden;
    }
  </style>
</head>

<body>
  <canvas id="draw" width="800" height="800" style="overflow:auto;"></canvas>
  <script>

    // 1.获取canvas节点
    const canvas = document.querySelector('#draw');

    if (canvas.getContext) {
      //支持
      var ctx = canvas.getContext('2d');
      // drawing code here
    } else {
      //不支持
      // canvas-unsupported code here
      console.log("canvas-unsupported code here");
    }

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    ctx.lineWidth = 90;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#f00";
    ctx.fillStyle = "#f00";

    let hue = 0;
    let direction = true;
    let x = 0;
    let y = 0;

    function draw(e) {
      if (!isDrawing) return;


      x = e.offsetX;
      y = e.offsetY;


      //		彩虹效
      ctx.strokeStyle = `hsl(${ hue }, 90%, 50%)`;
      if (hue >= 360) hue = 0;
      hue++;


      //		控制笔触大小
      if (ctx.lineWidth > 120 || ctx.lineWidth < 10) {
        direction = !direction;
      }
      if (direction) {
        ctx.lineWidth++;
      } else {
        ctx.lineWidth--;
      }

      //		控制绘制路径
      ctx.beginPath();

      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      [lastX, lastY] = [x, y];

    }
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
  </script>

</body>

</html>
```

### 源码分析

[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

#### canvas宽高设置

```js
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```



#### 属性

- `lineCap`：笔触的形状，有 round | butt | square 圆、平、方三种。
- `lineJoin`：线条相交的样式，有 round | bevel | miter 圆交、斜交、斜接三种。
- `lineWidth`：线条的宽度
- `strokeStyle`：线条描边的颜色
- `fillStyle`：填充的颜色

#### 方法

- `beginPath()`：新建一条路径
- `stroke()`：绘制轮廓
- `moveTo()`：（此次）绘制操作的起点
- `lineTo()`：路径的终点

### 彩虹渐变颜色——HSL  

在这个挑战中，涉及到改变线条的颜色，如何实现彩虹的渐变效果？我们需要利用 HSL 色彩模式，首先可以去这个网站 [http://mothereffinghsl.com](http://mothereffinghsl.com/) 感受一下 HSL 不同色彩值对应的效果。
- H(hue) 代表色调，取值为 0~360，专业术语叫色相
- S 是饱和度，可以理解为掺杂进去的灰度值，取值为 0~1
- L 则是亮度，取值也是 0~1，或者百分比。
	
这之中 H 值从 0 到 360 的变化代表了色相的角度的值域变化，利用这一点就可以实现绘制时线条颜色的渐变了，只需要在它的值超过 360 时恢复到 0 重新累加即可。

```js
let hue = 0;

ctx.strokeStyle = `hsl(${ hue }, 100%, 50%)`;	
if(hue >= 360) hue = 0;
hue++;
```

除此之外，如果想实现黑白水墨的颜色，可以将颜色设置为黑色，通过透明度的改变来实现深浅不一的颜色。



### 控制笔触大小

```js
 //		控制笔触大小
 if (ctx.lineWidth > 120 || ctx.lineWidth < 10) {
   direction = !direction;
 }
 if (direction) {
   ctx.lineWidth++;
 } else {
   ctx.lineWidth--;
 }
```

上面的代码中，根据线条的宽度的变化来控制`direction`的值，根据`direction`的值来控制线宽是增加还是减少。


### 控制线条路径

```js
 //		控制绘制路径
 ctx.beginPath();

 ctx.moveTo(lastX, lastY);
 ctx.lineTo(x, y);
 ctx.stroke();

// 坐标重置
 [lastX, lastY] = [x, y];
```

### 事件监听代码逻辑分析

```js
canvas.addEventListener('mousedown', (e) => {
<!--开始绘图-->
 isDrawing = true;
 <!--绘图起始坐标初始化-->
 [lastX, lastY] = [e.offsetX, e.offsetY];
});

<!--鼠标移动时，调用draw方法-->
canvas.addEventListener('mousemove', draw);
<!--鼠标抬起时，将isDrawing置为false-->
canvas.addEventListener('mouseup', () => isDrawing = false);
<!--当鼠标不在可绘图区域范围内时，将isDrawing置为fals-->
canvas.addEventListener('mouseout', () => isDrawing = false);
```

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

