import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImageScale = this._popup.querySelector('.popup__image');
    this.popupImageName = this._popup.querySelector('.popup__name');
  }

  openPopup(elementName, elementImage) {
    super.openPopup();

    this.popupImageName.textContent = elementName.textContent;
    this.popupImageScale.src = elementImage.src;
    this.popupImageScale.alt = elementName.textContent;
  }
}
