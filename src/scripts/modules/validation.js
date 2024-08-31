import z from "https://cdn.jsdelivr.net/npm/zod@3.22.4/+esm"


function getTextInsideSquareBrackets(text) {
    const startIndex = text.indexOf('['); // Находим индекс первой открывающей скобки
    const endIndex = text.lastIndexOf(']'); // Находим индекс последней закрывающей скобки
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) { // Проверяем, что скобки найдены и первая скобка находится перед последней
        return text.substring(startIndex + 1, endIndex); // Возвращаем текст между первой и последней скобками
    } else {
        return ''; // Если скобки не найдены или первая скобка находится после последней, возвращаем пустую строку
    }
}

const schemaRegister = z.object({
    email: z.string()
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(4,{message: "слишком коротко"}),
    repeat_password: z.string()
        .min(4,{message: "слишком коротко"}),
}).refine(
    (data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["password","repeat_password"], // path of error
});
const schemaNewPass = z.object({
    password: z.string()
        .min(4,{message: "слишком коротко"}),
    repeat_password: z.string()
        .min(4,{message: "слишком коротко"}),
}).refine(
    (data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["password","repeat_password"], // path of error
});
const schemaLogin = z.object({
    email: z.string()
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(4,{message: "слишком коротко"}),
});
const schemaCallBack = z.object({
    email: z.string(),
    phone: z.string()
        .min(18),
    first_name: z.string()
        .min(1),
    last_name: z.string()
        .min(1),
});
const schemaReview = z.object({
    first_name: z.string()
        .min(1),
    last_name: z.string()
        .min(1),
    review: z.string()
        .min(1),
});

export function validation() {

}


async function validateParse(validateInfo) {
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

async function sendForm(data, url) {
    const csrfToken = $('[name=csrfmiddlewaretoken]').val();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data),
    });
    if(response.ok) return response.json();
    else throw new Error(response.statusText);
};

function getBody(form) {
    const formData = new FormData(form);
    const body = {};
    for (let [name, value] of formData.entries()) {
        body[name] = value;
    }
    return body;
}

function getQuery(query) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(query);
}

// Для корректной работы необходимо подключить и активировать эту функцию в app.js

// Пример подключения: import { validation } from "./путь/к/файлу/validation.js";

// Активация: validation();