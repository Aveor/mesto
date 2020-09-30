import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationconfig } from '../components/utils/constants.js';

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
const gridElements = '.elements';
const gridElementCard = '.elements-template';
const profileAlt = document.querySelector('.profile__avatar');
const popupWithImage = new PopupWithImage(popupView);


const cardList = new Section({
  items: initialCards,
  renderer: (item) => cardRender(item)
}, gridElements);

const cardForm = new PopupWithForm({
  formSubmit: (item) => cardRender(item)
}, popupAdd);

function cardRender(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open(item);
    }
  }, gridElementCard);
  const cardElement = card.makeCard();
  cardList.addItem(cardElement);
}

const openCardForm = () => {
  cardForm.open();
};

const userInfo = new UserInfo({
  userName: profileName,
  userInfo: profileJob,
  userImg: profileAlt
});

const profileForm = new PopupWithForm({
  formSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
}, popupEdit);

const openProfileForm = () => {
  const infoEdit = userInfo.getUserInfo();
  nameInput.value = infoEdit.name;
  jobInput.value = infoEdit.info;
  profileForm.open();
};

function formValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((form) => {
    const validator = new FormValidator(validationconfig, form);
    validator.enableValidation();
  });
}

addButton.addEventListener('click', openCardForm);
editButton.addEventListener('click', openProfileForm);
cardList.renderItems(initialCards);
formValidation();
