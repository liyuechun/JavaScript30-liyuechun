# Day13 - 图片随屏幕滚动而滑入滑出的效果


> 作者：©[liyuechun](https://github.com/liyuechun)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 13 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。

## 项目效果

![](http://om1c35wrq.bkt.clouddn.com/day14-0.gif)

实现页面内伴随着鼠标滚动，到每个图片时图片出现，并伴随着动画出现。

## 实现思路

1. 首先要先获取需要加载动画的元素
2. 监听window的滚动事件`scroll`，绑定图片动画的函数
3. 在`checkSlide()`函数中，实现滚动到每一个图片的一半位置时，图片从两边飞入的动画效果

## 基础知识

### 1. float浮动布局

布局中常用的CSS属性是 `float` , `float`可用于实现文字环绕图片，如下：

```css
img {
  float: right;
  margin: 0 0 1em 1em;
}
```

![](http://om1c35wrq.bkt.clouddn.com/day12-1.png)




### 2. opacity透明度设置

```css
.slide-in {
  opacity: 0; 
  transition: all .5s; 
}
```

```css
.slide-in.active {
  opacity: 1; 
  transform: translateX(0%) scale(1); 
}
```

**opacity:**设置对象的透明度，值在0-1之间。

### 3. **transform**位置移动变换

[transform api](http://www.css88.com/book/css/properties/transform/transform.htm)

![](http://om1c35wrq.bkt.clouddn.com/dat14-1.png)


## 代码解析

### 1. HTML代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>图片随屏幕滚动而滑入滑出的效果</title>
</head>

<body>

  <div class="site-wrap">

    <h1>Slide in on Scroll</h1>

    <p>Consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum delectus quidem
      dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora
      in aspernatur pariaturlores sunt esse magni, ut, dignissimos.</p>
    <p>Lorem ipsum cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut
      asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt
      esse magni, ut, dignissimos.</p>
    <p>Adipisicing elit. Tempore tempora rerum..</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui
      libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas
      laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui
      libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas
      laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui
      libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas
      laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>

    <img src="http://unsplash.it/400/400" class="align-left slide-in">

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, deserunt facilis et iste corrupti omnis tenetur
      est. Iste ut est dicta dolor itaque adipisci, dolorum minima, veritatis earum provident error molestias. Ratione magni
      illo sint vel velit ut excepturi consectetur suscipit, earum modi accusamus voluptatem nostrum, praesentium numquam,
      reiciendis voluptas sit id quisquam. Consequatur in quis reprehenderit modi perspiciatis necessitatibus saepe, quidem,
      suscipit iure natus dignissimos ipsam, eligendi deleniti accusantium, rerum quibusdam fugit perferendis et optio recusandae
      sed ratione. Culpa, dolorum reprehenderit harum ab voluptas fuga, nisi eligendi natus maiores illum quas quos et aperiam
      aut doloremque optio maxime fugiat doloribus. Eum dolorum expedita quam, nesciunt</p>

    <img src="http://unsplash.it/400/401" class="align-right slide-in">

    <p> at provident praesentium atque quas rerum optio dignissimos repudiandae ullam illum quibusdam. Vel ad error quibusdam,
      illo ex totam placeat. Quos excepturi fuga, molestiae ea quisquam minus, ratione dicta consectetur officia omnis, doloribus
      voluptatibus? Veniam ipsum veritatis architecto, provident quas consequatur doloremque quam quidem earum expedita,
      ad delectus voluptatum, omnis praesentium nostrum qui aspernatur ea eaque adipisci et cumque ab? Ea voluptatum dolore
      itaque odio. Eius minima distinctio harum, officia ab nihil exercitationem. Tempora rem nemo nam temporibus molestias
      facilis minus ipsam quam doloribus consequatur debitis nesciunt tempore officiis aperiam quisquam, molestiae voluptates
      cum, fuga culpa. Distinctio accusamus quibusdam, tempore perspiciatis dolorum optio facere consequatur quidem ullam
      beatae architecto, ipsam sequi officiis dignissimos amet impedit natus necessitatibus tenetur repellendus dolor rem!
      Dicta dolorem, iure, facilis illo ex nihil ipsa amet officia, optio temporibus eum autem odit repellendus nisi. Possimus
      modi, corrupti error debitis doloribus dicta libero earum, sequi porro ut excepturi nostrum ea voluptatem nihil culpa?
      Ullam expedita eligendi obcaecati reiciendis velit provident omnis quas qui in corrupti est dolore facere ad hic, animi
      soluta assumenda consequuntur reprehenderit! Voluptate dolor nihil veniam laborum voluptas nisi pariatur sed optio
      accusantium quam consectetur, corrupti, sequi et consequuntur, excepturi doloremque. Tempore quis velit corporis neque
      fugit non sequi eaque rem hic. Facere, inventore, aspernatur. Accusantium modi atque, asperiores qui nobis soluta cumque
      suscipit excepturi possimus doloremque odit saepe perferendis temporibus molestiae nostrum voluptatum quis id sint
      quidem nesciunt culpa. Rerum labore dolor beatae blanditiis praesentium explicabo velit optio esse aperiam similique,
      voluptatem cum, maiores ipsa tempore. Reiciendis sed culpa atque inventore, nam ullam enim expedita consectetur id
      velit iusto alias vitae explicabo nemo neque odio reprehenderit soluta sint eaque. Aperiam, qui ut tenetur, voluptate
      doloremque officiis dicta quaerat voluptatem rerum natus magni. Eum amet autem dolor ullam.</p>

    <img src="http://unsplash.it/200/500" class="align-left slide-in">

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio maiores adipisci quibusdam repudiandae dolor vero
      placeat esse sit! Quibusdam saepe aperiam explicabo placeat optio, consequuntur nihil voluptatibus expedita quia vero
      perferendis, deserunt et incidunt eveniet <img src="http://unsplash.it/200/200" class="align-right slide-in"> temporibus
      doloremque possimus facilis. Possimus labore, officia dolore! Eaque ratione saepe, alias harum laboriosam deserunt
      laudantium blanditiis eum explicabo placeat reiciendis labore iste sint. Consectetur expedita dignissimos, non quos
      distinctio, eos rerum facilis eligendi. Asperiores laudantium, rerum ratione consequatur, culpa consectetur possimus
      atque ab tempore illum non dolor nesciunt. Neque, rerum. A vel non incidunt, quod doloremque dignissimos necessitatibus
      aliquid laboriosam architecto at cupiditate commodi expedita in, quae blanditiis. Deserunt labore sequi, repellat laboriosam
      est, doloremque culpa reiciendis tempore excepturi. Enim nostrum fugit itaque vel corporis ullam sed tenetur ipsa qui
      rem quam error sint, libero. Laboriosam rem, ratione. Autem blanditiis</p>


    <p>laborum neque repudiandae quam, cumque, voluptate veritatis itaque, placeat veniam ad nisi. Expedita, laborum reprehenderit
      ratione soluta velit natus, odit mollitia. Corporis rerum minima fugiat in nostrum. Assumenda natus cupiditate hic
      quidem ex, quas, amet ipsum esse dolore facilis beatae maxime qui inventore, iste? Maiores dignissimos dolore culpa
      debitis voluptatem harum, excepturi enim reiciendis, tempora ab ipsam illum aspernatur quasi qui porro saepe iure sunt
      eligendi tenetur quaerat ducimus quas sequi omnis aperiam suscipit! Molestiae obcaecati officiis quo, ratione eveniet,
      provident pariatur. Veniam quasi expedita distinctio, itaque molestiae sequi, dolorum nisi repellendus quia facilis
      iusto dignissimos nam? Tenetur fugit quos autem nihil, perspiciatis expedita enim tempore, alias ab maiores quis necessitatibus
      distinctio molestias eum, quidem. Delectus impedit quidem laborum, fugit vel neque quo, ipsam, quasi aspernatur quas
      odio nihil? Veniam amet reiciendis blanditiis quis reprehenderit repudiandae neque, ab ducimus, odit excepturi voluptate
      saepe ipsam. Voluptatem eum error voluptas porro officiis, amet! Molestias, fugit, ut! Tempore non magnam, amet, facere
      ducimus accusantium eos veritatis neque.</p>

    <img src="http://unsplash.it/400/400" class="align-right slide-in">

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio maiores adipisci quibusdam repudiandae dolor vero
      placeat esse sit! Quibusdam saepe aperiam explicabo placeat optio, consequuntur nihil voluptatibus expedita quia vero
      perferendis, deserunt et incidunt eveniet temporibus doloremque possimus facilis. Possimus labore, officia dolore!
      Eaque ratione saepe, alias harum laboriosam deserunt laudantium blanditiis eum explicabo placeat reiciendis labore
      iste sint. Consectetur expedita dignissimos, non quos distinctio, eos rerum facilis eligendi. Asperiores laudantium,
      rerum ratione consequatur, culpa consectetur possimus atque ab tempore illum non dolor nesciunt. Neque, rerum. A vel
      non incidunt, quod doloremque dignissimos necessitatibus aliquid laboriosam architecto at cupiditate commodi expedita
      in, quae blanditiis. Deserunt labore sequi, repellat laboriosam est, doloremque culpa reiciendis tempore excepturi.
      Enim nostrum fugit itaque vel corporis ullam sed tenetur ipsa qui rem quam error sint, libero. Laboriosam rem, ratione.
      Autem blanditiis laborum neque repudiandae quam, cumque, voluptate veritatis itaque, placeat veniam ad nisi. Expedita,
      laborum reprehenderit ratione soluta velit natus, odit mollitia. Corporis rerum minima fugiat in nostrum. Assumenda
      natus cupiditate hic quidem ex, quas, amet ipsum esse dolore facilis beatae maxime qui inventore, iste? Maiores dignissimos
      dolore culpa debitis voluptatem harum, excepturi enim reiciendis, tempora ab ipsam illum aspernatur quasi qui porro
      saepe iure sunt eligendi tenetur quaerat ducimus quas sequi omnis aperiam suscipit! Molestiae obcaecati officiis quo,
      ratione eveniet, provident pariatur. Veniam quasi expedita distinctio, itaque molestiae sequi, dolorum nisi repellendus
      quia facilis iusto dignissimos nam? Tenetur fugit quos autem nihil, perspiciatis expedita enim tempore, alias ab maiores
      quis necessitatibus distinctio molestias eum, quidem. Delectus impedit quidem laborum, fugit vel neque quo, ipsam,
      quasi aspernatur quas odio nihil? Veniam amet reiciendis blanditiis quis reprehenderit repudiandae neque, ab ducimus,
      odit excepturi voluptate saepe ipsam. Voluptatem eum error voluptas porro officiis, amet! Molestias, fugit, ut! Tempore
      non magnam, amet, facere ducimus accusantium eos veritatis neque.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio maiores adipisci quibusdam repudiandae dolor vero
      placeat esse sit! Quibusdam saepe aperiam explicabo placeat optio, consequuntur nihil voluptatibus expedita quia vero
      perferendis, deserunt et incidunt eveniet temporibus doloremque possimus facilis. Possimus labore, officia dolore!
      Eaque ratione saepe, alias harum laboriosam deserunt laudantium blanditiis eum explicabo placeat reiciendis labore
      iste sint. Consectetur expedita dignissimos, non quos distinctio, eos rerum facilis eligendi. Asperiores laudantium,
      rerum ratione consequatur, culpa consectetur possimus atque ab tempore illum non dolor nesciunt. Neque, rerum. A vel
      non incidunt, quod doloremque dignissimos necessitatibus aliquid laboriosam architecto at cupiditate commodi expedita
      in, quae blanditiis. Deserunt labore sequi, repellat laboriosam est, doloremque culpa reiciendis tempore excepturi.
      Enim nostrum fugit itaque vel corporis ullam sed tenetur ipsa qui rem quam error sint, libero. Laboriosam rem, ratione.
      Autem blanditiis laborum neque repudiandae quam, cumque, voluptate veritatis itaque, placeat veniam ad nisi. Expedita,
      laborum reprehenderit ratione soluta velit natus, odit mollitia. Corporis rerum minima fugiat in nostrum. Assumenda
      natus cupiditate hic quidem ex, quas, amet ipsum esse dolore facilis beatae maxime qui inventore, iste? Maiores dignissimos
      dolore culpa debitis voluptatem harum, excepturi enim reiciendis, tempora ab ipsam illum aspernatur quasi qui porro
      saepe iure sunt eligendi tenetur quaerat ducimus quas sequi omnis aperiam suscipit! Molestiae obcaecati officiis quo,
      ratione eveniet, provident pariatur. Veniam quasi expedita distinctio, itaque molestiae sequi, dolorum nisi repellendus
      quia facilis iusto dignissimos nam? Tenetur fugit quos autem nihil, perspiciatis expedita enim tempore, alias ab maiores
      quis necessitatibus distinctio molestias eum, quidem. Delectus impedit quidem laborum, fugit vel neque quo, ipsam,
      quasi aspernatur quas odio nihil? Veniam amet reiciendis blanditiis quis reprehenderit repudiandae neque, ab ducimus,
      odit excepturi voluptate saepe ipsam. Voluptatem eum error voluptas porro officiis, amet! Molestias, fugit, ut! Tempore
      non magnam, amet, facere ducimus accusantium eos veritatis neque.</p>

  </div>
</body>
</html>
```


### 2. CSS代码


```css
  <style>
    html {
      box-sizing: border-box;
      background: #ffc600;
      font-family: 'helvetica neue';
      font-size: 20px;
      font-weight: 200;
    }

    body {
      margin: 0;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    h1 {
      margin-top: 0;
    }

    .site-wrap {
      max-width: 700px;
      margin: 100px auto;
      background: white;
      padding: 40px;
      text-align: justify;
    }

    .align-left {
      float: left;
      margin-right: 20px;
    }

    .align-right {
      float: right;
      margin-left: 20px; 
    }

    .slide-in {
       opacity: 0; 
       transition: all .5s; 
    }

    .align-left.slide-in {
        transform: translateX(-30%) scale(0.95);  
    }

    .align-right.slide-in {
        transform: translateX(30%) scale(0.95);  
    }

    .slide-in.active {
       opacity: 1; 
       transform: translateX(0%) scale(1); 
    }
  </style>
```

### 3. JS代码逻辑

[https://developer.mozilla.org/zh-CN/docs/Web/API/Window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)

```js
<script>
    
// 获取所有需要参与动画的图片
const sliderImages = document.querySelectorAll('.slide-in');
    
function checkSlide(e) {
 sliderImages.forEach(sliderimage => {
   // 滑动到图片显示的一半
   const slideAt = window.innerHeight + window.scrollY - sliderimage.height / 2;
   // 图片底部距文档顶部的距离
   const imageBottom = sliderimage.offsetTop + sliderimage.height;
   // 图片是否已经显示了一半
   const isHalfShown = slideAt > sliderimage.offsetTop;
   // 图片是否已经被完全滚动出去
   const isNotScrolledPast = window.scrollY < imageBottom;
   if (isHalfShown && isNotScrolledPast) {
     sliderimage.classList.add('active');
   } else {
     sliderimage.classList.remove('active');
   }
 });
}
// 监听滚动
window.addEventListener('scroll', checkSlide);
</script>
```

![](http://om1c35wrq.bkt.clouddn.com/day13-%E8%AF%B4%E6%98%8E.png)

* 首先获取触发动画的位置，在滚动到图片一半的位置时触发。
`const slideAt = window.innerHeight + window.scrollY - sliderimage.height/2;`
	* `window.innerHeight`表示浏览器的内部视图窗口的高度值
	* `window.scrollY`表示浏览器当前的在Y轴上滚动的距离（未滚动时值为0），也可通过采用`window.scroll(X,Y)`方法，设置页面在X轴和Y轴上面的滚动值
* 再获取图片底部到页面文档顶端的距离，采用`const imageBottom = sliderimage.offsetTop + sliderimage.height;`
	* `sliderimage.offsetTop`表示该图片最上面的值，到页面文档顶端的距离，再加上该图片的高度，就是图片底部到页面文档顶端的距离
* 设置两个flag，分别表示图片是否显示了一半和图片是否已经被完全滚动出去了，分别为`const isHalfShown = slideAt > sliderimage.offsetTop;`，`const isNotScrolledPast = window.scrollY < imageBottom;`
* 只有当图片已经显示了一半并且没有被图片没有被滚动出窗口是，图片才会显示出来，此处的动画处理方式如下：默认时将图片向左或向右移动30%，当图片出现在窗口中时，取消该图片的移动，显示在原位置；再加上`transition: all .5s;`，在图片出现的时候，就会显示出约0.5秒的过渡动画。

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





