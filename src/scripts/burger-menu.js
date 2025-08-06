const burgerBtn = document.querySelector('.burger-btn');
const menu = document.querySelector('.burger-menu__layer');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    menu.classList.toggle('active');
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (e) => {
    if (!e.target.closest('.burger-menu')) {
        burgerBtn.classList.remove('active');
        menu.classList.remove('active');
    }
});
