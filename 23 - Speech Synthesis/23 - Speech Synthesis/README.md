



# Day23 - Speech Synthesis

> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 23 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

![](http://om1c35wrq.bkt.clouddn.com/Snip20170813_1.png)

第23天要做一个语音的记事本类似的场景，输入一段内容，选择不同的语言可以进行朗读。还可以选择不同的语速和语调。

## 基础知识

#### 一、示例

[speak-easy-synthesis](https://github.com/mdn/web-speech-api/tree/master/speak-easy-synthesis)

```js
var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  synth.speak(utterThis);

  inputTxt.blur();
}
```

![](http://om1c35wrq.bkt.clouddn.com/Snip20170813_3.png)

#### 二、SpeechSynthesis

[参考文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)


##### 1、属性

- `SpeechSynthesis.paused`（只读）

判断是否是处于暂停状态。

- `SpeechSynthesis.pending` (只读)

判断是否处于等待状态。

- `SpeechSynthesis.speaking ` (只读)

判断是否处于在读中。

##### 2、事件

- `SpeechSynthesis.onvoiceschanged`

监听翻译的语言是否发生了变化。

#### 3、方法

- `SpeechSynthesis.cancel()`

取消。

- `SpeechSynthesis.getVoices()`

获取所有当前设备支持的`SpeechSynthesisVoice `对象。

- `SpeechSynthesis.pause()`

暂停。

- `SpeechSynthesis.resume()`

恢复。

- `SpeechSynthesis.speak()`

开始语音读取。

#### 三、SpeechSynthesisUtterance 

[参考文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)

##### 1、构造函数

- `SpeechSynthesisUtterance.SpeechSynthesisUtterance()`

返回一个新的`SpeechSynthesisUtterance`对象实例。

##### 2、属性

- SpeechSynthesisUtterance.lang

获取或者是设置`utterance`的语言。

- SpeechSynthesisUtterance.pitch

获取或者是设置`utterance`的音高。

- SpeechSynthesisUtterance.rate

获取或者是设置`utterance`的播放速率。


- SpeechSynthesisUtterance.text

获取或者是设置`utterance`需要播放的文本内容。


- SpeechSynthesisUtterance.voice

获得或设定将被用来说话的声音。

- SpeechSynthesisUtterance.volume

获取或者是设置`utterance`的播放音量。

## HTML源码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Speech Synthesis</title>
  <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="voiceinator">

      <h1>The Voiceinator 5000</h1>

      <select name="voice" id="voices">
        <option value="">Select A Voice</option>
      </select>

      <label for="rate">Rate:</label>
      <input name="rate" type="range" min="0" max="3" value="1" step="0.1">

      <label for="pitch">Pitch:</label>

      <input name="pitch" type="range" min="0" max="2" step="0.1">
      <textarea name="text">Hello! I love JavaScript 👍</textarea>
      <button id="stop">Stop!</button>
      <button id="speak">Speak</button>

    </div>
</body>
</html>
```

## CSS源码

```css
html {
  font-size: 10px;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color:#3BC1AC;
  display:flex;
  min-height: 100vh;
  align-items: center;

  background-image:
  radial-gradient(circle at 100% 150%, #3BC1AC 24%, #42D2BB 25%, #42D2BB 28%, #3BC1AC 29%, #3BC1AC 36%, #42D2BB 36%, #42D2BB 40%, transparent 40%, transparent),
  radial-gradient(circle at 0    150%, #3BC1AC 24%, #42D2BB 25%, #42D2BB 28%, #3BC1AC 29%, #3BC1AC 36%, #42D2BB 36%, #42D2BB 40%, transparent 40%, transparent),
  radial-gradient(circle at 50%  100%, #42D2BB 10%, #3BC1AC 11%, #3BC1AC 23%, #42D2BB 24%, #42D2BB 30%, #3BC1AC 31%, #3BC1AC 43%, #42D2BB 44%, #42D2BB 50%, #3BC1AC 51%, #3BC1AC 63%, #42D2BB 64%, #42D2BB 71%, transparent 71%, transparent),
  radial-gradient(circle at 100% 50%, #42D2BB 5%, #3BC1AC 6%, #3BC1AC 15%, #42D2BB 16%, #42D2BB 20%, #3BC1AC 21%, #3BC1AC 30%, #42D2BB 31%, #42D2BB 35%, #3BC1AC 36%, #3BC1AC 45%, #42D2BB 46%, #42D2BB 49%, transparent 50%, transparent),
  radial-gradient(circle at 0    50%, #42D2BB 5%, #3BC1AC 6%, #3BC1AC 15%, #42D2BB 16%, #42D2BB 20%, #3BC1AC 21%, #3BC1AC 30%, #42D2BB 31%, #42D2BB 35%, #3BC1AC 36%, #3BC1AC 45%, #42D2BB 46%, #42D2BB 49%, transparent 50%, transparent);
  background-size:100px 50px;
}


.voiceinator {
  padding:2rem;
  width:50rem;
  margin:0 auto;
  border-radius:1rem;
  position: relative;
  background:white;
  overflow: hidden;
  z-index: 1;
  box-shadow:0 0 5px 5px rgba(0,0,0,0.1);
}

h1 {
  width:calc(100% + 4rem);
  margin: -2rem 0 2rem -2rem;
  padding:.5rem;
  background: #ffc600;
  border-bottom: 5px solid #F3C010;
  text-align: center;
  font-size: 5rem;
  font-weight: 100;
  font-family: 'Pacifico', cursive;
  text-shadow:3px 3px 0 #F3C010;

}

.voiceinator input,
.voiceinator button,
.voiceinator select,
.voiceinator textarea {
  width: 100%;
  display: block;
  margin:10px 0;
  padding:10px;
  border:0;
  font-size: 2rem;
  background:#F7F7F7;
  outline:0;
}

textarea {
  height: 20rem;
}

input[type="select"] {

}

.voiceinator button {
  background:#ffc600;
  border:0;
  width: 49%;
  float:left;
  font-family: 'Pacifico', cursive;
  margin-bottom: 0;
  font-size: 2rem;
  border-bottom: 5px solid #F3C010;
  cursor:pointer;
  position: relative;
}

.voiceinator button:active {
  top:2px;
}

.voiceinator button:nth-of-type(1) {
  margin-right: 2%;
}
```


## JS源码

```Javascript
  // 实例化一个语音对象，并获得页面上的各DOM元素
  const msg = new SpeechSynthesisUtterance();
  const synth = window.speechSynthesis;
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  msg.text = document.querySelector('[name="text"]').value;

  // 设置各种语言的下拉选择框
  function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // 设置当前语音的语言
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  // 切换语音的播放和暂停
  function toggle(startOver = true) {
    synth.cancel();
    if (startOver) {
      synth.speak(msg);
    }
  }

  // 设置语音的语速和语调
  function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
  }

  // 监听语音对象的语言改变的事件
  synth.addEventListener('voiceschanged', populateVoices);
  // 当切换语言选择下拉菜单时被调用
  voicesDropdown.addEventListener('change', setVoice);
  // 为语速和语调设置改变的事件监听
  options.forEach(option => option.addEventListener('change', setOption));
  // 分别监听播放和暂停事件
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));
```

本节挑战中只要掌握上面的基础知识部分，本案例的挑战就成功。


## 源码下载
[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

