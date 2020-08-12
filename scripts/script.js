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

const gridElementCard = document.querySelector('.elements-template').content.querySelector('.elements__item');
const gridElements = document.querySelector('.elements');

function makeCard(element) {
  const elementCard = gridElementCard.cloneNode(true);
  const elementCardTitle = elementCard.querySelector('.elements__title');
  const elementCardImg = elementCard.querySelector('.elements__image');
  

  elementCardTitle.textContent = element.name;
  elementCardImg.src = element.link;
  elementCardImg.alt = element.name;

  return elementCard;

}

function renderCard(element) {
    gridElements.prepend(makeCard(element));
  
    };

initialCards.forEach((element) => {renderCard(element);
});