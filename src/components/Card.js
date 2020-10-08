export default class Card {
  constructor({
    data,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  }, cardSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardSelector;
    this._clickLike = () => {
      this._handleCardLike({
        id: this._id,
        like: this._element.querySelector('.like__button').classList.contains('like__button_type_active'),
        likeSum: this._element.querySelector('.like__sum')
      });
    };
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
  // _likeCard(evt) {
  //   evt.target.classList.toggle('elements__like_active');
  // }

  //Функция удаления 
  cardDelete() {
    this._element.remove();
    this._element = null;
  }

  _checkCardOwner(_owner) {
    if (this._owner === this._userId) {
      return;
    } else {
      this._element.querySelector('.elements__delete').style.display = 'none';
    }
  }

  _likeCardOwner(_id) {
    if (this._likes.some((user) =>
        (user._id === this._userId))) {
      this._element.querySelector('.like__button').classList.add('like__button_type_active');
    }
  }

  cardLike(sum) { 
    this._element.querySelector(".like__button").classList.toggle("like__button_type_active");
    if (sum === 0) {
      this._element.querySelector('.like__sum').style.display = 'none';
    } else {
      this._element.querySelector('.like__sum').style.display = 'block';
      this._element.querySelector('.like__sum').textContent = sum;
    }
  }

  _setEventListeners() {
    this._element
      .querySelector('.like__button')
      .addEventListener('click', (evt) => {
        this._clickLike();
      });

    this._element
      .querySelector('.elements__delete')
      .addEventListener('click', (evt) => {
        this._handleCardDelete()
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
    this._element.querySelector('.elements__title').textContent = this._name;
    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._checkCardOwner(this._owner)
    this._likeCardOwner(this._id)
    if (this._likes.length === 0) {
      this._element.querySelector('.like__sum').style.display = 'none';
    }
    this._element.querySelector('.like__sum').textContent = this._likes.length;

    return this._element;
  }
}