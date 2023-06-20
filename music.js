import getApi from "./root.js";
import {creatBarControls, getMusic, postTransferHandling} from "./listenMusic.js";

const apps = (() => {
    const link = 'https://server-tau-six.vercel.app/api/song?id=';
    return {
        async getApi() {
            try {
                const data = await getApi();
                const banner = await data.data.items[0].items;
                const category = await data.data.items[2].items;
                const arrayCill = await data.data.items[3].items;
                const arrayEnergy = await data.data.items[4].items;
                const arrayArtist = await data.data.items[5].items;
                const chartNew = await data.data.items[6].items
                const rankWeek = await data.data.items[8].items;
                const arrayTop = await data.data.items[9].items;
                const arrayAlbumHot = await data.data.items[10].items;

                this.renderBanner(banner);
                this.getCateNew(category);
                this.getLike(arrayCill, arrayEnergy, arrayArtist, arrayTop, arrayAlbumHot);
                this.renderWeekChart(chartNew);
                this.renderRankWeek(rankWeek);
                this.playList(category);
            }
            catch(error) {
                console.log(error);
            }
        },
        renderBanner(api) {
            const slider = document.querySelector('.slider.sidebar')
            const logo = document.createElement('div');
            slider.appendChild(logo);

            if(logo) {
                logo.className = 'logo';
                const htmls = api.map(element => {
                    return `
                    <div class="img">
                        <div class="banner"  style="background-image: url('${element.banner}');"></div>
                    </div>
                    `
                });

                logo.innerHTML = htmls.join('');

            }
        },
        renderCategory(apis, id) {
            const html = `
                <a href="" class="list_items">
                    <div class="more">
                    <img src="${apis.thumbnailM}" id=${id} data-index="${apis.encodeId}" alt="" class="poster">
                    <div class="content">
                        <h4 class="name_music">${apis.title}</h4>
                        <p class="sigle">${apis.artistsNames}</p>
                        <p class="time">Hôm qua</p>
                    </div>
                    </div>
                    <div class="more-right">
                    <span class="icon-more">
                        <i class="bi bi-three-dots"></i>
                    </span>
                    </div>
                </a>
            `

            return html;
        },
        renderList(datas) {
            const htmls = `
                <div class="content-info">
                    <div class="cttn">
                        <a href="./album.html" class="img" data-id="${datas.encodeId}">
                            <img src="${datas.thumbnailM}" alt="">
                            <div class="mask">
                                <div class="controls">
                                    <span class="icon">
                                        <i class="bi bi-suit-heart"></i>
                                    </span>
                                    <span class="icon">
                                        <i class="bi bi-play-circle"></i>
                                    </span>
                                    <span class="icon">
                                        <i class="bi bi-three-dots"></i>
                                    </span>
                                </div>
                            </div>
                        </a>

                        <div class="feel">
                            <p>${datas.sortDescription}</p>
                        </div>
                    </div>
                </div>
            `
            
            return htmls;
        },
        getId() {
            const playListChill = document.querySelectorAll('.playlist.chill .img');
            const playListEnergy = document.querySelectorAll('.playlist.energy .img');
            const playListArtist = document.querySelectorAll('.playlist.artist .img');
            const playListChartNew = document.querySelectorAll('.playlist.chartNew .img');
            const playListTop = document.querySelectorAll('.playlist.top .img');
            const playListAlbumHot = document.querySelectorAll('.playlist.albumHot .img');
            
            playListChill.forEach((items, index) => {
                items.addEventListener('click', (e) => {
                    // e.preventDefault();
                    const encode = items.getAttribute('data-id');
                    localStorage.setItem('data-id', encode);
                })
            })

            playListEnergy.forEach((items, index) => {
                items.addEventListener('click', (e) => {
                    // e.preventDefault();
                    const encode = items.getAttribute('data-id');
                    localStorage.setItem('data-id', encode);
                })
            })

            playListArtist.forEach((items, index) => {
                items.addEventListener('click', (e) => {
                    // e.preventDefault();
                    const encode = items.getAttribute('data-id');
                    localStorage.setItem('data-id', encode);
                })
            })

            playListTop.forEach((items, index) => {
                items.addEventListener('click', (e) => {
                    // e.preventDefault();
                    const encode = items.getAttribute('data-id');
                    localStorage.setItem('data-id', encode);
                })
            })

            playListAlbumHot.forEach((items, index) => {
                items.addEventListener('click', (e) => {
                    // e.preventDefault();
                    const encode = items.getAttribute('data-id');
                    localStorage.setItem('data-id', encode);
                })
            })
        }
        ,
        getCateNew(api) {
            // New Realse
            const musicList1 = document.querySelector('.list-music.music-all');
            const music1 = document.createElement('div');
            const list1 = document.createElement('nav');

            music1.className = 'music';
            list1.className = 'list';

            musicList1.appendChild(music1);
            music1.appendChild(list1);


            const musicList2 = document.querySelector('.list-music.music-Viet');
            const music2 = document.createElement('div');
            const list2 = document.createElement('nav');

            music2.className = 'music';
            list2.className = 'list';

            musicList2.appendChild(music2);
            music2.appendChild(list2);


            const musicList3 = document.querySelector('.list-music.music-international');
            const music3 = document.createElement('div');
            const list3 = document.createElement('nav');

            music3.className = 'music';
            list3.className = 'list';

            musicList3.appendChild(music3);
            music3.appendChild(list3);

            const musicAll = api.all.map((apis, index) => {
                return this.renderCategory(apis, index);
            })

            const musicVpop = api.vPop.map((apis, index) => {
                return this.renderCategory(apis, index);
            })

            const musicOther = api.others.map((apis, index) => {
                return this.renderCategory(apis, index);
            })

            list1.innerHTML = musicAll.join('');
            list2.innerHTML = musicVpop.join('');
            list3.innerHTML = musicOther.join('');
        },
        getLike(data1, data2, data3, data4, data5) {
            // Chill
            const contents1 = document.querySelector('.playlist.chill .contents');
            const chill = document.createElement('div');

            const contents2 = document.querySelector('.playlist.energy .contents');
            const energy = document.createElement('div');

            const contents3 = document.querySelector('.playlist.artist .contents');
            const artist = document.createElement('div');

            const contents4 = document.querySelector('.playlist.top .contents');
            const top = document.createElement('div');

            const contents5 = document.querySelector('.playlist.albumHot .contents');
            const album = document.createElement('div');

            if(chill)  {
                chill.className = 'list chill';
                contents1.appendChild(chill);

                const htmls = data1.map(datas => {
                    return this.renderList(datas);
                })

                chill.innerHTML = htmls.join('');
            }

            if(energy)  {
                energy.className = 'list energy';
                contents2.appendChild(energy);

                const htmls = data2.map(datas => {
                    return this.renderList(datas);
                })

                energy.innerHTML = htmls.join('');
            }

            if(artist)  {
                artist.className = 'list artist';
                contents3.appendChild(artist);

                const htmls = data3.map(datas => {
                    return this.renderList(datas);
                })

                artist.innerHTML = htmls.join('');
            }

            if(top)  {
                top.className = 'list top';
                contents4.appendChild(top);

                const htmls = data4.map(datas => {
                    return this.renderList(datas);
                })

                top.innerHTML = htmls.join('');
            }

            if(album)  {
                album.className = 'list album';
                contents5.appendChild(album);

                const htmls = data5.map(datas => {
                    return this.renderList(datas);
                })

                album.innerHTML = htmls.join('');
            }

            this.getId();
        },
        renderWeekChart(api) {
            let rank = 0;
            const contents = document.querySelector('.playlist.chartNew .contents');
            const chart = document.createElement('div');

            if(chart) {
                chart.className = 'list chart';
                contents.appendChild(chart);
                const htmls = api.map((apis, id) => {
                    const date = apis.album.releaseDate;
                    const cutDate = date.replace(/\//g, '.');
                    return `
                        <div class="chartNew chart-${id}">
                            <a href="#" class="chartRank">
                                <div class="logo">
                                    <img src="${apis.album.thumbnail}" alt="">
                                </div>

                                <div class="ctt-right">
                                    <div class="title">
                                        <h3 class="nameMusic">${apis.album.title}</h3>
                                        <p class="artistName">${apis.album.artistsNames}</p>
                                    </div>

                                    <div class="rank">
                                        <h1 class="rankNum">#${++rank}</h1>
                                        <p class="dateTime">${cutDate}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `
                })

                chart.innerHTML = htmls.join('');
            }
        },
        playList(data) {
            const navListMusicAll = document.querySelectorAll('.list-music.music-all .list_items');
            const navListMusicViet = document.querySelectorAll('.list-music.music-Viet .list_items');
            const navListMusicOthers = document.querySelectorAll('.list-music.music-international .list_items');

            navListMusicAll.forEach((nav, index) => {
                nav.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = e.target.closest('img');
                    if(img) {
                        const encode = img.dataset.index;
                        
                        creatBarControls(data.all, index);
                        getMusic(data.all, index);
                        postTransferHandling(data.all, index);
                    }
                })
            });

            navListMusicViet.forEach((nav, index) => {
                nav.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = e.target.closest('img');
                    if(img) {
                        const encode = img.dataset.index;
                        
                        creatBarControls(data.vPop, index);
                        getMusic(data.vPop, index);
                        postTransferHandling(data.vPop, index);
                    }
                })
            });

            navListMusicOthers.forEach((nav, index) => {
                nav.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = e.target.closest('img');
                    if(img) {
                        const encode = img.dataset.index;
                        
                        creatBarControls(data.others, index);
                        getMusic(data.others, index);
                        postTransferHandling(data.others, index);
                    }
                })
            });
        }
        ,
        renderRankWeek(data) {
            const contents = document.querySelector('.playlist.chartWeek .contents');
            const layout = document.createElement('div');
            

            if(layout) {
                layout.className = 'gridLayout';
                contents.appendChild(layout);

                const htmls = data.map((api, id) => {
                    return `
                        <a href="" id="" class="logoChart">
                            <img src="${api.cover}" alt="">
                        </a>
                    `
                })

                layout.innerHTML = htmls.join('');
            }
        },
        innit() {
            this.getApi();
        }
    }
})();

apps.innit();
