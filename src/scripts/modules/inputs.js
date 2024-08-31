export function inputs() {
    // Получаем все элементы input с атрибутом name="phone"

    var elementPhone = document.querySelectorAll('input[name="phone"]');

    // Функция, которая добавляет маску к номеру телефона
    function addPhoneMask(input) {
        // Создаем новый объект для маски с префиксом "+7"
        var maskOptions = {
            mask: '+7 (000) 000-00-00',
        };
        // Добавляем маску к элементу input
        IMask(input, maskOptions);
    }

    // Проверяем, если пользователь ввел "7" или "8"
    elementPhone.forEach(function (input) {
        input.addEventListener('input', function () {
            // Получаем значение, введенное пользователем
            var value = input.value;
            // Если введена цифра "7" или "8", заменяем ее на "+7"
            if (value.startsWith('7') || value.startsWith('8')) {
                input.value = '+7' + value.substring(1);
            }
            // Добавляем маску к введенному номеру телефона
            addPhoneMask(input);
        });
    });
}


// Для корректной работы необходимо подключить и активировать эту функцию в app.js

// Пример подключения: import { inputs } from "./путь/к/файлу/inputs.js";

// Активация: inputs();