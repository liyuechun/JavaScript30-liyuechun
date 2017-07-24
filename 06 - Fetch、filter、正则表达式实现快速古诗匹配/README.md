# Day06 - Fetch、filter、正则表达式实现快速古诗匹配


> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 6 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。



## 效果图

在输入框中搜索`字或者某个词`快速匹配含有这个字或者是词的诗句。

![](http://om1c35wrq.bkt.clouddn.com/day6.gif)


## 涉及特性

- flex布局

- `nth-child`奇偶匹配

- `linear-gradient`颜色渐变

- transform

- Fetch

- Array
	- `filter()`
	- `map()`
	- `push()`
	- `join()`
	- `...`
	
- JavaScript RegExp 对象

    - 字面量语法
    - 创建 RegExp 对象的语法
    - 修饰符`i`、`g`
    - `match()`
    - `replace()`
	
	
## 实现步骤

- UI布局
- 通过Fetch下载数据
- 数据处理并保存
- 事件监听
- 数据匹配操作
- 新数据替换展示

## 布局篇

- HTML代码

```html
  <form class="search-form">
    <input type="text" class="search" placeholder="诗人名字，关键字">
    <ul class="suggestions">
      <li>输入词句，找一首诗</li>
      <li>输入词句，找一首诗</li>
      <li>输入词句，找一首诗</li>
      <li>输入词句，找一首诗</li>
      <li>输入词句，找一首诗</li>
    </ul>
  </form>
```

- CSS代码

```css
html {
  box-sizing: border-box;
  margin: 0px;
  background-color: rgb(145, 182, 195);
  font-family: 'Kaiti', 'SimHei', 'Hiragino Sans GB ', 'helvetica neue';
  font-size: 20px;
  font-weight: 200;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  display: flex;
  justify-content: center;
}

.search-form {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input.search {
  padding: 20px;
  font-family: 'Kaiti', 'helvetica neue';
  margin: 0;
  border: 10px solid #f7f7f7;
  font-size: 40px;
  text-align: center;
  width: 120%;
  outline: 0;
  border-radius: 5px;
  position: relative;
  top: 10px;
  left: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19);
}

.suggestions {
  margin: 0;
  padding: 0;
  position: relative;
  top: 7px;
  width: 100%;
}

.suggestions li {
  background: white;
  list-style: none;
  border-bottom: 1px solid #D8D8D8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /*align-items: flex-start;*/
}

span.title {
  margin-right: 20px;
  text-align: right;
  color: #7c8e94;
  margin-top: 5px;
}

span.hl {
  color: green;
}



/*偶数匹配*/
.suggestions li:nth-child(even) {
  transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
  background: linear-gradient(to bottom, #ffffff 0%, #efefef 100%);
}

/*奇数匹配*/
.suggestions li:nth-child(odd) {
  transform: perspective(100px) rotateX(-3deg) translateY(3px);
  background: linear-gradient(to top, #ffffff 0%, #efefef 100%);
}
```

- CSS布局相关参考文档

    - [CSS参考手册](http://www.css88.com/book/css/properties/flex/flex.htm)
    
    - [CSS选择器笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
    
    - [flex布局完全入门教程](http://bbs.kongyixueyuan.com/topic/10/flex布局完全入门教程)
    
    - [使用HTML5里的classList操作CSS类](http://www.webhek.com/post/html5-classlist-api.html)
    
    - [position](http://zh.learnlayout.com/position.html)

## 通过Fetch下载数据解析并且保存

```js
const endpoint = 'https://gist.githubusercontent.com/liyuechun/f00bb31fb8f46ee0a283a4d182f691b4/raw/3ea4b427917048cdc596b38b67b5ed664605b76d/TangPoetry.json';

const poetrys = [];
fetch(endpoint)
 .then(blob => {
   return blob.json();
 })
 .then(data => {
   poetrys.push(...data);
 });
```

具体数据请求过程见下图：

![](http://om1c35wrq.bkt.clouddn.com/WechatIMG187.jpeg)

``

[Fetch详细使用文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

`blob.json()`是将数据转换为json数据，data为`then`函数中转换完的数据，在这个案例中，data是一个数组。

`poetrys.push(...data)`这句代码中的`push`是往数组里面新增对象，而`...data`代表的是将这个data数组中的数据一一的存储到`poetrys`数组中。


## 事件监听

```js
const search = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

search.addEventListener('change', displayMatches);
search.addEventListener('keyup', displayMatches);
```

获取`search`和`suggestions'`节点分别对`change`、`keyup`事件进行监听，当输入框中的内容发生变化或者键盘弹起时触发`displayMatches`函数更新数据。

## 数据匹配操作

- RegExp使用基础

[RegExp参考文档](http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

- 项目源码分析

```js
function findMatches(wordToMatch, poetrys) {
 return poetrys.filter(poet => {
   // 正则找出匹配的诗句
   const regex = new RegExp(wordToMatch, 'gi');
   const author = poet.detail_author.join('');
   //			console.log(author);
   return poet.detail_text.match(regex) || poet.title.match(regex) || author.match(regex);
 });
}

function displayMatches() {
 const matches = findMatches(this.value, poetrys);
 const regex = new RegExp(this.value, 'gi');
 const html = matches.map(poet => {
   // 替换高亮的标签
   const text = poet.detail_text.replace(regex, `<span class="hl">${ this.value }</span>`);
   const title = poet.title.replace(regex, `<span class="hl">${ this.value }</span>`);
   const detail_author = poet.detail_author[0].replace(regex, `<span class="hl">${ this.value }</span>`);
   // 构造 HTML 值
   return `
 <li>
   <span class="poet">${ text }</span>
   <span class="title">${ title } - ${ detail_author }</span>
 </li>
`;
 }).join('');
 //		console.log(html);
 suggestions.innerHTML = html;
}
```

- `poetrys.filter`会返回带搜索关键字的新数组。

- `const regex = new RegExp(this.value, 'gi');` 代表匹配规则。

- `g`：执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
- `i`：执行对大小写不敏感的匹配。

- 上面的这种写法等价于："/this.value/gi"。

- `matches.map`会返回一个按照新的规则处理完以后的新的数组。

- `title.replace(regex, "新字符串");`表示将title字符串中满足 `regex` 规则的字符串替换成`新字符串`。

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

