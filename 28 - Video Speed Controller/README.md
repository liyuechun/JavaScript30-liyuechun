# Day28 - Video Speed Controller

> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 28 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

[在线效果](http://30daysofjs.michaeleinsohn.com/video-speed/)

![](http://om1c35wrq.bkt.clouddn.com/day28-xiaoguotu.gif)

第28天的挑战主要是拖拽右边的进度条来设置当前视频的播放速率。

## HTML 源码


```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Video Speed Scrubber</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <div class="wrapper">
    <video class="flex" width="765" height="430" src="https://www.dropbox.com/s/nf6jfkwck1glsyo/12%20-%20flex-wrapping-and-columns.mp4?dl=1"
      loop controls></video>
    <div class="speed">
      <div class="speed-bar">1×</div>
    </div>
  </div>
</body>

</html>
```

由上面的代码不难看出，UI由左边的一个video和右边的一个div组成。

## CSS 代码

```css
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #4C4C4C url('https://unsplash.it/1500/900?image=1021');
  background-size: cover;
  font-family: sans-serif;
}

.wrapper {
  width: 850px;
  display: flex;
}

video {
  box-shadow: 0 0 1px 3px rgba(0, 0, 0, 0.1);
}

.speed {
  background: #efefef;
  flex: 1;
  display: flex;
  align-items: flex-start;
  margin: 10px;
  border-radius: 50px;
  box-shadow: 0 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.speed-bar {
  width: 100%;
  background: linear-gradient(-170deg, #2376ae 0%, #c16ecf 100%);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  color: white;
  height: 16.3%;
}
```

## JS 源码

```js
<script>
  const speed = document.querySelector('.speed');
  const bar = speed.querySelector('.speed-bar');
  const video = document.querySelector('.flex');

  function handleMove(e) {
      const y = e.pageY - this.offsetTop;
      const percent = y / this.offsetHeight;
      const min = 0.4;
      const max = 4;
      const height = Math.round(percent * 100) + '%';
      const playbackRate = percent * (max - min) + min;
      bar.style.height = height;
      bar.textContent = playbackRate.toFixed(2) + '×';
      video.playbackRate = playbackRate;
    }

  speed.addEventListener('mousemove', handleMove);

</script>
```

**代码逻辑：**

- 获取组建

```js
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');
```


- 监听`speed`控件，鼠标是否处于移动状态，如果在移动，调用`handleMove`函数。

```js
speed.addEventListener('mousemove', handleMove);
```

- 改变`speed`的状态，以及及时更新`video`的`playbackRate`属性以改变播放速率

```js
function handleMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + '%';
    const playbackRate = percent * (max - min) + min;
    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
}
```

## 源码下载
[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

