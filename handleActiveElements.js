function handleEvent() {
    const btnCategory = document.querySelectorAll('.parent .child');
    const result = document.querySelectorAll('.results .result');

    btnCategory.forEach((items, index) => {
        items.addEventListener('click', () => {
            document.querySelector('.parent .child.active').classList.remove('active');
            items.classList.add('active');
    
            document.querySelector('.results .result.active').classList.remove('active');
            result[index].classList.add('active');
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    handleEvent();
});