# Day1 JavaScript Drum Kit 中文指南

> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 1 篇。完整指南在 [从零到壹全栈部落](http://fullstack.kongyixueyuan.com)。

## 简介

第一天的练习是用JS制作一个爵士鼓的页面，通过敲击键盘上不同的字母，会发出不同的声音，并且页面上会伴随着敲击的动画。

效果如下：

![](http://om1c35wrq.bkt.clouddn.com/01%20-%20JavaScript%20Drum%20Kit%202.gif)



想要实现以上效果，大致思路和解决方案如下：

- 检测到键盘上什么键被按下--监听`keydown`事件
- 在按键被按下的时候，播放音效--`audio.play()`
- 在按键被按下的同时，播放动画--`Element.classList.add('className')`
- 在动画结束后，移除动画，不然之后再点击不会有任何效果--`Element.classList.remove('className')`


## 基础语法

### 一些 ES6 语法

1.  ``const`` ：声明一个只读的常量，标识符的值只能赋值一次。

2.  \`字符串 \${ 变量、属性名 } \`：模板字面量（Template literals）中用于表示模板字符串的标识。特点是字符串首尾用反引号（\`），内部的模板部分用 ${ } 括起来表示，具体请看[MDN文档]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)。简单例子如下：

````javascript
var a = 1;
var b = 2;
//不用模板的写法
console.log("三是" + (a + b) + "不是" + (2 * a + b)); //"三是3不是4"
//使用模板字符串的写法
console.log(`三是${a + b}不是${2 * a + b}`); //"三是3不是4"
````


### ``forEach`` 与箭头函数

使用 ``document.querySelector`` 获取一组符合 CSS 选择符的元素快照，类型为 NodeList（此对象是对于文档的实时运行的动态查询），对其进行遍历时可采用 ``forEach`` 方法。

```javascript
// Code from http://es6-features.org/#StatementBodies

// ES6
nums.forEach(v => {
	if (v % 5 === 0)
		fives.push(v);
})

// ES5
nums.forEach(function (v) {
	if (v % 5 === 0)
		five.push(v);
})
```


## 页面基础布局

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>JS Drum Kit</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>


  <div class="keys">
    <div data-key="65" class="key">
      <kbd>A</kbd>
      <span class="sound">clap</span>
    </div>
    <div data-key="83" class="key">
      <kbd>S</kbd>
      <span class="sound">hihat</span>
    </div>
    <div data-key="68" class="key">
      <kbd>D</kbd>
      <span class="sound">kick</span>
    </div>
    <div data-key="70" class="key">
      <kbd>F</kbd>
      <span class="sound">openhat</span>
    </div>
    <div data-key="71" class="key">
      <kbd>G</kbd>
      <span class="sound">boom</span>
    </div>
    <div data-key="72" class="key">
      <kbd>H</kbd>
      <span class="sound">ride</span>
    </div>
    <div data-key="74" class="key">
      <kbd>J</kbd>
      <span class="sound">snare</span>
    </div>
    <div data-key="75" class="key">
      <kbd>K</kbd>
      <span class="sound">tom</span>
    </div>
    <div data-key="76" class="key">
      <kbd>L</kbd>
      <span class="sound">tink</span>
    </div>
  </div>

  <audio data-key="65" src="sounds/clap.wav"></audio>
  <audio data-key="83" src="sounds/hihat.wav"></audio>
  <audio data-key="68" src="sounds/kick.wav"></audio>
  <audio data-key="70" src="sounds/openhat.wav"></audio>
  <audio data-key="71" src="sounds/boom.wav"></audio>
  <audio data-key="72" src="sounds/ride.wav"></audio>
  <audio data-key="74" src="sounds/snare.wav"></audio>
  <audio data-key="75" src="sounds/tom.wav"></audio>
  <audio data-key="76" src="sounds/tink.wav"></audio>

  <script>
  </script>


</body>

</html>
```

- <kbd> 标签定义键盘文本

说到技术概念上的特殊样式时，就要提到 <kbd> 标签。正如你已经猜到的，它用来表示文本是从键盘上键入的。
浏览器通常用等宽字体来显示该标签中包含的文本。
<kbd> 标签经常用在于计算机相关的文档和手册中。例如：

```text
键入 <kbd>quit</kbd> 来退出程序，或者键入 <kbd>menu</kbd> 来返回主菜单。
```


- 使用 data-* 属性来嵌入自定义数据

页面里通过data-key将页面展示的内容和audio关联起来。使用方法如下介绍：

```html
<ul>
<li data-animal-type="bird">Owl</li>
<li data-animal-type="fish">Salmon</li> 
<li data-animal-type="spider">Tarantula</li> 
</ul>
```

① data-* 属性用于存储页面或应用程序的私有自定义数据。
② data-* 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
③ 属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
④ 属性值可以是任意字符串

**语法:**

```text
<element data-*="somevalue">
```

**属性值:**

|值|描述|
|:---------:|:---------:|
|somevalue|规定属性的值（以字符串）。|

## 主要CSS代码

```css
html {
  font-size: 10px;
  background: url(http://i.imgur.com/b9r5sEL.jpg) bottom center;
  background-size: cover;
}
body,
html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.keys {
  display: flex;
  flex: 1;
  min-height: 100vh; 
  align-items: center;  
  justify-content: center; 
}

.key {
  border: .4rem solid black;
  border-radius: .5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem .5rem;
  transition: all .07s ease;
  width: 10rem;
  text-align: center;
  color: white; 
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 .5rem black;
}

.playing {
  transform: scale(1.1);
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
}

kbd {
  display: block; 
  font-size: 4rem;
}

.sound {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: .1rem;
  color: #ffc600;
}
```



主要属性有以下几个：
- `html`中有一个样式为`font-size: 10px;`，在本案例中，`1rem`就是10px，rem是以html中的`font-size`为参照物，`1.2rem`就是`12px`。
- `transform: scale(1.1);`--该属性在键盘被点击时将该元素缩放至原来的1.1倍。
- `.key{border: .4rem solid black;} .playing{border-color: #ffc600;}`--这两条属性在按键点击的时候改变边框颜色。
- `.key{text-shadow: 0 0 .5rem black;} .playing{box-shadow: 0 0 1rem #ffc600;}`--这两条属性在按键点击的时候改变阴影的效果
- `transition: all .07s ease;`--定义以上动画在0.07秒内完成。
我们注意到我们定义了`.palying`类，在按键按下的时侯为该元素添加`playing`类，在结束后移除`playing`类。

## JS代码

### 按键监听&音效播放&添加动画

```js
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;
    
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}
/**
* 监听页面的keydown事件，触发playAudio函数。
*/
window.addEventListener('keydown', playSound);
```

* 监听页面的keydown事件，触发playAudio函数。
* 通过KeyCode检测我们按下的键盘按钮是哪个按钮。
    * A -> 65
    * B -> 66
    * C -> 67
    * D -> 68
    * E -> 69
    * F -> 70
    * G -> 71
    * H -> 72
    * I -> 73
    * J -> 74
    * K -> 75
    * L -> 76
    * M -> 77
    * N -> 78
    * O -> 79
    * P -> 80
    * Q -> 81
    * R -> 82
    * S -> 83
    * T -> 84
    * U -> 85
    * V -> 86
    * W -> 87
    * X -> 88
    * Y -> 89
    * Z -> 90
* 在这里我们用到了ES6的模板字符串，`${e.keyCode}`,可以动态的将按键的`Keycode`传过去，以使`audio`动态的获取每一个按键绑定的`audio`。需要注意的是模板字符串一定要使用"`"(Esc下面那个键)包裹，而不是双引号。
* 我们注意到`audio.play();`前面一行是`audio.currentTime = 0;`，这是因为，如果没有在播放音效前将该音乐重置，会发生以下情况，当我连续点击某一按键的时候，只有第一次点击会响，第二次第三次连续的点击可能没声音。所以在每一次点击之前重置音效是很有必要的。
* `key.classList.add('playing');`可以在按键点击的同时为该元素添加playing类，展示小动画。
* `if(!audio) return; if(!key) return;`因为并不是每一个按键都有音效，当用户点击了非绑定音效按键，及时退出函数是很好的习惯。


### 动画结束后移除动画

```js
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}
  
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend',stopTransition));  
```

- 监听每一个按键元素的`transitionend`事件，当按键元素的动画结束后会触发`removeTransition`函数。

- 首先在`removeTransition`函数中可以输出事件e的内容，会输出该动画每一步具体的变化，发现其中会有`propertyName`属性，可以通过判断`propertyName`等于其中的一个值（例如'transform'），等于该值就移除`playing`类，也即移除动画。

- 在定位元素的时候，可以使用`this`也可以使用`e.target`,可以简单这么理解，`this`值的是谁出发了这次事件，也就是`key`，就等同于事件的目标（e.target）.

## 解决难点

### 如何将键盘按键与页面按钮对应起来？

连接的帮手是 ``keydown`` 事件中的 `keyCode` 属性，`keyCode` 属性的值和 ASCII 编码值相同（对应小写字母）。在[这个网站]( http://keycode.info/ )可以用按键盘来查看对应的键码。

我们能获取到的初始页面中，按钮 `div` 和音频 `audio` 标签中都添加了一个属性 `data-key` 用于存储对应的键码，这样做的目的是，添加键盘事件监听后，触发键盘事件时即可获取事件的 `keyCode` 属性值，以此为线索，操作对应的按钮及音频。

````javascript
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
````

### 如何保证按键被按住不放时，可以马上响起连续鼓点声？

每次播放音频之前，设置播放时间戳为 0：

````javascript
var audio = document.getElementById("video"); 
audio.currentTime = 0;
audio.play();
````

### 如何使页面按钮恢复原状？

利用一个叫 [`transitionened`](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend) 的事件，它在 CSS transition 结束后会被触发。我们就可以利用这个事件，在每次打鼓的效果（尺寸变大、颜色变化）完成之后，去除相应样式。

在这个页面中，发生 `transition` 的样式属性不止一个（`box-shadow`, `transform`, `border-color`），所以需要添加一个判断语句，使每发生一次按键事件时，只去除一次样式。

````javascript
funciton remove(event) {
  if (event.propertyName !== 'border-left-color') return;
  this.classList.remove('playing');
  // event.target.classList.remove('playing');
}
````

## 完整源码

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


