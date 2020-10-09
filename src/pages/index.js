import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { validationconfig } from '../utils/constants.js';
import Api from '../components/Api.js';

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
const formElementAvatar = document.querySelector('.popup__container_type_avatar');
const validatorAdd = new FormValidator(validationconfig, formElementAdd);
const validatorEdit = new FormValidator(validationconfig, formElementEdit);
const validatorAvatar = new FormValidator(validationconfig, formElementAvatar);
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
const profileAvatar = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup__avatar');  
const popupDelete = document.querySelector('.popup__delete');
const prepend = 'prepend';
const avatarButton = document.querySelector(".profile__img-edit");
const profileInfo = {
  profileTitle: document.querySelector('.profile__name'),
  profileSubtitle: document.querySelector('.profile__description'),
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'af63ec2b-e6dc-434c-948a-6575ce618808',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo( 
  profileInfo, profileAvatar
);

const loading = (isLoading, form, defaultButtonText, loadingMessage) => {
  const currentButton = form.querySelector('.popup__button-save');

  if (isLoading) {
    currentButton.textContent = loadingMessage;
  } else {
    currentButton.textContent = defaultButtonText;
  }
}



const profileForm = new PopupWithForm({ 
  formSubmit: () => {
    loading(true, popupEdit, 'Сохранить', 'Сохранение...');
    api.updateInfo(nameInput.value, jobInput.value)
      .then((result) => {
        userInfo.setUserInfo(result);
        profileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading(false, popupEdit, 'Сохранить', 'Сохранение...');
      });
  }
}, popupEdit);



const avatarForm = new PopupWithForm({ 
  formSubmit: (item) => {
    loading(true, popupAvatar, 'Сохранить', 'Сохранение...');
    api.updateAvatar(item.link)
      .then((item) => {
        userInfo.
        setUserAvatar(item);
      })
      .then(() => {
        avatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading(false, popupAvatar, 'Сохранить', 'Сохранение...');
      });
  }
}, popupAvatar);

const cardForm = new PopupWithForm({
  formSubmit: (item) => {
    loading(true, popupAdd, 'Создать', 'Сохранение...');
    api.addNewCard(item.name, item.link)
      .then((result) => {
        createCard(result, result.owner._id, prepend);
        cardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading(false, popupAdd, 'Создать', 'Сохранение...');
      });
  }
}, popupAdd);

const openProfileForm = () => {
  const infoEdit = userInfo.getUserInfo();
  nameInput.value = infoEdit.name;
  jobInput.value = infoEdit.about;
  profileForm.open();
};

const openAvatarForm = () => {
  avatarForm.open();
}

const openCardForm = () => {
  cardForm.blockSubmit();
  cardForm.open();
};

let valueCard;
const deleteCardConfirm = new PopupWithForm({
  formSubmit: () => {
    api.deleteCard(valueCard.object._id)
      .then((result) => {
        valueCard.class.cardDelete();
        deleteCardConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, popupDelete);

const addLike = (object) => { 
  api.addLike(object)
    .then((result) => {
      valueCard.class.cardLike(result.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLike = (object) => { 
  api.deleteLike(object)
    .then((result) => {
      valueCard.class.cardLike(result.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
}

const addCards = (card, position) => { 
  if (position === 'prepend') {
    defaultCard.addItemPrepend(card);
  } else {
    defaultCard.addItemAppend(card);
  }
};

const writeValue = (object, className) => { 
  valueCard = {
    object: object,
    class: className
  };
};

const createCard = (item, userId, position) => { 
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open(item);
    },
    handleCardLike: (cardObject) => {
      if (cardObject.like) {
        deleteLike(cardObject);
      } else {
        addLike(cardObject);
      }
      writeValue(item, card);
    },
    handleCardDelete: () => {
      deleteCardConfirm.open();
      writeValue(item, card);
    }
  }, gridElementCard, userId); 
  const cardElement = card.makeCard();
  addCards(cardElement, position);
};



const defaultCard = new Section({ 
  renderer: (item, userId) => {
    createCard(item, userId);
  }
}, gridElements);


Promise.all([api.getInfoUser(), api.getInitialCards()]) 
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    defaultCard.renderItems(cards, user._id);
  })
  .catch((err) => {
    console.log(err);
  });





addButton.addEventListener('click', openCardForm);
editButton.addEventListener('click', openProfileForm);
avatarButton.addEventListener("click", openAvatarForm);
validatorAdd.enableValidation();
validatorEdit.enableValidation();
validatorAvatar.enableValidation();
