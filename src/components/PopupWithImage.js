import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) {
    const popupViewImg = this._popupSelector.querySelector('.view__image');
    const popupViewCaption = this._popupSelector.querySelector('.view__caption');
    popupViewImg.src = data.link;
    popupViewCaption.textContent = data.name;
    super.open();
  }
}
