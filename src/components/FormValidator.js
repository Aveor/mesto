export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector; 
    this._submitButtonSelector = data.submitButtonSelector; 
    this._inactiveButtonClass = data.inactiveButtonClass; 
    this._inputErrorClass = data.inputErrorClass; 
    this._errorClass = data.errorClass; 
    this._formElement = formElement;
  }

  // Функция добавляющая класс  с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция удаляющая класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    // Скрываем сообщение об ошибке 
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Функция, которая проверяет валидность поля и показывает ошибку
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Функция проверки инпутов
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Функция блокировки/разблокировки кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', false);
    }
  }

  // Функция проверки валидации
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}