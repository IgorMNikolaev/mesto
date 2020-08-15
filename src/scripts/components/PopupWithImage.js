import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(elementName, elementImage) {
    super.openPopup();
    const popupImageScale = this._popup.querySelector('.popup__image');
    const popupImageName = this._popup.querySelector('.popup__name');

    popupImageName.textContent = elementName.textContent;
    popupImageScale.src = elementImage.src;
    popupImageScale.alt = elementName.textContent;
  }
}

