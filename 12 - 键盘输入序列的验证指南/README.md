# Day12 - 键盘输入序列的验证指南


> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 12 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

## 项目效果

![](http://om1c35wrq.bkt.clouddn.com/day12-00.gif)

文档里提供了一个 `script` 标签，供我们从 [Cornify.com](https://www.cornify.com/) 加载一个 JS 文件，调用其中的 `cornify_add()` 方法时，会在页面中追加 `p` 标签，并在 DOM 中插入一个图标。Cornify 的具体效果如上所示。

## 解决思路

1. 指定可激发特效的字符串
2. 监测字符串变化
3. 事件监听
4. 正则表达式判断字符串输入 
5. 处理输入，在符合条件时，调用 `cornify_add()`


## 代码分析

### 1. 指定可激发特效的字符串

```js
const pressed = [];
const secretCode = 'liyc';
```

声明一个空数组`pressed`用于键盘输入字符的处理，并且声明一个秘钥字符串`secretCode`用于激发效果的触发。

### 2. 监测字符串变化

- 声明字符串输入变化的`div`

```html
<div style="font-size:40px;color:red" class="input_word_pre"></div>
<div style="font-size:40px;color:blue" class="input_word_af"></div>  
```

- 获取div对象

```js
const input_word_pre = document.querySelector('.input_word_pre');
const input_word_af = document.querySelector('.input_word_af');
```

- 更新div显示数据

```js
input_word_pre.innerText = pressed.join('');
...
input_word_af.innerText = pressed.join('');
```

### 3. 事件监听

```js
window.addEventListener('keyup', callback);
```
`addEventListener`通过`keyup`监听键盘输入的变化，当键盘弹起时，调用`callback`函数。


### 4. 正则表达式判断字符串输入 

```js
const regex = new RegExp('[A-z]', 'gi');
<!--判断输入的键盘上的字母是A - z的字符-->
if (e.key.length === 1 && e.key.match(regex)) {
    ... 
}
```

### 5. 处理输入，在符合条件时，调用 `cornify_add()`

```js
<!--当pressed数组里面的字符个数大于密钥字符串的个数时，每新增一个字符，将最前面一个删掉-->
pressed.splice(0, pressed.length - secretCode.length);
<!--当`pressed`数组里面的连续的字符连接成的字符串中包涵我们给定的秘钥时，调用`cornify_add();`函数-->
if (pressed.join('').includes(secretCode)) {
    cornify_add();    
}
```

## 完整代码

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Key Detection</title>
  <script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>
</head>

<body>

  <div style="font-size:20px;color:green">请输入:liyc</div>

  <div style="font-size:40px;color:red" class="input_word_pre"></div>
  <div style="font-size:40px;color:blue" class="input_word_af"></div>
  <script>
    const pressed = [];
    const secretCode = 'liyc';
    const input_word_pre = document.querySelector('.input_word_pre');
    const input_word_af = document.querySelector('.input_word_af');

    window.addEventListener('keyup', (e) => {
      const regex = new RegExp('[A-z]', 'gi');
      if (e.key.length === 1 && e.key.match(regex)) {
        pressed.push(e.key);
        input_word_pre.innerText = pressed.join('');
        pressed.splice(0, pressed.length - secretCode.length);
        input_word_af.innerText = pressed.join('');
        if (pressed.join('').includes(secretCode)) {
          console.log('DING DING!');
          cornify_add();
          // alert(secretCode);
        }
      }
    });
  </script>
</body>

</html>
```

## 源码下载

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

|全栈部落|区块链部落|
|:---------:|:------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo100.jpeg)|![](http://orhm8wuhd.bkt.clouddn.com/qukuailian100.jpg)|


