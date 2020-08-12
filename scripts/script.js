let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let exitButtonEdit = document.querySelector('.popup__button-close_profile');
let exitButtonAdd = document.querySelector('.popup__button-close_add');
let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup__profile');
let popupAdd = document.querySelector('.popup__add');
let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElement = document.querySelector('.popup__container');
let addButton = content.querySelector('.profile__add-button');



function togglePopupEdit() {
    if (!popupEdit.classList.contains('.popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
    popupEdit.classList.toggle('popup_opened');
  };


//function openPopup() {
//    nameInput.value = profileName.textContent;
//    jobInput.value = profileJob.textContent;
//    popup.classList.add('popup_opened');
//}

editButton.addEventListener('click', togglePopupEdit);

//function closePopup() {
//    popup.classList.remove('popup_opened');
//}

exitButtonEdit.addEventListener('click', togglePopupEdit);

function togglePopupAdd() {
    if (!popupAdd.classList.contains('.popup_opened')) {
        //nameInput.value = profileName.textContent;
       // jobInput.value = profileJob.textContent;
    }
    popupAdd.classList.toggle('popup_opened');
  };


addButton.addEventListener('click', togglePopupAdd);
exitButtonAdd.addEventListener('click', togglePopupAdd);


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    togglePopupEdit();
}

formElement.addEventListener('submit', formSubmitHandler);

function addCardSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({name: formInputPlace.value, link: formInputUrl.value})
    togglePopupAdd();
    formInputPlace.value = '';
    formInputUrl.value = '';
  }



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