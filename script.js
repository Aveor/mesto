let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let exitButton = content.querySelector('.popup__button-close');
let popup = content.querySelector('.popup');
let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__description');
let inputs = content.querySelectorAll('input');
let nameInput = content.querySelector('.popup__input_type_name');
let jobInput = content.querySelector('.popup__input_type_job');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

exitButton.addEventListener('click', closePopup);

let formElement = content.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);