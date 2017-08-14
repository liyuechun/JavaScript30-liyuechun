



# Day26 - Stripe Follow Along Nav

> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 26 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

![](http://om1c35wrq.bkt.clouddn.com/day25.gif)

## 源码

```javascript
// javascript
const nav = document.querySelector('.top');
const menu = document.querySelectorAll('ul.cool > li');
const background = document.querySelector('.dropdownBackground');

function mouseEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  background.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
  const coords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    left: dropdownCoords.left - navCoords.left,
    top: dropdownCoords.top - navCoords.top
  };
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate3D(${coords.left}px,${coords.top}px,0)`);
  // background.style.setProperty('top', `${coords.top}px`);
  // background.style.setProperty('left', `${coords.left}px`);
}

function mouseLeave() {
  this.classList.remove('trigger-enter','trigger-enter-active');
  // this.classList.remove('trigger-enter');
  // this.classList.remove('');
  background.classList.remove('open');
}
menu.forEach(ele => ele.addEventListener('mouseenter', mouseEnter));
menu.forEach(ele => ele.addEventListener('mouseleave', mouseLeave));
```

```css
<!-- 部分CSS -->
.dropdown {
  opacity: 0;
  position: absolute;
  overflow: hidden;
  padding: 20px;
  top: -20px;
  border-radius: 2px;
  transition: all 0.5s;
  transform: translateY(100px);
  will-change: opacity;
  display: none;
}

.trigger-enter .dropdown {
  display: block;
}

.trigger-enter-active .dropdown {
  opacity: 1;
}

.dropdownBackground {
  width: 100px;
  height: 100px;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, .1), 0 15px 35px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, .1);
  transition: all 0.3s, opacity 0.1s, transform 0.2s;
  transform-origin: 50% 0;
  display: flex;
  justify-content: center;
  opacity: 0;
}

.dropdownBackground.open {
  opacity: 1;
}
```

## 代码解析

- 鼠标进入监听

```js
menu.forEach(ele => ele.addEventListener('mouseenter', mouseEnter));
```

- 鼠标移除监听

```js
menu.forEach(ele => ele.addEventListener('mouseleave', mouseLeave));
```

- 过渡动画的实现原理

当鼠标移动到某一个选项后，首先使下拉菜单显示，但是在150ms内使其显示出来，这里用了`settimeout(fn,150)`，来延迟添加下拉菜单的`trigger-enter-active`类名，这样就会有一个过渡的效果了。


- 鼠标进入时添加类名


```
this.classList.add('trigger-enter');
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
background.classList.add('open');
```

这里有一点需要注意，因为我们设置了150ms延迟之后添加`trigger-enter-active`类，那么有可能会发生这样的情况：当我们以飞快的速度在各个选项之间切换的时候，有可能还没有到150ms鼠标就已经移出了选项了，这时在150ms之后，就会多添加了`trigger-enter-active`类在每一个选项里面，造成意想不到的错误。
因此我们加了一句判断，150ms后只有当该鼠标还悬停在这个选项之中的时候，我们才添加`trigger-enter-active`类。

- 动态的设置白色背景块的位置信息


```
const coords = {
	width: dropdownCoords.width,
	height: dropdownCoords.height,
	left: dropdownCoords.left - navCoords.left,
	top: dropdownCoords.top - navCoords.top
};
background.style.setProperty('width', `${coords.width}px`);
background.style.setProperty('height', `${coords.height}px`);
background.style.setProperty('transform', `translate3D(${coords.left}px,${coords.top}px,0)`);
// background.style.setProperty('top', `${coords.top}px`);
// background.style.setProperty('left', `${coords.left}px`);
```

这里有一点需要注意的是，我们在为白色背景块设置左边距和上边距的时候，要分别减去导航栏的上边距和左边距。因为我们的导航栏上面可能会有其他的内容，若不将这段距离减去，就会造成白色背景块位置偏移。

`translate3D(x,y,z)`这里之所以使用`translate3D`，是因为`translate3D`属性会触发硬件加速，开启了硬件加速的`transform`是不会触发界面`repaint`的，拥有更好的性能。


## 源码下载
[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

