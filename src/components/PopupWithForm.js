import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({
    formSubmit
  }, popupSelector) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__container').reset();
  }

  open() {
    super.open();
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  blockSubmit() { // функция обнуления ошибок
    const buttonSave = this._popupSelector.querySelector('.popup__button-save');

    this._popupSelector.querySelectorAll(".popup__input").forEach((input) => {
      if (!input.value) { //если в инпут нет значений
        buttonSave.classList.add('popup__button-save_disabled'); //добавляем класс деактивирующий кнопку
        buttonSave.setAttribute('disabled', 'true');
      } else {
        buttonSave.classList.remove('popup__button-save_disabled'); //удаляет класс деактивирующий кнопку
        buttonSave.removeAttribute('disabled');
      }
    });
  }

}