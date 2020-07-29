

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
  this._card.querySelector('.element__image').src = this._image;
  this._card.querySelector('.element__name').textContent = this._name;

  this._setEventListeners();
  return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.element__like').addEventListener('click',  () => this._likeElement());
    this._card.querySelector('.element__trash-button').addEventListener('click',  () => this._deleteElement());
    this._card.querySelector('.element__image').addEventListener('click',  () => scaleElement(this._name, this._image));
  }

  _likeElement() {
    this._card.querySelector('.element__like').classList.toggle('element__like_activ');
  }

  _deleteElement (){
    const elementRemove = this._card.querySelector('.element__trash-button').closest('.element');
    elementRemove.remove();
  }
}

import {scaleElement} from './script.js';
