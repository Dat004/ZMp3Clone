import {creatBarControls, getMusic, postTransferHandling} from "./listenMusic.js";

async function getPost() {
    const link = 'https://server-tau-six.vercel.app/api/top100';
    const reponse = await fetch(link);
    const data = await reponse.json();

    try {
        console.log(data);
        getAndRenderData(data);
    }

    catch(err) {
        console.log(err);
    }
}

function getAndRenderData(data) {
    const list = data.data;
    const playlistTop = data.data[0].items;
    const playlistViet = data.data[1].items;
    const playlistAsia = data.data[2].items;
    const playlistUsUk = data.data[3].items;
    const playlistConcert = data.data[4].items;
 
    const sectionHeading = document.querySelectorAll('.section .section-heading');
    const sectionTop = document.querySelector('.section-content .list.list-top');
    const sectionViet = document.querySelector('.section-content .list.list-viet');
    const sectionAsia = document.querySelector('.section-content .list.list-asia');
    const sectionUsUk = document.querySelector('.section-content .list.list-us_uk');
    const sectionConcert = document.querySelector('.section-content .list.list-concert');

    sectionHeading.forEach((items, index) => {
        items.textContent = list[index].title;
    })

    if(sectionTop) {
        const htmls = playlistTop.map((items, index) => {
            return generalForm(items);
        });
        
        sectionTop.innerHTML = htmls.join('');
    };

    if(sectionViet) {
        const htmls = playlistViet.map((items, index) => {
            return generalForm(items); 
        });
        
        sectionViet.innerHTML = htmls.join('');
    };

    if(sectionAsia) {
        const htmls = playlistAsia.map((items, index) => {
            return generalForm(items); 
        });
        
        sectionAsia.innerHTML = htmls.join('');
    };

    if(sectionUsUk) {
        const htmls = playlistUsUk.map((items, index) => {
            return generalForm(items); 
        });
        
        sectionUsUk.innerHTML = htmls.join('');
    };

    if(sectionConcert) {
        const htmls = playlistConcert.map((items, index) => {
            return generalForm(items); 
        });
        
        sectionConcert.innerHTML = htmls.join('');
    };

    getAlbums(list);
}

function generalForm(data) {
    return `
        <div class="content-info">
            <div class="cttn">
                <a href="./album.html" class="img" data-id="${data.encodeId}">
                    <img src="${data.thumbnailM}" alt="">
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
                    <p>${data.title}</p>
                </div>
            </div>
        </div>
    `
}

function getAlbums(array) {
    const photosTop = document.querySelectorAll('.list.list-top a.img');
    const photosViet = document.querySelectorAll('.list.list-viet a.img');
    const photosAsia = document.querySelectorAll('.list.list-asia a.img');
    const photosUsUk = document.querySelectorAll('.list.list-us_uk a.img');
    const photosConcert = document.querySelectorAll('.list.list-concert a.img');

    photosTop.forEach((items, index) => {
        items.addEventListener('click', () => {
            const id = items.getAttribute('data-id');
            
            localStorage.setItem('data-id', id);
        })
    })

    photosViet.forEach((items, index) => {
        items.addEventListener('click', () =>  {
            const id = items.getAttribute('data-id');
            
            localStorage.setItem('data-id', id);
        })
    })

    photosAsia.forEach((items, index) => {
        items.addEventListener('click', () =>  {
            const id = items.getAttribute('data-id');
            
            localStorage.setItem('data-id', id);
        })
    })

    photosUsUk.forEach((items, index) => {
        items.addEventListener('click', () =>  {
            const id = items.getAttribute('data-id');
            
            localStorage.setItem('data-id', id);
        })
    })

    photosConcert.forEach((items, index) => {
        items.addEventListener('click', () =>  {
            const id = items.getAttribute('data-id');
            
            localStorage.setItem('data-id', id);
        })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    getPost();
})