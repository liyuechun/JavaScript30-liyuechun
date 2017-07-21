# Day02 - JavaScript + CSS Clock

> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 2 篇。完整指南在 [从零到壹全栈部落](http://fullstack.kongyixueyuan.com)。

## 简介

第二天的练习是用JS+CSS模拟时钟效果。

效果如下：

![clock](http://om1c35wrq.bkt.clouddn.com/day2_clock__.gif)


实现以上模拟时钟的效果，大致思路和解决方案如下：

* 分别获取到当前时间的时、分、秒。
* 通过时分秒对一圈360度，进行映射，确定每一个指针所需旋转的角度。
* 通过CSS的`transform：rotate(deg)`，来实时的调整指针在键盘中的位置。

## 页面布局

```html
  <div class="clock">
    <div class="clock-face">
      <div class="hand hour-hand"></div>
      <div class="hand min-hand"></div>
      <div class="hand second-hand"></div>
    </div>
  </div>
```

## CSS样式

```css
  <style>
    html {
      background: #018DED url(http://unsplash.it/1500/1000?image=881&blur=50);
      background-size: cover;
      font-family: 'helvetica neue';
      text-align: center;
      font-size: 10px;
    }

    body {
      margin: 0;
      font-size: 2rem;
      display: flex;
      flex: 1;
      min-height: 100vh;
      align-items: center;
    }

    .clock {
      width: 30rem;
      height: 30rem;
      border: 20px solid white;
      border-radius: 50%;
      margin: 50px auto;
      position: relative;
      padding: 2rem;
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1),
      inset 0 0 0 3px #EFEFEF,
      inset 0 0 10px black,
      0 0 10px rgba(0, 0, 0, 0.2);
    }

    .clock-face {
      position: relative;
      width: 100%;
      height: 100%;
      transform: translateY(-3px);
      /* account for the height of the clock hands */
    }

    .hand {
      width: 50%;
      height: 6px;
      background: black;
      position: absolute;
      top: 50%;
      transform-origin: 100%;
      transform: rotate(90deg);
      transition: all 0.05s;
      transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    }
  </style>
```

**涉及到的特性：**

- `transform-oragin`

调整指针的初始位置以及旋转的轴点:[transform-oragin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
    
```css
transform-oragin: 100%; //初始化使三个指针全部指向12时
```

- `transform: rotate()`

设置旋转角度

- `transition`

```css
transition: all //0.05s;设置动画时间为0.05秒
```
    
- `transition-timing-function: cubic-bezier(x, x, x, x)`

设置 `transition-time-function` 的值，以实现秒针“滴答滴答”的效果。此外注意 `transform` 中的 `rotate` （旋转）属性由角度来控制，可以试着在页面上修改这个参数来查看效果。


![](http://om1c35wrq.bkt.clouddn.com/day21.gif)


## JS代码

```js
  <script>
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function setDate() {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      const mins = now.getMinutes();
      const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
      minsHand.style.transform = `rotate(${minsDegrees}deg)`;

      const hour = now.getHours();
      const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    setInterval(setDate, 1000);

    setDate();
  </script>
```

- 获取秒针、分钟、小时节点

```js
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');
```

- 获取当前时间秒、分、小时

```js
const now = new Date();
const seconds = now.getSeconds();
const mins = now.getMinutes();
const hour = now.getHours();
```

- 计算秒、分、小时角度

```js
const secondsDegrees = ((seconds / 60) * 360) + 90;
const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
```

- 根据角度设置样式

```js
secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
minsHand.style.transform = `rotate(${minsDegrees}deg)`;
hourHand.style.transform = `rotate(${hourDegrees}deg)`;
```

- 设置定时器，每秒调用一次`setDate`函数

```js
setInterval(setDate, 1000);
```

## 延伸思考

此处存在一个小瑕疵，当秒针旋转一圈之后回到初始位置，开始第二圈旋转，角度值的变化时 444° → 90° → 96° .... 这个过程中，指针会先逆时针从 444° 旋转至 90°，再继续我们期望的顺时针旋转，由于秒针变换时间只有 0.05s，所以呈现的效果就是秒针闪了一下，如果想要观察细节，可以将 `.second` 设为 `transition: all 1s`，效果如下所示：

![](http://om1c35wrq.bkt.clouddn.com/day222.gif)


要解决这个问题，目前找到了两种解决办法：


- 第一种

```js
  <script>
    const secHand = document.querySelector('.second-hand');
    const minHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function setDate() {
      const date = new Date();

      const second = date.getSeconds();
      const secondDeg = (90 + (second / 60) * 360);

      const min = date.getMinutes();
      const minDeg = (90 + (min / 60) * 360);

      const hour = date.getHours();
      const hourDeg = (90 + (hour / 12) * 360 + (min / 12 / 60) * 360); // 加入分钟所占的时间，使时针可以缓慢地移动


      //解决指针跳顿问题【第一种方法】
      //在发生跳顿的角度值处，将 CSS 的 `transition` 属性去掉
      if (secondDeg === 90) {
        secHand.style.transition = 'all 0s';
      } else {
        secHand.style.transition = 'all 0.05s';
      }

      if (minDeg === 90) {
        minHand.style.transition = 'all 0s';
      } else {
        minHand.style.transition = 'all 0.1s';
      }


      secHand.style.transform = `rotate(${ secondDeg }deg)`;
      minHand.style.transform = `rotate(${ minDeg }deg)`;
      hourHand.style.transform = `rotate(${ hourDeg }deg)`;

    }

    setInterval(setDate, 1000);

    setDate();
  </script>
```

- 第二种

```js
  <script>
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    let secondDeg = 0;
    let minDeg = 0;
    let hourDeg = 0;

    function initDate() {
      const date = new Date();
      const second = date.getSeconds();
      secondDeg = 90 + (second / 60) * 360;
      const min = date.getMinutes();
      minDeg = 90 + (min / 60) * 360 + ((second / 60) / 60) * 360;
      const hour = date.getHours();
      hourDeg = 90 + (hour / 12) * 360 + ((min / 60) / 12) * 360 + (((second / 60) / 60) / 12) * 360;
    }

    function updateDate() {
      secondDeg += (1 / 60) * 360;
      minDeg += ((1 / 60) / 60) * 360;
      hourDeg += (((1 / 60) / 60) / 12);

      secondHand.style.transform = `rotate(${ secondDeg }deg)`;
      minsHand.style.transform = `rotate(${ minDeg }deg)`;
      hourHand.style.transform = `rotate(${ hourDeg }deg)`;
    }

    initDate();
    setInterval(updateDate, 1000);
  </script>
```

既然引发问题的是角度的大小变化，那就可以对这个值进行处理。此前的代码中，每秒都会重新 new 一个 Date 对象，用来计算角度值，但如果让这个角度值一直保持增长，也就不会出现逆时针回旋的问题了。

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






