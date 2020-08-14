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

// Функция открытия popup

function togglePopup(popupWindow) {
    popupWindow.classList.toggle('popup_opened');
}

// Функция загрузки значений в форму со страницы

function editForm() {
    togglePopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Функция сохранения данных профиля  

function SubmitHandlerForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEdit);
}

// Функция сохранения новой карточки 

function SubmitHandlerAddCard(evt) {
    evt.preventDefault();
    renderCard({ name: placeInput.value, link: linkInput.value })
    placeInput.value = '';
    linkInput.value = '';
    togglePopup(popupAdd);
}

// Обработчики

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

formElementEdit.addEventListener('submit', SubmitHandlerForm);

formElementAdd.addEventListener('submit', SubmitHandlerAddCard);

// Создание карточки, клонирование, лайк и удаление

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

function makeCard(element) {
    const elementCard = gridElementCard.cloneNode(true);
    const elementCardTitle = elementCard.querySelector('.elements__title');
    const elementCardImg = elementCard.querySelector('.elements__image');
    const likeCard = elementCard.querySelector('.elements__like');
    const deleteCard = elementCard.querySelector('.elements__delete');

    likeCard.addEventListener('click', () => {
        likeCard.classList.toggle('elements__like_active');
    });

    deleteCard.addEventListener('click', () => {
        elementCard.remove();
    });

    elementCardTitle.textContent = element.name;
    elementCardImg.src = element.link;
    elementCardImg.alt = element.name;

    elementCardImg.addEventListener('click', () => {
        imgPopupTitle.textContent = elementCardTitle.textContent;
        imgPopupImg.src = elementCardImg.src;
        togglePopup(popupView);

    });

    return elementCard;
}

function renderCard(element) {
    gridElements.prepend(makeCard(element));
}

initialCards.forEach((element) => {
    renderCard(element);
});