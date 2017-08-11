const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

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
        imagedata = redEffect(imagedata);
        // imagedata = rgbsplit(imagedata);
        // ctx.globalAlpha = 0.2;
        // imagedata = greenScreen(imagedata);

        // put the image data back
        ctx.putImageData(imagedata,0,0);
    },16);
}

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

  return pixels;
}

getVideo();
video.addEventListener('canplay',printToCanvas);
