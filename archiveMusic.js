import { playbackProcessing, timeAudio } from "./listenMusic.js";

function getInfo() {
    const info = JSON.parse(localStorage.getItem('songsRecently'));
    if(info) {
        creat(info);
        getSrc(info);
    } else {
        console.log('No songs');
    }
}

function getSrc(data) {
    audio.setAttribute('src', data.src);
    timeUpdate(data);
}

function creat(data) {
    const control = document.querySelector('.control-music');
    
    const minutes = Math.floor(data.curentTime / 60);
    const seconds = Math.floor(data.curentTime % 60);
    const timeCurrent = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

    const minuteTotal = Math.floor(data.durationTime / 60);
    const secondTotal = Math.floor(data.durationTime % 60);
    const totalTime = (minuteTotal < 10 ? '0' + minuteTotal : minuteTotal) + ':' + (secondTotal < 10 ? '0' + secondTotal : secondTotal);
    

    if(control) {
        control.innerHTML = `
            <div class="bar-music">
                <div class="media-left">
                    <div class="thumb">
                        <a href="" class="thumbCover">
                            <img src="${data.thumbnailM}" alt="">
                        </a>
                    </div>

                    <div class="title">
                        <div class="infoMusic">
                            <h3 class="nameMusic">${data.title}</h3>
                            <p class="nameArtist">
                                ${data.artistsNames}
                            </p>
                        </div>
                    </div>

                    <div class="event">
                        <button class="icon saveMusic">
                            <i class="bi bi-suit-heart"></i>
                        </button>
                        <button class="icon more">
                            <i class="bi bi-three-dots"></i>
                        </button>
                    </div>
                </div>
                <div class="media-center">
                    <div class="event-action">
                        <div class="action">
                            <button class="act act-shuffle">
                                <i class="bi bi-shuffle"></i>
                            </button>
                            <button class="act act-skip-start">
                                <i class="bi bi-skip-start-fill"></i>
                            </button>
                            <button class="act act-play">
                                <i class="bi bi-play-circle"></i>
                            </button>
                            <button class="act act-skip-end">
                                <i class="bi bi-skip-end-fill"></i>
                            </button>
                            <button class="act act-repeat">
                                <i class="bi bi-repeat"></i>
                            </button>
                        </div>
                    </div>

                    <div class="progress">
                        <span class="time currentTime">${timeCurrent}</span>
                        <div class="music-slider">
                            <input type="range" min="0" max="100" value="0" class="slider" id="myRange">
                            <div class="progress-slider"></div>
                        </div>
                        <span class="time durationTime">
                            ${totalTime}
                        </span>
                    </div>
                </div>
                <div class="media-right">
                    <div class="handle-control">
                        <button class="icon-bar">
                            <i class="bi bi-chevron-down"></i>
                        </button>
                    </div>
                </div>
            </div> 
        `
    }
    playbackProcessing();
    timeAudio();
}

function timeUpdate(data) {
    const obj = JSON.parse(localStorage.getItem('songsRecently'));
    audio.currentTime = data.curentTime;
    audio.addEventListener('timeupdate', () => {
        obj.curentTime = audio.currentTime;
        localStorage.setItem('songsRecently', JSON.stringify(obj));
    });
}

window.addEventListener('DOMContentLoaded', () => {
    getInfo();
})