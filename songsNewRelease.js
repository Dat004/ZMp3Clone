import getApi from "./root.js";
import {creatBarControls, getMusic, postTransferHandling} from "./listenMusic.js";

const app = (() => {
    const contMain = document.querySelector('.cont-main');
    const link = 'https://server-tau-six.vercel.app/api/song?id=';
    let allMusic = [];
    // let musicViet = [];
    // let musicInternational = [];
    return {
        async getPost() {
            try {
                const data = await getApi();
                const array = data.data.items[2].items;

                this.getData(array);
            }
            catch(err) {
                console.log(err);
            }
        },
        getData(data) {
            data.vPop.map(items => {
                allMusic.push(items);
            })

            data.others.map(items => {
                allMusic.push(items);
            })

            this.renderData(allMusic);
        },
        renderData(data) {
            let arrSort = [];

            const htmls = data.map((items, id) => {
                const seconds = items.duration % 60;
                const minutes = Math.floor(items.duration / 60);
                const timeLine = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
                
                const date = new Date(items.releaseDate * 1000);
                const year = date.getFullYear();
                const monthString = date.getMonth() + 1;
                const month = (parseInt(monthString) < 10 ? '0' + monthString : monthString);
                const day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

                const timeRealse = year + '.' + month + '.' + day;

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
                            <p class="hour-later">
                                ${timeRealse}
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

            contMain.innerHTML = htmls.join('');

            this.handle();

        },
        handle() {
            const thumb = document.querySelectorAll('.photos');

            thumb.forEach((items, index) => {
                items.addEventListener('click', (e) => {
                    e.preventDefault();
                    const encode = items.dataset.id;
                    
                    creatBarControls(allMusic, index);
                    getMusic(allMusic, index);
                    postTransferHandling(allMusic, index);

                })
            })
        },
        innit(btn) {
            this.getPost();
        }
    }
})();

app.innit();