import { togglePopup } from './index.js'
const popupPic = document.querySelector('.popup__background');

export default class Card {
    constructor(data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }

    //Функция  клонирующая template элемент
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector('.elements__item')
            .cloneNode(true);

        return cardElement;
    }

    //Функция открытия popup просмотра картинки
    _openImage() {
        const popupViewImg = document.querySelector('.view__image');
        const popupViewCaption = document.querySelector('.view__caption');
        popupViewCaption.textContent = this._name;
        popupViewImg.src = this._link;
        popupViewImg.alt = this._name;
        togglePopup(popupPic);
    }

    // Функция лайков
    _likeCard(evt) {
        evt.target.classList.toggle('elements__like_active');
    }

    //Функция удаления карточки
    _deleteCard(evt) {
        const removeCard = evt.target.closest('.elements__item');
        removeCard.remove();
    }

    _setEventListeners() {
        this._element
            .querySelector('.elements__like')
            .addEventListener('click', (evt) => {
                this._likeCard(evt);
            });

        this._element
            .querySelector('.elements__delete')
            .addEventListener('click', (evt) => {
                this._deleteCard(evt);
            });

        this._element
            .querySelector('.elements__image')
            .addEventListener('click', (evt) => {
                this._openImage(evt);
            });
    }

    //Функция создания карточки
    makeCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardImg = this._element.querySelector('.elements__image');
        cardImg.src = this._link;
        cardImg.alt = this._name;
        this._element.querySelector('.elements__title').textContent = this._name;

        return this._element;
    }
}