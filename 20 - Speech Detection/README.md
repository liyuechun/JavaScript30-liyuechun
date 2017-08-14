# Day20 - 语言识别系统中文指南

> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 20 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

## 运行项目


```js
$ npm install
$ npm start
```

浏览器打开`http://localhost:3000/index-FINISHED.html`

效果图如下：

![](http://om1c35wrq.bkt.clouddn.com/Snip20170811_1.png)

![](http://om1c35wrq.bkt.clouddn.com/day20-100.gif)


## 程序源码

### HTML代码



```js html  css
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Speech Detection</title>
</head>

<body>

  <div class="words" contenteditable>
  </div>
  
  <style>
    html {
      font-size: 10px;
    }

    body {
      background: #ffc600;
      font-family: 'helvetica neue';
      font-weight: 200;
      font-size: 20px;
    }

    .words {
      max-width: 500px;
      margin: 50px auto;
      background: white;
      border-radius: 5px;
      box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
      padding: 1rem 2rem 1rem 5rem;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
      background-size: 100% 3rem;
      position: relative;
      line-height: 3rem;
    }

    p {
      margin: 0 0 3rem;
    }

    .words:before {
      content: '';
      position: absolute;
      width: 4px;
      top: 0;
      left: 30px;
      bottom: 0;
      border: 1px solid;
      border-color: transparent #efe4e4;
    }
  </style>

</body>

</html>
```

### JS代码

```js
  <script>
    // 根据浏览器之间的兼容性，需要同时添加浏览器前缀
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // 实例化SpeechRecognition对象
    const recognition = new SpeechRecognition();

    // interimResults 属性的默认值是 false ，代表语音识别器的返回值不会改变。在这个演示中，我们把它设置为 true ，这样随着我们的输入，识别结果有可能会改变。仔细观看演示，灰色的文字是临时性的，有时会改变，而黑色文本是最终结果，不会改变。
    recognition.interimResults = true;

    // 创建p便签，附加到DOM树中
    let p = document.createElement('p');
    const words = document.querySelector('.words');
    words.appendChild(p);

    // 监听recognition的result事件，获取到语音输入的文字
    recognition.addEventListener('result', (e) => {
      const results = Array.from(e.results) // e.results中保存的是识别的结果，本来并不是数组，需要将其转换为数组，方便使用其map、join等方法。
        .map(result => result[0])
        .map(result => result.transcript) // 获取到每一段话，是一个数组类型
        .join(''); // 将每一段话连接成字符串

      // 可以动态的将其中的某一个词语换掉
      const poopScript = results.replace(/good/gi, '👍');
      p.textContent = poopScript;

      // 如果当前一段输入结束了，也就是有停顿，就会新建一个p便签
      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
    });

    // 监听recognition的end事件，当前输入结束后，再次开始，使其一直处于输入状态
    recognition.addEventListener('end', recognition.start);

    // 开启recognition
    recognition.start();
  </script>
```

#### JS实现思路
* 新建一个语音识别的对象
* 开启该语音识别对象的识别服务
* 监听`result`事件，实时获取语音输入内容
* 监听`end`事件，当结束时再次开启语音识别，使其持续监听

#### JS源码解析

 - [SpeechRecognition参考文档](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
 
 - 其中监听`result`事件，根据事件返回值获取到语音输入的内容
![](http://om1c35wrq.bkt.clouddn.com/Snip20170811_2.png)

可以看到`transcript`中保存的是语音输入的内容。其中可以看到还有一个属性为`confidence`，代表这段话是别的精度，越大正确率越高。

-`SpeechRecognition`属性

```js
<!--新建语音识别的对象-->
var recognition = new SpeechRecognition();
<!--continuous默认值为false，当continuous值为true时，表示，一句话结束后，语音识别继续识别-->
recognition.continuous = false;
<!--设置按照什么语言来识别-->
recognition.lang = 'en-US';
<!--interimResults 属性的默认值是 false ，代表语音识别器的返回值不会改变。在这个演示中，我们把它设置为 true ，这样随着我们的输入，识别结果有可能会改变。仔细观看演示，灰色的文字是临时性的，有时会改变，而黑色文本是最终结果，不会改变。-->
recognition.interimResults = false;
...
```

第20天的内容就到这里，主要学习`SpeechRecognition`相关属性的使用。


## 源码下载

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

|全栈部落|区块链部落|
|:---------:|:------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo100.jpeg)|![](http://orhm8wuhd.bkt.clouddn.com/qukuailian100.jpg)|






