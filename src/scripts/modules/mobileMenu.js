export function mobileMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('.header-section');
        const burger = document.querySelector('.header-section__info-block__burger');
        const mobMenu = document.querySelector('.mob-menu');
        const body = document.querySelector('body');

        if (header && mobMenu) {
            mobMenu.style.height = `calc(100vh - ${header.offsetHeight}px)`;
        }

        if (burger && mobMenu) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('active');
                mobMenu.classList.toggle('open');
                body.classList.toggle('oh');
            });
        }
    });
}