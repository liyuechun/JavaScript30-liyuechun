# Day29 - Countdown Timer

> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 29 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

[在线效果](http://30daysofjs.michaeleinsohn.com/countdown-timer/)

![](http://om1c35wrq.bkt.clouddn.com/day29--xiaoguotu.gif)

第20天的挑战是，设置一个倒计时时间，接下来开始倒计时。


## HTML代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Countdown Timer</title>
  <link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="timer">
    <div class="timer__controls">
      <button data-time="20" class="timer__button">20 Secs</button>
      <button data-time="300" class="timer__button">Work 5</button>
      <button data-time="900" class="timer__button">Quick 15</button>
      <button data-time="1200" class="timer__button">Snack 20</button>
      <button data-time="3600" class="timer__button">Lunch Break</button>
      <form name="customForm" id="custom">
        <input type="text" name="minutes" placeholder="Enter Minutes">
      </form>
    </div>
    <div class="display">
      <h1 class="display__time-left"></h1>
      <p class="display__end-time"></p>
    </div>
  </div>
</body>
</html>
```

- 上面的`button`中自定义的`data-time`为倒计时时间，以秒为单位。
- `form`为自定义倒计时时间，以分为单位。
- class为`display__time-left`的div主要为了展示倒计时的动态。
- class为`display__end-time`的div主要为了展示倒计时什么时候结束。

## CSS 代码

```css
html {
  box-sizing: border-box;
  font-size: 10px;
  background: #8E24AA;
  background: linear-gradient(45deg, #42a5f5 0%, #478ed1 50%, #0d47a1 100%);
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  text-align: center;
  font-family: 'Inconsolata', monospace;
}

.display__time-left {
  font-weight: 100;
  font-size: 20rem;
  margin: 0;
  color: white;
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
}

.timer {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.timer__controls {
  display: flex;
}

.timer__controls>* {
  flex: 1;
}

.timer__controls form {
  flex: 1;
  display: flex;
}

.timer__controls input {
  flex: 1;
  border: 0;
  padding: 2rem;
}

.timer__button {
  background: none;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 2rem;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  font-family: 'Inconsolata', monospace;
}

.timer__button:hover,
.timer__button:focus {
  background: rgba(0, 0, 0, 0.2);
  outline: 0;
}

.display {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.display__end-time {
  font-size: 4rem;
  color: white;
}
```

## JS代码实现逻辑

```js
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
```

**逻辑分析：**

- 当点击button按钮时，调用`startTimer`方法。

```js
buttons.forEach(button => button.addEventListener('click', startTimer));
```

- 在输入框中自定义倒计时时间时，输入`enter`时调用传入的回调函数。

```js
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
```


- startTimer函数代码解释

```js
function startTimer() {
<!--获取当前点击的button的data-time值，并将其转换成整数-->
  const seconds = parseInt(this.dataset.time);
  <!--调用timer函数-->
  timer(seconds);
}
```


- displayTimeLeft代码

```js
<!--计算时分秒，并且展示-->
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
```


- displayEndTime代码

```js
<!--计算倒计时结束时间，并且展示-->
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
```

- timer代码

```js
function timer(seconds) {
  // clear any existing timers
  清除正在进行的倒计时
  clearInterval(countdown);

<!--获取当前时间-->
  const now = Date.now();
  
  <!--计算多少毫秒后结束倒计时-->
  const then = now + seconds * 1000;
  
  <!--调用displayTimeLeft函数展示倒计时效果-->
  displayTimeLeft(seconds);
  <!--展示结束时间-->
  displayEndTime(then);

<!--设置定时器，更新倒计时组建-->
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}
```

## 源码下载
[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)


