# Day11 - 自定义视频播放器


> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 10 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

## 项目效果

![](http://om1c35wrq.bkt.clouddn.com/day11-0.gif)

第十一天是要做一个自定义的视频播放器，在具有基本样式的前提下，实现视频的播放，暂停，进度条拖拽，音量加减，播放速度加减，快进快退的功能。

## 实现思路

1. 首先需要分别将变量绑定至页面上的元素
2. 分别实现播放，暂停，声音加减，播放速度加减，拖拽快进，点击快进等函数
3. 事件绑定，将页面元素绑定相应触发事件

## 变量绑定

HTML 元素中，`video` 标签是我们的视频，而下面的 `player__controls` 就是我们自己的控制面板

```html
<div class="player">
    <video class="player__video viewer" src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"></video>
    
    <div class="player__controls">
      <div class="progress">
       <div class="progress__filled"></div>
      </div>
      <button class="player__button toggle" title="Toggle Play">►</button>
      <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
      <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
      <button data-skip="-10" class="player__button">« 10s</button>
      <button data-skip="25" class="player__button">25s »</button>
    </div>
</div>
```

开始之前我们先把所有需要用到的元素节点先取到：

```javascript
/* 获取元素  */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

## 事件监听

```javascript
<!--点击播放-->
video.addEventListener('click',videoplay);
<!--点击或者播放时改变播放和暂停状态的图标-->
// video.addEventListener('click',handleToggle);
video.addEventListener('play',handleToggle);
<!--暂停时改变图标状态-->
video.addEventListener('pause',handleToggle);
<!--时间轴更新-->
video.addEventListener('timeupdate',filledUpdate);

<!--点击播放或者暂停的图标事件的监听-->
toggle.addEventListener('click',videoplay);
toggle.addEventListener('click',handleToggle);

<!--音量和播放速度滑动条事件监听-->
let mouseflag = false;
player__slider.forEach(item => item.addEventListener('click',handlePlayerSlider));
player__slider.forEach(item => item.addEventListener('mousedown',() => mouseflag = true));
player__slider.forEach(item => item.addEventListener('mouseup',() => mouseflag = false));
player__slider.forEach(item => item.addEventListener('mousemove',(e) => mouseflag && handlePlayerSlider(e)));

<!--快进按钮事件监听-->
skip.forEach(item => item.addEventListener('click',handleSkip));


<!--播放事件轴拖拽监听-->
let filledflag = false;
progressBar.addEventListener('click',handlefilled);
progressBar.addEventListener('mousemove',(e) => filledflag && handlefilled(e));
progressBar.addEventListener('mousedown',() => filledflag = true);
progressBar.addEventListener('mouseup',() => filledflag = false);
```

分别给页面元素建立事件监听，并绑定其实现函数即可。此处有两处需注意:

1. 有实现进度条的点击拖拽，不能仅绑定`mousemove`事件，因为这样鼠标在上面滑过就会出发事件，还需判断鼠标是否点下，此处可设立一个布尔类型的`flag`标志鼠标是否按下，并分别绑定`mouseup`事件和`mousedown`事件，设置此`flag`的值，这样在`mousemove`事件的回调函数中先判断此`flag`的值，若为真是才继续触发事件。
2. `mousemove`的回调函数本应如下:


```javascript
{
    if(filledflag){
        handlefilled(e);
    }
｝
```
但这样不够简洁，我们改进此代码如下：

```
filledflag && handlefilled(e)
```
使用`&&`判断左右两变量，只有两个都为真的时候整体表达式才为真，且在判断时从左向右依次判断，若左变量就为假，就不会再去执行右边的表达式。

## 函数实现

* 视频播放与暂停转换函数

```Javascript
function videoplay(e){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
```
判断当前视频的播放状态，播放时则变为暂停状态、暂停则变为播放状态；分别调用`video.play()`和`video.pause()`方法，在此使用`video[play]()`和`video[pause]()`是因为，使用中括号能够动态的传递变量进去，而使用点运算符不能传参。

* 播放按钮状态显示函数


```Javascript
function handleToggle(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
```
如果视频是暂停状态就显示播放键'►'，否则显示暂定键'❚❚'

* 音量大小和播放速度控制函数


```Javascript
function handlePlayerSlider(e){
    video[e.target.name] = e.target.value;
}
```
在页面HTML中是这样设置的：


```HTML
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```
分别给每一个范围设置了一个`name`属性，代表该范围所表示的内容，同时也是需控制的方法名，因此我们通过设置`video[e.target.name] = e.target.value;`就可以分别改变视频的音量和播放速度，此处`e.target`就是这两个`input`元素，也等同于`this`。

* 快进快退函数

```Javascript
function handleSkip(e){
    let skiptime = parseFloat(this.dataset.skip);
    video.currentTime += skiptime;
}
```
页面中快进快退的HTML代码如下:


```HTML
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```
分别设置了`data-skip`属性，这样就可以通过`.dataset.skip`获取到该属性的值，也即`this.dataset.skip`，但该值是字符串类型，需要用`parseFloat()`讲其转换为float数值型，分别将时间加减当前视频的播放事件就可以做到快进快退。

* 进度条随播放时间而显示的函数


```Javascript
function filledUpdate(){
    let portion = parseFloat(video.currentTime / video.duration) * 100;
    filled.style.flexBasis = `${portion}%`;
}
```
通过视频当前的播放时间除以视频的总时长*100，就是当前视频播放的百分比，将该值使用模版字符串的方式传给`flexBasis`样式中即可，在CSS中该样式名为`flex-basis`,但是谨记在js中需要多单词的CSS属性需要变为驼峰式的命名，第二个单词大写，切不可用连字符连接。

* 拖拽进度条定点观看的函数


```Javascript
function handlefilled(e){    
    let pice = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = pice;
}
```

我们需要点击进度条时调整播放进度，那么我们改变进度，或者说宽度就需要得到鼠标点击的位置，这可以通过事件对象的 `offsetX` 属性来找到，该属性代表鼠标点击位置相对于该元素的水平偏移。得到偏移之后计算出该位置的百分比，那么也就知道了进度的百分比。


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


