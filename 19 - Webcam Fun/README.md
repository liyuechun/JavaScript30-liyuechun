# Day19 - 摄像、拍照，滤镜中文指南

> 本文出自：[春哥个人博客：http://www.liyuechun.org](http://liyuechun.org)
> 作者：©[黎跃春-追时间的人](http://weibo.com/mobiledevelopment)
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 19 篇。完整中文版指南及视频教程在 [从零到壹全栈部落](http://kongyixueyuan.com/course/4188)。


## 效果图

![](http://om1c35wrq.bkt.clouddn.com/day19.gif)
![](http://om1c35wrq.bkt.clouddn.com/day19-red%E6%95%88%E6%9E%9C%E5%9B%BE.png)

JS30天第19天挑战的是如何调用摄像头录像、播放，如何捕捉视频将其绘制`canvas`，还有拍照，以及滤镜的制作。


## 运行项目

1. 通过`npm install`安装依赖包
2. 通过`npm start`启动服务器
3. 浏览器直接访问`http://localhost:3000`

```js
liyuechun:19 - Webcam Fun yuechunli$ pwd
/Users/liyuechun/Documents/js30/JavaScript30-liyuechun/19 - Webcam Fun
liyuechun:19 - Webcam Fun yuechunli$ ls
README.md		package-lock.json	scripts.js
index.html		package.json		style.css
liyuechun:19 - Webcam Fun yuechunli$ npm install

> fsevents@1.1.2 install /Users/liyuechun/Documents/js30/JavaScript30-liyuechun/19 - Webcam Fun/node_modules/fsevents
> node install

[fsevents] Success: "/Users/liyuechun/Documents/js30/JavaScript30-liyuechun/19 - Webcam Fun/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
Pass --update-binary to reinstall or --build-from-source to recompile
npm WARN gum@1.0.0 No repository field.

added 411 packages in 5.921s
liyuechun:19 - Webcam Fun yuechunli$ npm start

> gum@1.0.0 start /Users/liyuechun/Documents/js30/JavaScript30-liyuechun/19 - Webcam Fun
> browser-sync start --server --files '*.css, *.html, *.js'

[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.116:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.116:3001
 --------------------------------------
[Browsersync] Serving files from: ./
[Browsersync] Watching files...
```

## 主要思路

* 获取到浏览器的摄像头的影像
* 将影像的记录导出到canvas中
* 通过获取canvas中的图片信息，对图片添加滤镜


## Browsersync

#### 项目结构

![](http://om1c35wrq.bkt.clouddn.com/Snip20170809_21.png)

#### 了解Browsersync

省时的浏览器同步测试工具,Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是`Browsersync可以同时在PC、平板、手机`等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。无论您是前端还是后端工程师，使用它将提高您30%的工作效率。

![](http://om1c35wrq.bkt.clouddn.com/sync-demo.gif)

有了它，您不用在多个浏览器、多个设备间来回切换，频繁的刷新页面。更神奇的是您在一个浏览器中滚动页面、点击等行为也会同步到其他浏览器和设备中，这一切还可以通过可视化界面来控制。

![](http://om1c35wrq.bkt.clouddn.com/scroll-demo.gif)

## 获取影像

```javascript
function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
        .then(videostream => {
            console.log(videostream);
            video.src = URL.createObjectURL(videostream); // 创建url（creates  a URL for the specified object）
            video.play();
        })
        .catch((err) => {
            console.error('OH,Don\'t have permission to use your local cam!',err);
        });
}
```

- [MediaDevices.getUserMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)
> `MediaDevices.getUserMedia()`方法提示用户允许使用一个视频和/或一个音频输入设备，例如相机或屏幕共享和/或麦克风。如果用户给予许可，就返回一个`Promise`对象，`MediaStream`对象作为此`Promise`对象的`Resolved`［成功］状态的回调函数参数，相应的，如果用户拒绝了许可，或者没有媒体可用的情况下，`PermissionDeniedError`或者`NotFoundError`作为此`Promise`的`Rejected`［失败］状态的回调函数参数。注意，由于用户不会被要求必须作出允许或者拒绝的选择，所以返回的`Promise`对象可能既不会触发`resolve`也不会触发`reject`。


- [URL.createObjectURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)。
> `URL.createObjectURL()` 静态方法会创建一个`DOMString`，其中包含一个表示参数中给出的对象的`URL`。这个`URL` 的生命周期和创建它的窗口中的`document` 绑定。这个新的`URL`对象表示指定的`File` 对象或`Blob` 对象。

## canvas绘图
```javascript
function printToCanvas(){
    let width = video.videoWidth;
    let height = video.videoHeight;
    canvas.height = height;
    canvas.width = width; // 勿忘：设置canvas的宽和高
    console.log(width,height);
    return setInterval(() => {
        ctx.drawImage(video,0,0,width,height);

        // get the image data
        let imagedata = ctx.getImageData(0,0,width,height);
        // console.log(imagedata.data);

        // mess the image data
        // imagedata = redEffect(imagedata);
        // imagedata = rgbsplit(imagedata);
        // ctx.globalAlpha = 0.2;
        imagedata = greenScreen(imagedata);

        // put the image data back
        ctx.putImageData(imagedata,0,0);
    },16);
}
```
* `ctx.drawImage()`
>它能够将当前的视频流（video）中的一帧画在canvas中。

- [getImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
> `ctx.getImageData()`返回一个ImageData对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。

- [putImageData()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)
> `ctx.putImageData()`:该方法是 Canvas 2D API 将数据从已有的 ImageData 对象绘制到位图的方法。 如果提供了脏矩形，只能绘制矩形的像素。

- imagedata信息
> imagedata中有大量的数据，其中分别代表了图片的颜色信息，分别为red，green，blue，alpha的值，因此我们可以同添加自定义滤镜，通过改变颜色的rgba的值，控制页面的效果。

## 摄像记录导出到canvas中

```javascript
function takePhoto(){
    // 播放音效
    snap.currentTime = 0;
    snap.play();
    
    // 获取图像数据
    let data = canvas.toDataURL('image/jpeg');
    // console.log(data);
    let link = document.createElement('a');
    link.href = data;
    link.setAttribute('downlond','handsome');
    link.innerHTML = `<img src=${data} alt=handsome>`
    strip.insertBefore(link,strip.firstChild);
}
```
- 在没次点击照相的时候，都要求播一遍音效，并且为了模拟现实情况，我们在用户点击时，设置当前的播放时间为0，再播放音效。
- [canvas.toDataURL('image/jpeg');](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)方法返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为96dpi。 
- 接下来新建一个a元素，设置其href的值为data。在插入在文档中。实现截图成功的效果。

## 自定义滤镜

```javascript
// 红色特效滤镜
function redEffect(imagedata){
    for(let i = 0;i<imagedata.data.length;i+=4){
        imagedata.data[i + 0] += 200; // red
        imagedata.data[i + 1] -= 50; // green
        imagedata.data[i + 2] *= 0.5; // blue
    }
    return imagedata;
}

// RGB分离
function rgbsplit(imagedata){
    for(let i = 0;i<imagedata.data.length;i+=4){
        imagedata.data[i - 100] = imagedata.data[i + 0]; // red
        imagedata.data[i + 150] = imagedata.data[i + 1]; // green
        imagedata.data[i - 150] = imagedata.data[i + 2]; // blue
    }
    return imagedata;
}

// 绿屏（部分消失）
function greenScreen(imagedata) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = imagedata.data[i + 0];
    green = imagedata.data[i + 1];
    blue = imagedata.data[i + 2];
    alpha = imagedata.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      imagedata.data[i + 3] = 0;
    }
  }

  return imagedata;
}
```
这部分主要定义了三个滤镜，由于我们通过`ctx.getImageData`可以获取到页面颜色的rgba的值，因此我们添加滤镜的原理也是这样，通过循环改变一张图片中的所有rgba的值即可。


## 源码下载

[Github Source Code](https://github.com/liyuechun/JavaScript30-liyuechun)

|全栈部落|区块链部落|
|:---------:|:------:|
|![](http://orhm8wuhd.bkt.clouddn.com/quanzhanbuluo100.jpeg)|![](http://orhm8wuhd.bkt.clouddn.com/qukuailian100.jpg)|


