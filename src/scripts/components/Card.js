export default class Card {
  constructor (cardInfo, {handleCardClick}, cardSelector) {

    this._name = cardInfo.name;
    this._image = cardInfo.image;
    this._selector = cardSelector;
    this.handleCardClick = handleCardClick;
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

  this._setEventListeners(elementLike, elementTrashButton, elementImage, elementName);
  return this._card;
  }

  _setEventListeners(elementLike, elementTrashButton, elementImage, elementName) {
    elementLike.addEventListener('click',  () => this._likeElement(elementLike));
    elementTrashButton.addEventListener('click',  () => this._deleteElement());
    elementImage.addEventListener('click',  () => this.handleCardClick(elementName, elementImage));
  }

  _likeElement(elementLike) {
    elementLike.classList.toggle('element__like_activ');
  }

  _deleteElement (){
    this._card.remove()
  }
}
