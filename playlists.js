import {creatBarControls, getMusic, postTransferHandling} from "./listenMusic.js";

function getId() {
    const id = localStorage.getItem('data-id');
    getPlaylist(id);
}

async function getPlaylist(id) {
    const link = 'https://server-tau-six.vercel.app/api/detailplaylist?id=';

    const reponse = await fetch(link + id);
    const data = await reponse.json();

    try {
        renderPoster(data);
        renderListSongs(data);
    }
    catch(err) {
        console.error(err);
    }
}

function renderPoster(data) {
    const headerMain = document.querySelector('.home.content-main .content-header');
    const totalLiked = Math.floor(data.data.like / 1000);
    const timestamp = data.timestamp;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const stringDate = (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;

    if(headerMain) {
        headerMain.innerHTML = `
            <div class="poster">
                <div class="img-poster">
                    <img src="${data.data.thumbnailM}" alt="">
                    <div class="control-layer">
                        <div class="mask-control">
                            <i class="bi bi-play-circle"></i>
                        </div>
                    </div>
                </div>

                <div class="content-poster">
                    <h3 class="title-pos">
                        ${data.data.title}
                    </h3>

                    <p class="label time-update">
                        Cập nhật: <span class="time">
                            ${stringDate}
                        </span>
                    </p>

                    <p class="label artists">
                        ${data.data.artistsNames}
                    </p>

                    <p class="label favourite">
                        <span class="users">
                            ${totalLiked}K
                        </span>
                        người yêu thích
                    </p>

                    <div class="main-btn">
                        <button class="btn-play-random">
                            <span class="icon-random">
                                <i class="bi bi-play-fill"></i>
                            </span>
                            <span>Phát Ngẫu Nhiên</span>
                        </button>
                    </div>
                </div>
            </div>
            `
        }
    }
    
function renderListSongs(data) {
    const listSongs = data.data.song.items;
    const contentMain = document.querySelector('.home.content-main .content-body.playlists .container .cont-main');
    const preface = document.querySelector('.content-body.playlists .preface');
    const total = document.querySelector('.content-body.playlists .info-list');

    if(total) {
        const hour = Math.floor(data.data.song.totalDuration / 3600);
        const minutes = Math.floor((data.data.song.totalDuration % 3600) / 60);

        total.innerHTML = `
            <p class="totalSongs">${data.data.song.total}
                <span>bài hát</span>
            </p>
            •
            <p class="totalTimes">
                ${hour} giờ ${minutes} phút
            </p>
        `
    }
    
    if(preface) {
        preface.innerHTML = `
            <p class="preface-txt">
                Lời tựa: 
                <span>
                    ${data.data.description}
                </span>
            </p>
        `
    }
        
    if(contentMain) {
        const htmls = listSongs.map((items, index) => {
            const seconds = items.duration % 60;
            const minutes = Math.floor(items.duration / 60);
            const timeLine = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
            
            const album = items.hasOwnProperty('album') ? items.album.title : ''
            
            return `
                <div class="main-section">
                    <div class="section-left">
                        <span class="icon-music">
                            <i class="bi bi-music-note-beamed"></i>
                        </span>
                        <div class="more">
                            <a href="" class="photos" data-id="${items.encodeId}">
                                <img src="${items.thumbnailM}" class="poster thumbnail">
                                <div class="layer">
                                    <span>
                                        <i class="bi bi-play-fill"></i>
                                    </span>
                                </div>
                            </a>
                            <div class="content">
                                <h4 class="name_music">${items.title}</h4>
                                <p class="sigle">${items.artistsNames}</p>
                            </div>
                        </div>
                    </div>

                    <div class="section-center">
                        <p class="hour-later albumplay">
                            ${album}
                        </p>
                    </div>

                    <div class="section-right">
                        <p class="time-duration">
                            ${timeLine}                         
                        </p>

                        <div class="vsa">
                            <div class="graph event">
                                <button class="icon saveMusic">
                                    <i class="bi bi-suit-heart"></i>
                                </button>
                                <button class="icon more">
                                    <i class="bi bi-three-dots"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>  
            `
        })

        contentMain.innerHTML = htmls.join('');
    }

    handle(listSongs);
    playRandom(listSongs);
} 

function playRandom(array) {
    const btnRandom = document.querySelector('.main-btn .btn-play-random');
    btnRandom.addEventListener('click', () => {
        const idRandom = Math.round(Math.random() * array.length)
        
        creatBarControls(array, idRandom);
        getMusic(array, idRandom);
        postTransferHandling(array, idRandom);
    })
}

function handle(list) {
    const main = document.querySelectorAll('.cont-main .main-section .photos');
    main.forEach((items, index) => {
        items.addEventListener('click', (e) => {
            e.preventDefault();

            creatBarControls(list, index);
            getMusic(list, index);
            postTransferHandling(list, index);

        })
    })

    handleAuido();
}

function handleAuido() {
    const mainImg = document.querySelector('.img-poster .control-layer .mask-control');
    const btnRandomIcon = document.querySelector('.main-btn .btn-play-random .icon-random');

    mainImg.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
    
    audio.addEventListener('play', () => {
        const pause = `
            <i class="bi bi-pause-circle"></i>
        `;

        mainImg.innerHTML = pause;
        btnRandomIcon.innerHTML = pause;
    });

    audio.addEventListener('pause', () => {
        const play = `
            <i class="bi bi-play-circle"></i>
        `

        mainImg.innerHTML = play;
        btnRandomIcon.innerHTML = play;
    });
}

window.addEventListener('load', () => {
    getId();
})
