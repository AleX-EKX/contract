export function header() {
    let prevScrollPos = window.scrollY;

    window.onscroll = function() {
        let currentScrollPos = window.scrollY;
        let header = document.querySelector("header");

        if (prevScrollPos > currentScrollPos) {
            header.classList.remove("sticky");
        } else {
            header.classList.add("sticky");
        }
        prevScrollPos = currentScrollPos;
    };

}

// Для корректной работы необходимо подключить и активировать эту функцию в app.js

// Пример подключения: import { header } from "./путь/к/файлу/header.js";

// Активация: header();
