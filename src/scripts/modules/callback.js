// import z from "https://gcore.jsdelivr.net/npm/zod@3.22.4/+esm";
import z from "https://cdn.jsdelivr.net/npm/zod@3.23.8/+esm";

const schemaContact = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    phone: z.string().length(18),
    approval: z.string().toLowerCase().transform((x) => x === 'true').pipe(z.boolean())
});

let schemaMain,
    checkout = document.querySelector('.checkout-section__container__services-block');
if (checkout) {
    const checkboxs = checkout.querySelectorAll('.service-card-check__info-block__checkbox');
    const servicesArray = [];
    const serviceInput = document.querySelector('input[name=service]');

    checkboxs.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            const checkboxInput = checkbox.querySelector('input')
            const checkboxValue = checkboxInput.value;

            // Если чекбокс отмечен, добавляем его значение в массив
            if (checkboxInput.checked) {
                // Проверяем, есть ли уже такое значение в массиве
                if (!servicesArray.includes(checkboxValue)) {
                    // Если нет, добавляем его
                    servicesArray.push(checkboxValue);
                }
            } else {
                // Если чекбокс снят, удаляем его значение из массива
                const index = servicesArray.indexOf(checkboxValue);
                if (index !== -1) {
                    servicesArray.splice(index, 1);
                }
            }
            // Формируем строку из значений массива, разделяя их точкой с запятой
            const serviceString = servicesArray.join(';');
            // Затем вы можете использовать эту строку для вашей цели
            serviceInput.value = serviceString;
        });
    })
}

export function callback (){
    document.addEventListener('DOMContentLoaded',() => {
        // Получаем все формы с классом "form-card__form"
        const forms = document.querySelectorAll('form');
        
        // Проходимся по каждой форме
        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const body = getBody(form)
                const body_clear = body
                delete body_clear.csrfmiddlewaretoken;
                delete body_clear.bid;
                delete body_clear.files;

                let link_type = form.getAttribute('name'),
                    link = ''
                if (link_type === 'callback') {
                    link = 'feedback_request'
                    schemaMain = schemaContact
                }

                validateParse({
                    schema: schemaMain,
                    body,
                })
                .then(res => {
                    const csrfToken = $('[name=csrfmiddlewaretoken]').val();

                    fetch(`/api/${link}/`, {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrfToken
                        },
                        body: new FormData(form) // Отправляем объект FormData
                    })
                    .then(response => {
                        if (!response.ok) {
                            console.log('send error');
                            return null;
                        }
                        return response.json(); // Преобразуем ответ в JSON
                    })
                    .then(data => {
                        console.log('Success:', data);
                        form.reset();
                        removeErrorClasses(form);
                        window.location.href = "/success/";
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Действия при ошибке отправки формы
                    });
                }).catch(error => {
                    console.error(error);
                    const errors = JSON.parse(error.message);

                    errors.forEach(err => {
                        const inputName = err.path[0]; // Получаем имя поля, содержащее ошибку
                        const inputWithError = form.querySelector(`[name="${inputName}"]`); // Находим соответствующий элемент input
                        if (inputWithError) {
                            inputWithError.classList.add('wrong'); // Присваиваем класс "error"
                        }
                    });
                });
            });
        });
    });
}

function removeErrorClasses(form) {
    const errorInputs = form.querySelectorAll('.wrong'); // Находим все элементы с классом "error"
    errorInputs.forEach(input => {
        input.classList.remove('wrong'); // Удаляем класс "error"
    });
}

function showMessage() {
    const successMessage = document.querySelector('.dialog');
    let closeSuccess = document.querySelector('.dialog__dialog-block__title-and-close__close');
    if (successMessage) {
        successMessage.style.opacity = '1';
        successMessage.style.scale = '1';
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.scale = '0';
        }, 2500);
    };
    closeSuccess.addEventListener('click', function() {
        successMessage.style.display = 'none'
    });
}

function getBody(form) {
    const formData = new FormData(form);
    const body = {};
    for (let [name, value] of formData.entries()) {
        body[name] = value;
    }
    return body;
};

async function validateParse(validateInfo) {
    const errorInputs = document.querySelectorAll('form .wrong')
    errorInputs.forEach(input => {
        input.classList.remove('wrong'); // Удаляем класс "error"
    });
    try {
        validateInfo.schema.parse(validateInfo.body);
        console.log("Validation successful");
        if(typeof validateInfo?.callback == 'function')validateInfo?.callback();
        return true;
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            // console.error("Validation failed:", error.errors);
            throw new Error(JSON.stringify(error.errors));
        } else {
            // console.error("Unknown error", error);
        }
    }
}