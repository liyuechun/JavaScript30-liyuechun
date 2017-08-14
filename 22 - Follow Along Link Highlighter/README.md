# Day22 - 鼠标锚点动画生成指南


> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 22 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图


![](http://om1c35wrq.bkt.clouddn.com/day22-xiaoguotu.gif)

第22天的练习是一个动画练习，当鼠标移动到锚点处，会有一个白色的色块移动到当前锚点所在的位置。演示图如下所示：


## HTML源码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>👀👀👀Follow Along Nav</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <nav>
        <ul class="menu">
            <li><a href="">Home</a></li>
            <li><a href="">Order Status</a></li>
            <li><a href="">Tweets</a></li>
            <li><a href="">Read Our History</a></li>
            <li><a href="">Contact Us</a></li>
        </ul>
    </nav>

    <div class="wrapper">
        <p>Lorem ipsum dolor sit amet, <a href="">consectetur</a> adipisicing elit. Est <a href="">explicabo</a> unde natus
            necessitatibus esse obcaecati distinctio, aut itaque, qui vitae!</p>
        <p>Aspernatur sapiente quae sint <a href="">soluta</a> modi, atque praesentium laborum pariatur earum <a href="">quaerat</a>            cupiditate consequuntur facilis ullam dignissimos, aperiam quam veniam.</p>
        <p>Cum ipsam quod, incidunt sit ex <a href="">tempore</a> placeat maxime <a href="">corrupti</a> possimus <a href="">veritatis</a>            ipsum fugit recusandae est doloremque? Hic, <a href="">quibusdam</a>, nulla.</p>
        <p>Esse quibusdam, ad, ducimus cupiditate <a href="">nulla</a>, quae magni odit <a href="">totam</a> ut consequatur
            eveniet sunt quam provident sapiente dicta neque quod.</p>
        <p>Aliquam <a href="">dicta</a> sequi culpa fugiat <a href="">consequuntur</a> pariatur optio ad minima, maxime <a href="">odio</a>,
            distinctio magni impedit tempore enim repellendus <a href="">repudiandae</a> quas!</p>
    </div>

</body>

</html>
```

## CSS源码

```css
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  min-height: 100vh;
  margin: 0;
  /* Important! */
  font-family: sans-serif;
  background: linear-gradient(45deg, hsla(340, 100%, 55%, 1) 0%, hsla(340, 100%, 55%, 0) 70%), linear-gradient(135deg, hsla(225, 95%, 50%, 1) 10%, hsla(225, 95%, 50%, 0) 80%), linear-gradient(225deg, hsla(140, 90%, 50%, 1) 10%, hsla(140, 90%, 50%, 0) 80%), linear-gradient(315deg, hsla(35, 95%, 55%, 1) 100%, hsla(35, 95%, 55%, 0) 70%);
}

.wrapper {
  margin: 0 auto;
  max-width: 500px;
  font-size: 20px;
  line-height: 2;
  position: relative;
}

a {
  text-decoration: none;
  color: black;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 20px
}

.highlight {
  transition: all 0.2s;
  border-bottom: 2px solid white;
  position: absolute;
  top: 0;
  background: white;
  left: 0;
  z-index: -1;
  border-radius: 20px;
  display: block;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
}

.menu {
  padding: 0;
  display: flex;
  list-style: none;
  justify-content: center;
  margin: 100px 0;
}

.menu a {
  display: inline-block;
  padding: 5px;
  margin: 0 20px;
  color: black;
}
```

## JS源码

```js
<script>
   const triggers = document.querySelectorAll('a');
   const highlight = document.createElement('span');
   highlight.classList.add('highlight');
   document.body.appendChild(highlight);

   function highlightLink() {
       const linkCoords = this.getBoundingClientRect();
       // console.log(linkCoords);
       const coords = {
           width: linkCoords.width,
           height: linkCoords.height,
           top: linkCoords.top + window.scrollY,
           left: linkCoords.left + window.scrollX
       };

       highlight.style.width = `${coords.width}px`;
       highlight.style.height = `${coords.height}px`;
       highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

   }

   triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
</script>
```

## 代码解释

- 通过HTML源码我们不难发现，所有锚点都是由`a`标签组成，所以在`js`代码中我们首先先获取所有的`a`标签对象，将其存储到`triggers`变量中。

```js
const triggers = document.querySelectorAll('a');
```

- 在效果图中高亮状态的小块其实就是一个`span`标签，在JS代码中创建了一个`span`标签，并且为其添加了一个`highlight`的`class`。

```js
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);
```

- 对所有的`a`标签进行事件监听，当鼠标移动到锚点时，会自动触发`highlightLink`方法。

```js
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
```

- `getBoundingClientRect()`

[getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

`Element.getBoundingClientRect()`方法返回元素的大小及其相对于视口的位置。

**语法：**

```js
rectObject = object.getBoundingClientRect();
```

**值：**
返回值是一个 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect) 对象，这个对象是由该元素的 [getClientRects()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects) 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。

**DOMRect属性表：**

|属性|类型|描述|
|:-----------|:-----------:|:-----------|
|bottom|float|Y 轴，相对于视口原点（viewport origin）矩形盒子的底部。**只读**。 |
|height|float|矩形盒子的高度（等同于 bottom 减 top）。**只读**。|
|left|float|X 轴，相对于视口原点（viewport origin）矩形盒子的左侧。**只读**。 |
|right|float|X 轴，相对于视口原点（viewport origin）矩形盒子的右侧。**只读**。 |
|top|float|Y 轴，相对于视口原点（viewport origin）矩形盒子的顶部。**只读**。|
|width|float|矩形盒子的宽度（等同于 right 减 left）。**只读**。 |
|x|float|X轴横坐标，矩形盒子左边相对于视口原点（viewport origin）的距离。**只读**。|
|y|float|Y轴纵坐标，矩形盒子顶部相对于视口原点（viewport origin）的距离。**只读**。|


`DOMRect` 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。

![](http://om1c35wrq.bkt.clouddn.com/day22-rect.png)

空边框盒（译者注：没有内容的边框）会被忽略。如果所有的元素边框都是空边框，那么这个矩形给该元素返回的 width、height 值为0，left、top值为第一个css盒子（按内容顺序）的top-left值。

当计算边界矩形时，会考虑视口区域（或其他可滚动元素）内的滚动操作，也就是说，当滚动位置发生了改变，top和left属性值就会随之立即发生变化（因此，它们的值是相对于视口的，而不是绝对的）。如果不希望属性值随视口变化，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY），这样就可以获取与当前的滚动位置无关的常量值。

- `highlightLink`方法

```js
function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  // console.log(linkCoords);
  <!--`coords`计算坐标，宽和高。-->
  const coords = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
  };

<!--高亮状态的span标签的样式设置-->
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

}
```

完结！

## 源码下载
[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)


