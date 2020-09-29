export default class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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

  // Функция лайков
  _likeCard(evt) {
    evt.target.classList.toggle('elements__like_active');
  }

  //Функция удаления 
  _deleteCard() {
    this._element.remove();
    this._element = null;
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
      .addEventListener('click', () => {
        this._handleCardClick();
      });
  }

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