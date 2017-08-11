> 在Github上看到了[wesbos](https://twitter.com/wesbos)的一个Javascript30天挑战的[repo](https://github.com/wesbos/JavaScript30)，旨在使用纯Js来进行练习，不允许使用任何其他的库和框架，该挑战共30天，我会在这里记录下自己练习的过程和遇到的问题。

## Day19 - Webcam Fun

第十九天的练习是使用浏览器的摄像头，实时记录影像，并输出到canvas中，并用canvas对图像进行滤镜的处理。
[线上例子](http://htmlpreview.github.io/?https://github.com/winar-jin/JavaScript30-Challenge/blob/master/19%20-%20Webcam%20Fun/index.html)。
> 当你看浏览器查看这个在线例子的时候，你会发现并不能看到页面上出现你的视频画面，打开console面板，你会发现如下提示：


```
getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.
```
意思就是只有在安全的连接模式下，才可以使用getUserMedia()的api获取到摄像头的视频信息，那么什么是安全连接呢，主要有HTTPS，localhost，wss,file,chrome-extension等。
更多有关安全连接的信息，请查阅[参考文档](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features).

对于我们的这份例子，我们通过搭建本地localhost服务器，达到安全连接的方式比较方便，因此我们首先收件本地服务器，打开我们项目中的`package.json`文件，会发现里面包含了唯一一个依赖`browser-sync`，可以创建一个本地的localhost服务器，并实时的检测页面文件的变化。（关于browser-sync，更多的可以查阅[参考文档](https://browsersync.io/docs)）,使用`npm install`安装browser-sync依赖，安装成功后运行`npm start`即可运行本地localhost服务器，并实时的检测文件的变化，实时刷新。

## 主要思路
* 获取到浏览器的摄像头的影像
* 将影像的记录导出到canvas中
* 通过获取canvas中的图片信息，对图片添加滤镜

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
* `navigator.mediaDevices.getUserMedia()`方法提示用户允许使用视频或者音频设备，如果用户点击允许，则返回一个Promise对象，MediaStream对象作为此Promise对象的Resolved［成功］状态的回调函数参数；但如果用户点击拒绝或者媒体可以用的时候，同样返回一个Promise对象，且PermissionDeniedError或者NotFoundError作为此Promise的Rejected［失败］状态的回调函数参数。但是，用户也可以直接取消选择，不同意也不拒绝，所以返回的Promise对象可能既不会触发resolve 也不会触发 reject。参数为一个对象，包含要请求的视频和音频情况，布尔类型，请求权限的话为true，vice via。
更详细的内容还请进一步查阅[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)。

* `URL.createObjectURL()`方法是为了创建一个 DOMString 包含一个表示参数中给定的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示着指定的 File 对象或者 Blob 对象。
（DOMString 是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString直接映射到一个String。）
更详细的内容请进一步查看[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)。

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
* `ctx.drawImage()`更够将当前的视频流（video）中的一帧画在canvas中。
* `ctx.getImageData()`返回一个ImageData对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
* `ctx.putImageData()`:该方法是 Canvas 2D API 将数据从已有的 ImageData 对象绘制到位图的方法。 如果提供了脏矩形，只能绘制矩形的像素。 [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)
* imagedata中有大量的数据，其中分别代表了图片的颜色信息，分别为red，green，blue，alpha的值，因此我们可以同添加自定义滤镜，通过改变颜色的rgba的值，控制页面的效果。

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
* 在没次点击照相的时候，都要求播一遍音效，并且为了模拟现实情况，我们在用户点击时，设置当前的播放时间为0，再播放音效。
* `canvas.toDataURL('image/jpeg');`方法返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为96dpi。 [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)
* 接下来新建一个a元素，设置其href的值为data。在插入在文档中。实现截图成功的效果。

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
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
```
这部分主要定义了三个滤镜，由于我们通过`ctx.getImageData`可以获取到页面颜色的rgba的值，，因此我们添加滤镜的原理也是这样，通过循环改变一张图片中的所有rgba的值。就不在具体的聊各个滤镜是怎么实现的了。

## tips
* `debugger`在源程序中添加debugger，可以使程序在运行时，在此处停止，进入调试模式。

OK，这样就可以啦！😀

