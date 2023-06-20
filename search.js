function getValueInput() {
    const searchInput = document.querySelector('.search .form_search input');
    searchInput.addEventListener('input', (e) => {
        const valueInput = e.target.value;

        if(valueInput.trim() !== '') {
            searchValue(valueInput);
            setName(valueInput);
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        const valueInput = e.target.value;

        if(e.which === 13) {
            searchValue(valueInput);
            setName(valueInput);
            window.location.href = './search.html';
        }
    });
}

async function searchValue(value) {
    const link = 'https://server-tau-six.vercel.app/api/search?keyword=';
    const reponse = await fetch(link + value);
    const data = await reponse.json();

    try {
        renderTableSearc(data.data.songs);
    }
    catch(error) {
        console.log(error);
    }
}

function renderTableSearc(data) {
    const listValues = document.querySelector('.table .list-songs');

    if(listValues) {
        const htmls = data.map((items, index) => {
            return  `
                <li>
                    <a href="./search.html" class="list-items">
                        <i class="bi bi-search"></i>
                        <span>${items.title}</span>
                    </a>
                </li>
            `
        });

        listValues.innerHTML = htmls.join('');
    }

    listValues.addEventListener('mousedown', (e) => {
        e.preventDefault();
    })

    getKeywords(data);
}

function getKeywords(data) {
    const keywords = document.querySelectorAll('.list-songs .list-items');
    const searchInput = document.querySelector('.search .form_search input');
    keywords.forEach((items, index) => {
        items.addEventListener('click', (e) => {
            e.stopPropagation();

            const keywords = data[index].title;
            searchInput.value = keywords;
            setName(keywords);
        });
    });
}

function setName(value) {
    localStorage.setItem('keywords', value);
}

window.addEventListener('DOMContentLoaded', () => {
    getValueInput();
})