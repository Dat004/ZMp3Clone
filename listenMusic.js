export async function getMusic(array, id) {
    const link = 'https://server-tau-six.vercel.app/api/song?id=';
    const reponse = await fetch(link + array[id].encodeId);
    const data = await reponse.json();

    handleProperties(array, data, id);
}

function songsRecenttly(array, data, id) {
    audio.addEventListener('canplaythrough', () => {
        const durationTime = audio.duration;
        audio.addEventListener('timeupdate', () => {
            const curentTime = audio.currentTime;
            
            const songsRecently = {
                thumbnailM: array[id].thumbnailM,
                title: array[id].title,
                artistsNames: array[id].artistsNames,
                src: audio.getAttribute('src'),
                curentTime: curentTime,
                durationTime: durationTime,
            }
        
            localStorage.setItem('songsRecently', JSON.stringify(songsRecently));
        });
    })
}

function handleProperties(array, data, id) {
    if(data.hasOwnProperty('data')) {
        setSrc(data.data['128']);
        timeAudio();
        songsRecenttly(array, data, id);
    } else {
        setSrc('');
        timeAudio();
        msgError(data.msg);
    }
}

function msgError(msg) {
    const errorElement = document.querySelector('.msg.msg-error');
    if(errorElement) {
        const barError = document.createElement('div');
        barError.className = 'bar-msg';
        barError.innerHTML = `
            <div class="msg-title">
                <p>
                    ${msg}
                </p>

                </div>
            <i class="bi bi-x"</i>
        `;

        errorElement.appendChild(barError);
        handleDelete(barError, 3500);
    }


}

function handleDelete(barError, timeDelays) {
    const setTime = setTimeout(() => {
        barError.outerHTML = "";
    }, timeDelays + 500)

    barError.addEventListener('click', (e) => {
        const btnDelete = e.target.closest('.bi.bi-x');

        if(btnDelete) {
            clearTimeout(setTime);
            barError.outerHTML = "";
        }
    })
}   

function setSrc(data) {
    audio.setAttribute('src', data);
    autoPlay();
}

export function creatBarControls(array, id) {
    const control = document.querySelector('.control-music');

    if(control) {
        control.innerHTML = `
            <div class="bar-music">
                <div class="media-left">
                    <div class="thumb">
                        <a href="" class="thumbCover">
                            <img src="${array[id].thumbnailM}" alt="">
                        </a>
                    </div>

                    <div class="title">
                        <div class="infoMusic">
                            <h3 class="nameMusic">${array[id].title}</h3>
                            <p class="nameArtist">
                                ${array[id].artistsNames}
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
                        <span class="time currentTime">00:00</span>
                        <div class="music-slider">
                            <input type="range" min="0" max="100" value="0" class="slider" id="myRange">
                            <div class="progress-slider"></div>
                        </div>
                        <span class="time durationTime">
                            00:00
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
    postTransferHandling(array, id);
}

function autoPlay() {
    audio.autoplay = true;
}

export function playbackProcessing() {
    const btnPlay = document.querySelector('.act.act-play');
    
    btnPlay.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('pause', () => {
        const play = `
            <i class="bi bi-play-circle"></i>
        `

        btnPlay.innerHTML = play;
    });

    audio.addEventListener('play', () => {
        const pause = `
            <i class="bi bi-pause-circle"></i>
        `

        btnPlay.innerHTML = pause;
    });
}

export function postTransferHandling(array, id) {
    const btnSkipStart = document.querySelector('.act.act-skip-start');
    const btnSkipEnd = document.querySelector('.act.act-skip-end');

    btnSkipEnd.addEventListener('click', () => {
        ++id;
        if(id >= array.length) {
            id = 0;
        }

        getMusic(array, id);
        creatBarControls(array, id);
    });

    btnSkipStart.addEventListener('click', () => {
        --id;
        if(id < 0) {
            id = array.length - 1;
        } 

        getMusic(array, id);
        creatBarControls(array, id);
    });
}

export function timeAudio() {   
    const slider = document.getElementById("myRange");
    const progressBar = document.querySelector('.music-slider .progress-slider');
    const currentAudio = document.querySelector('.time.currentTime');
    const durationAudio = document.querySelector('.time.durationTime');

    audio.addEventListener('canplaythrough', () => {
        const durationTime = audio.duration;
        audio.addEventListener('timeupdate', () => {
            slider.addEventListener('change', (e) => {
                const currentValue = e.target.value / 100 * durationTime;
                audio.currentTime = currentValue;
                progressBar.style.width = e.target.value + '%';
            });

            const curentTime = audio.currentTime;
            const minutes = Math.floor(curentTime / 60);
            const seconds = Math.floor(curentTime % 60);
            const timeCurrent = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

            const minuteTotal = Math.floor(durationTime / 60);
            const secondTotal = Math.floor(durationTime % 60);
            const totalTime = (minuteTotal < 10 ? '0' + minuteTotal : minuteTotal) + ':' + (secondTotal < 10 ? '0' + secondTotal : secondTotal);

            const currentPercentage = curentTime / durationTime * 100;
            progressBar.style.width = currentPercentage + '%';

            currentAudio.innerHTML = timeCurrent;
            durationAudio.innerHTML = totalTime;
        });
    })
}