# Day10 - JS 实现 Checkbox 中按住 Shift 的多选功能


> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 10 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

## 项目效果

![](http://om1c35wrq.bkt.clouddn.com/day10-1.gif)

## 操作方法

1. 选中 A 项
2. 按下 Shift
3. 再选中 B 项
4. A-B 之间的所有项都被选中或者取消


## 实现方法

### 方法一

Wes Bos 在文档里提供了一种解决办法：用一个变量，来标记这个范围。

变量初始值为 `false`，当按下 Shift 键且同时选中了某个元素的时候，遍历所有项，遍历过程中，若遇到 A 或 B，则将标记值取反。同时，将所有标记为 `true` 的项设置为选中。

```js
let startChecked;

//	处理方法一：用变量 inBetween 对需要选中的元素进行标记
function handleCheck0(e) {
	let inBetween = false;
	if(e.shiftKey && this.checked){
		boxs.forEach(input => {
			console.log(input);
			if(input === startChecked || input ===this) {
				inBetween = !inBetween;
			}
			if(inBetween) {
				console.log("on");
				input.checked = true;
			}
	});
	}
	startChecked = this;
}
```
 

### 方法二

上面会出现一个问题，初次加载页面时，按住 Shift 再点击某一项，此项之后的元素都会被选中。此外，对于取消选中，无法批量操作。下面方法三是[缉熙Soyaine](https://github.com/soyaine) 的操作逻辑。方法二是我对`Wes Bos`实现方法逻辑的改进，方法二和方法三取消和选中均可批量操作。

```js

let startChecked;
let onOff = false;
//	处理方法二：新增onOff变量存储复选框将要改变的状态
function handleCheck2(e) {
 let inBetween = false;
 if (e.shiftKey) {
   onOff = startChecked.checked ? true : false;
   boxs.forEach(input => {
     console.log(input);
     if (input === startChecked || input === this) {
       inBetween = !inBetween;
     }
     if (inBetween && input !== startChecked || input === this) {
       input.checked = onOff;
     }
   });
   startChecked = this;
 }
 startChecked = this;
}
```

**onOff = startChecked.checked ? true : false;** 根据`startChecked`设置要改变的状态。同时在`if (inBetween && input !== startChecked || input === this)`代码里面做了修改，新增了`|| input === this`，否则会出现最后一个的状态和其他复选框状态不一致的bug。


### 方法三

方法一中的 `inBetween` 仅仅表示此项是否在被选中的范围中，此处会赋给它更多的意义，用它来表示此项是选中还是未选中，而范围划定则由数组来解决。

首先将获取到的 `<input>` 组转化为数组，针对每次操作，获取 A 和 B，利用 `indexOf()` 来获得 A 和 B 在数组中的索引值，由此即可确定范围，并能通过 `slice()` 来直接截取 A-B 的所有 DOM 元素，并进行状态改变的操作，而变量 `onOff` 表示 A-B 范围内的状态，`true` 表示选中，`false` 表示取消选中。


```js
const boxArr = Array.from(boxs);
let startChecked;
let onOff = false;

// 处理方法二：利用数组索引获取需要选中的范围
function handleCheck1(e) {
	if(!startChecked) startChecked = this;
	onOff = startChecked.checked ? true : false;
	if(e.shiftKey) {
		let start = boxArr.indexOf(this);
		let end = boxArr.indexOf(startChecked);
		boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
		           .forEach(input => input.checked = onOff);
		console.log(start + "+" + end);
	}
	startChecked = this;
}
```


1. 转换 Nodelist 为数组  

	```js
	const boxs = document.querySelectorAll('.inbox input[type="checkbox"]');
	const boxArr = Array.from(boxs);
	````
	
2. 针对按下了 Shift 键的情况，获取 A-B 范围  

	```js
	let start = boxArr.indexOf(this);
	let end = boxArr.indexOf(startChecked);
	```
	
3. 截取该范围内的数组元素，并改变选中状态  

	```js
	boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
					   .forEach(input => input.checked = onOff);
	```
	
4. 确定选中 or 取消选中    

	```js
	onOff = startChecked.checked ? true : false;
	```
	
5. 标记 A 值    
 
	```js
	if(!startChecked) startChecked = this;
	/* ... */
	startChecked = this;
	```
	
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






