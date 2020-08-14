const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const exitButtonEdit = document.querySelector('.popup__button-close_profile');
const exitButtonAdd = document.querySelector('.popup__button-close_add');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup__profile');
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
const imgPopupClose = popupView.querySelector('.ppopup__button-close_view');
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


// Создание карточки, клонирование, лайк и удаление

function makeCard(element) {
    const elementCard = gridElementCard.cloneNode(true);
    const elementCardTitle = elementCard.querySelector('.elements__title');
    const elementCardImg = elementCard.querySelector('.elements__image');
    const cardLike = elementCard.querySelector('.elements__like');
    const CardDelete = elementCard.querySelector('.elements__delete');
  
  
    cardLike.addEventListener('click', () => {
      cardLike.classList.toggle('elements__like_active');
    });
  
    CardDelete.addEventListener('click', () => {
      elementCard.remove();
    });
  
    elementCardTitle.textContent = element.name;
    elementCardImg.src = element.link;
    elementCardImg.alt = element.name;
  
  
  
    elementCardImg.addEventListener('click', () => {
      imgPopupTitle.textContent = elementCardTitle.textContent;
      imgPopupImg.src = elementCardImg.src;
      togglePopupView();
      
    });
  
    return elementCard;
  
  }
  
  function renderCard(element) {
      gridElements.prepend(makeCard(element));
    
      };
  
  initialCards.forEach((element) => {
      renderCard(element);
  });
  


//popup редактирования профиля

function togglePopupEdit() {
    if (!popupEdit.classList.contains('.popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
    popupEdit.classList.toggle('popup_opened');
  };


editButton.addEventListener('click', togglePopupEdit);
exitButtonEdit.addEventListener('click', togglePopupEdit);


//popup добавления карточки

function togglePopupAdd() {
    if (!popupAdd.classList.contains('.popup_opened')) {
    }
    popupAdd.classList.toggle('popup_opened');
  };


addButton.addEventListener('click', togglePopupAdd);
exitButtonAdd.addEventListener('click', togglePopupAdd);


//popup просмотра картинки

function togglePopupView() {
    if (!popupView.classList.contains('.popup_opened')) {
    }
    popupView.classList.toggle('popup_opened');
  };

  exitButtonView.addEventListener('click', togglePopupView);


// Сохранение данных профиля  

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    togglePopupEdit();
}

formElementEdit.addEventListener('submit', formSubmitHandler);


// Сохранение новой карточки 

function addCardSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({name: placeInput.value, link: linkInput.value})
    placeInput.value = '';
    linkInput.value = '';
    togglePopupAdd();
  }

  formElementAdd.addEventListener('submit', addCardSubmitHandler);







