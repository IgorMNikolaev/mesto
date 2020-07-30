import {scaleElement, openPopup, closePopup, escapeCheck} from './utils.js';

export class Card {
  constructor (cardInfo, cardSelector) {
    this._name = cardInfo.name;
    this._image = cardInfo.image;
    this._selector = cardSelector;
  }

  _getTemplate () {
    const cardElement = document.querySelector(this._selector).content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard () {
  this._card = this._getTemplate();
  const elementImage = this._card.querySelector('.element__image');
  const elementName = this._card.querySelector('.element__name');
  const elementLike = this._card.querySelector('.element__like');
  const elementTrashButton = this._card.querySelector('.element__trash-button');
  elementImage.src = this._image;
  elementName.textContent = this._name;

  this._setEventListeners(elementImage, elementLike, elementTrashButton);
  return this._card;
  }

  _setEventListeners(elementImage, elementLike, elementTrashButton) {
    elementImage.addEventListener('click',  () => scaleElement(this._name, this._image));
    elementLike.addEventListener('click',  () => this._likeElement(elementLike));
    elementTrashButton.addEventListener('click',  () => this._deleteElement(elementTrashButton));
  }

  _likeElement(elementLike) {
    elementLike.classList.toggle('element__like_activ');
  }

  _deleteElement (elementTrashButton){
    const elementRemove = elementTrashButton.closest('.element');
    elementRemove.remove();
  }
}
