import Card from './Card.js';
import FormValidator from './FormValidator.js';

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const exitButtonAdd = document.querySelector('.popup__button-close_add');
const popupEdit = document.querySelector('.popup__profile');
const exitButtonEdit = popupEdit.querySelector('.popup__button-close_profile');
const popupAdd = document.querySelector('.popup__add');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formElementEdit = document.querySelector('.popup__container_edit');
const formElementAdd = document.querySelector('.popup__container_add');
const addButton = content.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const popupView = document.querySelector('.popup__background');
const imgPopupTitle = popupView.querySelector('.view__caption');
const imgPopupImg = popupView.querySelector('.view__image');
const exitButtonView = document.querySelector('.popup__button-close_view'); 
const gridElementCard = document.querySelector('.elements-template').content.querySelector('.elements__item');
const gridElements = document.querySelector('.elements'); 


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Функция открытия popup
export function togglePopup(popupWindow) {
    const popupOpen = popupWindow.classList.contains('popup_opened');
    if (!popupOpen) {
        //Валидация формы
        formValidation();
        //закрытие попап Esc
        document.addEventListener('keydown', handleEscapeKeydown);
        //закрытие попап по клику на оверлей
        document.addEventListener('click', handleOverlayClick);
    } else {
        //снятие слушателя 
        document.removeEventListener('keydown', handleEscapeKeydown);
        //снятие слушателя  
        document.removeEventListener('click', handleOverlayClick);
    }
    popupWindow.classList.toggle('popup_opened');
}

// Функция закрытия по нажатию Esc
function handleEscapeKeydown(evt) {
    const openPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        togglePopup(openPopup);
    }
}

// Функция закрытия по клику на оверлей
function handleOverlayClick(evt) {
    const openPopup = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup')) {
        togglePopup(openPopup);
    }
}

// Функция загрузки значений в форму со страницы
function editForm() {
    togglePopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//Функция добаляющая карточки
function addCards(initialCards) {
    initialCards.forEach((item) => {
        const card = new Card(item, '.elements-template');
        const cardElement = card.makeCard();
        document.querySelector('.elements').append(cardElement);
    });
}

// Функция сохранения данных профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEdit);
}

// Функция сохранения данных новой карточки
function handlePlaceSubmit(evt) {
    evt.preventDefault();
    const cardValue = {};
    cardValue.link = linkInput.value;
    cardValue.name = placeInput.value;
    const card = new Card(cardValue, '.elements-template')
    gridElements.prepend(card.makeCard());
    togglePopup(popupAdd);
}

//Функция валидации формы
function formValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__container'));
    formList.forEach((form) => {
        const validator = new FormValidator({
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button-save',
            inactiveButtonClass: 'popup__button-save_disabled',
            inputErrorClass: 'popup__input_error',
            errorClass: 'popup__input-error_active',
        }, form);
        validator.enableValidation();
    });
}

addButton.addEventListener('click', () => {
    togglePopup(popupAdd);
});

exitButtonAdd.addEventListener('click', () => {
    togglePopup(popupAdd);
});

exitButtonView.addEventListener('click', () => {
    togglePopup(popupView);
});

editButton.addEventListener('click', () => {
    editForm();
});

exitButtonEdit.addEventListener('click', () => {
    editForm();
});

formElementEdit.addEventListener('submit', handleFormSubmit);

formElementAdd.addEventListener('submit', handlePlaceSubmit);

addCards(initialCards);
formValidation();