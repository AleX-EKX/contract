export function accordion() {
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.addEventListener('click', () => {
            const findBodyElem = item.querySelector('.accordion-body');
            const findHeaderElem = item.querySelector('.accordion-header');
            if (findHeaderElem) {
                findHeaderElem.classList.toggle('show');
            }
            if (findBodyElem) {
                if (findBodyElem.classList.contains('show')) {
                    findBodyElem.style.maxHeight = null;
                } else {
                    findBodyElem.style.maxHeight = findBodyElem.scrollHeight * 2 + "px";
                }
                findBodyElem.classList.toggle('show');
            }
        });
    });
}


// Для корректной работы необходимо подключить и активировать эту функцию в app.js

// Пример подключения: import { accordion } from "./путь/к/файлу/accordion.js";

// Активация: accordion();

