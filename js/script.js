const questionnaires = document.querySelectorAll(".questionnaire__wrapper"),
    week__items = document.querySelectorAll(".week__item"),
    pacient = document.querySelector("#pacient"),
    modal = document.querySelector('.modal');


const symptoms_table = [
    'skin_itching',
    'skin_redness',
    'peeling_skin',
];

document.querySelector('#siiWeek1').value = getRandomFloat(0,5,3);

const today = document.querySelector('#today');
let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
today.textContent = output;

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

function clear() {
    week__items.forEach((item) => {
        item.classList.remove("week__item_active");
    });
    questionnaires.forEach((item) => {
        item.style.display = "none";
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

document.querySelector('#siiWeek1').value = getRandomFloat(0,5,3);

week__items.forEach((item) => {
    item.addEventListener("click", function (e) {
        clear();
        item.classList.add("week__item_active");
        idQuestionnaire = item.getAttribute("data-week");
        questionnaire = document.getElementById(idQuestionnaire);
        questionnaire.style.display = "block";
    });
});

const sympt = [
    'Кожный зуд',
    'Покраснения кожи',
    'Шелушение кожи',
];

for (let j = 0; j < 3; j++) {
    let radioList = document.getElementsByName(
        sympt[j]
    );
    let rand = getRandomIntInclusive(0, 10);
    radioList[rand].checked = true;
}

let name_p = getRandomIntInclusive(100,300);
let lastname = getRandomIntInclusive(100,300);
pacient.textContent = name_p + "" + lastname;

function questionnaireSubmit() {
    let begin_sum = 0;

    for (let j = 0; j < 3; j++) {
        let radioList = document.getElementsByName(
            sympt[j]
        );
        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i].checked) {
                begin_sum += i;
            }
        }
    }
    let finish_sum = 0;
    for (let j = 0; j < 3; j++) {
        let radioList = document.getElementsByName(
            sympt[j]+"[5]"
        );
        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i].checked) {
                finish_sum += i;
            }
        }
    }
    let result = ((finish_sum - begin_sum) / begin_sum) * 100;
    let conclusion;
    if (result > 10) conclusion = "Не благоприятное течение ВИЧ-инфекции";
    else conclusion = "Благоприятное течение ВИЧ-инфекции";

    let resultModal = document.getElementById("modal__body");
    resultModal.innerText = conclusion;

    console.log(result);
    fadeIn(modal,500);
}

document
    .querySelector(".modal__btn-close")
    .addEventListener("click", () => fadeOut(modal,500));
document
    .querySelector(".close")
    .addEventListener("click", () => fadeOut(modal,500));
