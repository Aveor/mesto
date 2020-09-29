export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
    this._handleOverlayClick = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    }
  }
  //Функция открытия
  open() {
    this._popupSelector.classList.add('popup_opened');
    this._setEventListeners();
  }
  //Функция закрытия
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClick);
  }

  _setEventListeners() {
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClick);
  }
}