// 获取所有的页面元素
let video = document.querySelector('.viewer');
let progress = document.querySelector('.progress');
let toggle = document.querySelector('.toggle');
let player__slider = document.querySelectorAll('.player__slider');
let skip = document.querySelectorAll('[data-skip]');
let filled = document.querySelector('.progress__filled');
let progressBar = document.querySelector('.progress');

// 实现函数
function videoplay(e){
    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function handleToggle(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handlePlayerSlider(e){
    video[e.target.name] = e.target.value;
}

function handleSkip(e){
    let skiptime = parseFloat(this.dataset.skip);
    video.currentTime += skiptime;
}

function handlefilled(e){    
    let pice = (e.offsetX / progressBar.offsetWidth) * video.duration;
    // let pice = (e.offsetX / progressBar.clientWidth) * video.duration;
    video.currentTime = pice;
}
function filledUpdate(){
    let portion = parseFloat(video.currentTime / video.duration) * 100;
    filled.style.flexBasis = `${portion}%`;
}

// 事件监听
video.addEventListener('click',videoplay);
// video.addEventListener('click',handleToggle);
video.addEventListener('play',handleToggle);
video.addEventListener('pause',handleToggle);
video.addEventListener('timeupdate',filledUpdate);


toggle.addEventListener('click',videoplay);
toggle.addEventListener('click',handleToggle);

let mouseflag = false;
player__slider.forEach(item => item.addEventListener('click',handlePlayerSlider));
player__slider.forEach(item => item.addEventListener('mousedown',() => mouseflag = true));
player__slider.forEach(item => item.addEventListener('mouseup',() => mouseflag = false));
player__slider.forEach(item => item.addEventListener('mousemove',(e) => mouseflag && handlePlayerSlider(e)));

skip.forEach(item => item.addEventListener('click',handleSkip));

let filledflag = false;
progressBar.addEventListener('click',handlefilled);
progressBar.addEventListener('mousemove',(e) => filledflag && handlefilled(e));
progressBar.addEventListener('mousedown',() => filledflag = true);
progressBar.addEventListener('mouseup',() => filledflag = false);