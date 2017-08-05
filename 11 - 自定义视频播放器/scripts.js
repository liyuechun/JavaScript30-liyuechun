// 获取所有的页面元素
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


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

function handleprogressBar(e){
    let pice = (e.offsetX / progress.offsetWidth) * video.duration;
    // let pice = (e.offsetX / progress.clientWidth) * video.duration;
    video.currentTime = pice;
}
function progressBarUpdate(){
    let portion = parseFloat(video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${portion}%`;
}

// 事件监听
video.addEventListener('click',videoplay);
// video.addEventListener('click',handleToggle);
video.addEventListener('play',handleToggle);
video.addEventListener('pause',handleToggle);
video.addEventListener('timeupdate',progressBarUpdate);


toggle.addEventListener('click',videoplay);
toggle.addEventListener('click',handleToggle);

let mouseflag = false;
ranges.forEach(item => item.addEventListener('click',handlePlayerSlider));
ranges.forEach(item => item.addEventListener('mousedown',() => mouseflag = true));
ranges.forEach(item => item.addEventListener('mouseup',() => mouseflag = false));
ranges.forEach(item => item.addEventListener('mousemove',(e) => mouseflag && handlePlayerSlider(e)));

skipButtons.forEach(item => item.addEventListener('click',handleSkip));

let progressBarflag = false;
progress.addEventListener('click',handleprogressBar);
progress.addEventListener('mousemove',(e) => progressBarflag && handleprogressBar(e));
progress.addEventListener('mousedown',() => progressBarflag = true);
progress.addEventListener('mouseup',() => progressBarflag = false);
