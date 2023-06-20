import {creatBarControls, getMusic, postTransferHandling} from "./listenMusic.js";

function getKey() {
    const nameValue = localStorage.getItem('keywords');
    getData(nameValue);
}

async function getData(key) {
    const link = 'https://server-tau-six.vercel.app/api/search?keyword=';
    const reponse = await fetch(link + key);
    const data = await reponse.json();

    try{
        renderData(data);
    }
    catch(error) {
        console.log(error);
    }
}

function renderData(data) {
    const songsSearch = data.data.songs;
    const albumSearch = data.data.playlists;
    const arttistsSearch = data.data.artists;

    const songsTop = document.querySelector('.box.top .songs-top');
    const songs = document.querySelectorAll('.box.songs .box-song-zp');
    const playlist = document.querySelectorAll('.box.playlist .box-boxs');
    const artistOa = document.querySelectorAll('.box.artist-oa .artist-cont');


    if(songsTop) {
        const htmls = songsSearch.map((items, index) => {
            return `
                <div class="song-zp">
                    <div class="song-img">
                        <div class="song-inf">
                            <div class="img-thumb">
                                <img src="${items.thumbnailM}" alt="">
                                <div class="img-lay">
                                    <div class="icon-play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="img-info">
                                <p>Bài hát</p>
                                <h3>${items.title}</h3>
                                <p>${items.artistsNames}</p>
                            </div>
                        </div>
                        <div class="song-handle">
                            
                        </div>
                    </div>
                </div>
            `
        });    

        songsTop.innerHTML = htmls.join('');
    };

    if(songs) {
        const htmls = songsSearch.map((items, index) => {
            const time = items.duration;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            const durationTimes = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

            return `
                <div class="list-box">
                    <div class="list-box-img">
                        <div class="list-img">
                            <img src="${items.thumbnailM}" alt="">
                            <div class="list-lay">
                                <span>
                                    <i class="bi bi-play-fill"></i>
                                </span>
                            </div>
                        </div>
                        <div class="list-inf">
                            <h3>${items.title}</h3>
                            <p>${items.artistsNames}</p>
                        </div>
                    </div>
                    <div class="list-menus">
                        <p class="list-time">
                            ${durationTimes}
                        </p>
                    </div>
                </div>
            `
        });    

        songs.forEach((items, index) => {
            items.innerHTML = htmls.join('');
        });
    };

    if(playlist) {
        const htmls = albumSearch.map((items, index) => {
            return `
                <div class="box-zmp">
                    <div class="box-lap">
                        <a href="./album.html" id="${items.encodeId}" class="box-z-img">
                            <img src="${items.thumbnailM}" alt="">
                            <div class="box-layer">
                                <div>
                                    <button class="icon">
                                        <i class="bi bi-suit-heart"></i>
                                    </button>
                                    <button class="icon">
                                        <i class="bi bi-play-circle"></i>
                                    </button>
                                    <button class="icon">
                                        <i class="bi bi-three-dots"></i>
                                    </button>
                                </div>
                            </div>
                        </a>
                        <div class="box-cont-z">
                            <h3>${items.title}</h3>
                            <p>${items.artistsNames}</p>
                        </div>
                    </div>
                </div>
            `
        });    

        playlist.forEach((items, index) => {
            items.innerHTML = htmls.join('');
        });
    };

    if(artistOa) {
        const htmls = arttistsSearch.map((items, index) => {
            const totalFollowers = (items.hasOwnProperty('totalFollow') ? items.totalFollow : '0');
            return `
                <div class="artist-zp">
                    <div class="artist-main">
                        <a href="" class="artist-img">
                            <img src="${items.thumbnailM}" alt="">
                        </a>

                        <div class="artist-inf">
                            <h3>${items.name}</h3>
                            <p>${totalFollowers} quan tâm</p>
                        </div>
                    </div>
                </div>
            `
        });    

        artistOa.forEach((items, index) => {
            items.innerHTML = htmls.join('');
        });
        handleEvents(songsSearch, albumSearch, arttistsSearch);
    };
}

function handleEvents(data1, data2, data3) {
    const songsTop = document.querySelectorAll('.songs-top .song-zp .song-img .song-inf .img-thumb');
    const allSongs = document.querySelectorAll('.box-song-zp.cut .list-box .list-box-img .list-img');
    const allSongsList = document.querySelectorAll('.box-song-zp.all .list-box .list-box-img .list-img');
    const albums = document.querySelectorAll('.box .box-boxs .box-zmp .box-lap .box-z-img');

    if(songsTop) {
        songsTop.forEach((items, index) => {
            items.addEventListener('click', (e) => {
                creatBarControls(data1, index);
                getMusic(data1, index);
                postTransferHandling(data1, index);
            });
        })
    };

    if(allSongs) {
        allSongs.forEach((items, index) => {
            items.addEventListener('click', (e) => {
                creatBarControls(data1, index);
                getMusic(data1, index);
                postTransferHandling(data1, index);
            });
        })
    };

    if(allSongsList) {
        allSongsList.forEach((items, index) => {
            items.addEventListener('click', (e) => {
                creatBarControls(data1, index);
                getMusic(data1, index);
                postTransferHandling(data1, index);
            });
        })
    };

    if(albums) {
        albums.forEach((items, index) => {
            items.addEventListener('click', (e) => {
                // e.preventDefault();
                const id = items.getAttribute('id');
                localStorage.setItem('data-id', id);
            });
        })
    };
}

function inputKey() {
    const value = localStorage.getItem('keywords');
    const inputElement = document.querySelector('.search .form_search input');

    if(inputElement) {
        inputElement.value = value;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getKey();
    inputKey();
})