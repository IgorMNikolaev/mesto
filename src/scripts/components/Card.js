export default class Card {
  constructor (cardInfo, {handleCardClick}, cardSelector, {openConfirm}, {generateLike}, userId) {
    this._owner = cardInfo.owner;
    this._id = cardInfo._id;
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._likes = cardInfo.likes;
    this._selector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.openConfirm = openConfirm;
    this.generateLike = generateLike;
    this.userId = userId;
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
    const elementLikeScore = this._card.querySelector('.element__like-count');
    elementLikeScore.textContent=this._setLikeScore(this._likes);
    elementImage.src = this._link;
    elementName.textContent = this._name;
    this._setLikeSelector(this.userId, this._likes, elementLike);
    this._chooseOwner(elementTrashButton);

    this._setEventListeners(elementLike, elementTrashButton, elementImage, elementName, elementLikeScore);
    return this._card;
  }

  _setEventListeners(elementLike, elementTrashButton, elementImage, elementName, elementLikeScore) {
    elementLike.addEventListener('click',  () => this.generateLike(this._likes, this._id, elementLikeScore, elementLike));
    elementTrashButton.addEventListener('click',  () => this.openConfirm(this._id));
    elementImage.addEventListener('click',  () => this.handleCardClick(elementName, elementImage));
  }

  _addLikeElement(elementLike) {
    elementLike.classList.add('element__like_activ');
  }

  _removeLikeElement(elementLike) {
    elementLike.classList.remove('element__like_activ');
  }


  _chooseOwner(element) {
    if (this._owner._id != this.userId) {
      element.classList.add('element__trash-button-inactiv');
    }
  }

 _setLikeSelector(userId, likes, elementLike) {
   function haveId(like) {
    return like._id === userId;

  }
  const haveUserId = likes.some(like => haveId(like))
  if  (haveUserId) {
    this._addLikeElement(elementLike)
  } else {};
}

  _setLikeScore(likes) {
    let i=0;
    likes.forEach(like => {
      i=i+1
    });
    return i;
  }

  _deleteElement (){
    this._card.remove()
  }
}
