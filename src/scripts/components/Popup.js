
export default class Popup {
  constructor(popupSelector) {
  this._popup = document.querySelector(popupSelector);
  this.boundHandleEscClose = this._handleEscClose.bind(this);
  }

  openPopup(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.boundHandleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.boundHandleEscClose);
  }

  _handleEscClose(event) {
    const popup = document.querySelector('.popup_opened');
    if (event.key ==='Escape') {
      this.closePopup(popup);
    }
  }

  _listenFocus(event) {
    if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => this._listenFocus(event));
  }
}



