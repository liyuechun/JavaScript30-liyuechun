
# Day15 - LocalStorage

> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment) 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 14 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图
![](http://om1c35wrq.bkt.clouddn.com/day15-0.gif)****


第十五天主要是练习`LocalStorage`（本地存储）以及时间委托的使用，使用场景是一个简单的`todo list`的应用，实现基本的添加`item`，切换完成状态，将所有`todo`项存储在`localstorage`中，保证刷新浏览器后数据不丢失。

## 主要思路

* 提前预定义好所有用到的变量；


```Javascript
// 添加item的按钮
const addItems = document.querySelector('.add-items'); 
// todolist列表
const itemsList = document.querySelector('.plates'); 
// 本地缓存的所有todoitem
const items = JSON.parse(localStorage.getItem('items')) || []; 
```
* 为`addItems`按钮添加事件函数，添加一个新的`todo item`并存储到本地缓存；
* 监听`checkbox`的点击事件，切换是否完成的状态，并更新本地存储，保证刷新本页面是数据不会丢失；
* 分别设置两个监听器，监听`addItems`的`submit`事件，和`itemsList`的点击事件；

## 添加item事件
* 添加item的主要代码如下

```Javascript
function addItem(e) {
  // 阻止默认事件的触发，防止在提交后页面自己刷新
  e.preventDefault(); 
  const text = this.querySelector('[name=item]').value;
  const item = {
    // ES6的简写形式 => text: text;
    text, 
    done: false
  };
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  // 添加完数据后，重置输入框 
  this.reset();      
}
addItems.addEventListener('submit', addItem);
```
* 监听`addItems`的`submit`事件，当用户点击`enter`或者点击右侧的`submit`按钮的时候触发；
* `text,`是ES6的缩写形式，即代表`text: text；`
*`localStorage`的常用API：
	* `localStorage.setItem(‘key’,value); ->` 设置本地缓存，以`key-value`的形式
	* `localStorage.getItem(‘key’); ->` 根据参数key取得本地缓存中对应的值
	* `localStorage.clear();  ->` 清空本地的缓存
	* `localStorage.removeItem(‘key’); ->` 删除key所对应的那一条本地缓存
* `localStorage`中只能存储字符串，所以我们经常会用到： `JSON.stringify(object)`将一个对象转换为字符串，再使用`JSON.parse(objSting)`将一个对象字符串转换为对象
* `this.reset();`代表将表单重置，清空表单中的值，在我们进行了一次submit之后，如果不重置表单的话，表单中的值将不会消失，这将大大影响用户体验

## 切换完成状态事件

```Javascript
function toggleDone(e) {
  // if(!e.target.nodeName.match('INPUT')) return;
  
  // 跳过所有的input，只处理label
  if (!e.target.matches('input')) return; 
  const node = e.target;
  const index = node.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}
itemsList.addEventListener('click', toggleDone);
```
* 此处使用到了事件委托，所谓事件委托，我是这么理解的：
	* 假设我们队一个input列表进行了事件监听，但我们如法保证，此列表在接下来的状态下是否进行了更新，刷新等改变原来节点的操作，如果有这样的操作出现，那么我们之前的事件监听器就无法再起到监听的作用；
	* 但我们可以对input列表的父元素进行事件监听，让它们的父元素处于监听状态，当我们所点击的元素是其子元素的话，就告诉它的子元素，执行相应的事件；
	* 相当于委托父元素帮我们监听所有子元素，这样无论子元素列表进行怎么样的更新，改变，只要父元素节点不发生改变就可以持续起到监听的 作用。
	* 通过`e.target.matches('input')`可以判断所点击的元素是不是input元素，`e.target`返回所点击的宿主元素。
* 通过获取到所点击的列表的序号，更改其`done`属性，更新后进行存储，就可以实现完成状态的事件。

## 列表显示函数

```Javascript
   // 设置默认值，防止传参数出错的时候crash
function populateList(populates = [], place {   
    place.innerHTML = populates.map((populate, index) => {
    //之所以用‘’空字符是因为如果用null的话，会出现在html中
    return `
      <li>
        <input type="checkbox" id=item${index} data-index=${index} ${populate.done ? 'checked' : ''}>
        <label for="item${index}">${(populate.text)}</label>
      </li>
    `; 
    // join()之后一定要加''，表示空字符，否则会加入逗号，造成错误  
  }).join(''); 
}
```
* 将所有的列表项转化为`li`传入页面的`html`中
* 将此函数抽象出来，以方便以后实现同样类似的操作，将一个数组中的元素动态添加到页面的一个节点中

## 清除缓存

```Javascript
    // 在关闭浏览器之后清除缓存
    window.onbeforeunload = function (e) {
      localStorage.removeItem('items');
      // let confirmationMessage = "\o/";
      e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      // return confirmationMessage; // 如果有返回值的话，就会弹出确认框。
    };
```
* 有些时候，我们仅仅是为了练习`localStorage`的使用，并不想在浏览器中留下过多的缓存，那么这个方法就派上了用场。
* 当页面重新刷新或者关闭之前，执行`localStorage.removeItem('items’);`清除页面的缓存。
* **慎用**，尤其在生产环境中。

## 整体代码架构

```Javascript
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
 e.preventDefault();
 const text = this.querySelector('[name=item]').value;
 const item = {
   text, // ES6的简写形式 => text = text;
   done: false
 };
 items.push(item);
 localStorage.setItem('items', JSON.stringify(items));
 populateList(items, itemsList);
 this.reset(); // 添加完数据后，重置输入框      
}

function populateList(populates = [], place) { // 设置默认值，防止传参数出错的时候crash
 place.innerHTML = populates.map((populate, index) => {
   return `
     <li>
       <input type="checkbox" id=item${index} data-index=${index} ${populate.done ? 'checked' : ''}>
       <label for="item${index}">${(populate.text)}</label>
     </li>
   `; //之所以用‘’空字符是因为如果用null的话，会出现在html中
 }).join(''); // join()之后一定要加''，表示空字符，否则会加入逗号，造成错误  
}

function toggleDone(e) {
 // if(!e.target.nodeName.match('INPUT')) return;
 if (!e.target.matches('input')) return; // 跳过所有的input，只处理label
 const node = e.target;
 const index = node.dataset.index;
 items[index].done = !items[index].done;
 localStorage.setItem('items', JSON.stringify(items));
 populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
```
* 在页面加载的时候，先获取本地缓存的`items`，若存在就传给变量`items`，若第一次登录或者无`item`，初始化为空数组；
* 在页面加载的时候先加载页面的所有`todolist`，执行一遍`populateList(items, itemsList);`函数即可。

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)


|全栈部落|区块链部落|
|:---------:|:------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo100.jpeg)|![](http://orhm8wuhd.bkt.clouddn.com/qukuailian100.jpg)|


