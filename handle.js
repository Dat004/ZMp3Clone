const app = (() => {
    return {
        handlEvents() {
            const btnActive = document.querySelectorAll('.category-btn');
            const listMusic = document.querySelectorAll('.list-music');

            // Button active
            btnActive.forEach((btn, id) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();

                    document.querySelector('.category-btn.active').classList.remove('active');
                    btn.classList.add('active');

                    document.querySelector('.list-music.active').classList.remove('active');
                    listMusic[id].classList.add('active');
                })
            });
        },
        innit() {
            this.handlEvents();
        }
    }
})();

app.innit();