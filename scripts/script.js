let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let exitButton = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElement = document.querySelector('.popup__container');

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

exitButton.addEventListener('click', closePopup);



function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);