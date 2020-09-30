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


// export default class PopupWithImage extends Popup {
//   constructor(popupSelector) {
//     super(popupSelector)
//     this._popupViewImg = this._popupSelector.querySelector('.view__image');
//     this._popupViewCaption = this._popupSelector.querySelector('.view__caption');
//   }

//   open(data) {
//     this._popupViewImg.src = data.link;
//     this._popupViewCaption.textContent = data.name;
//     super.open();
//   }
// }