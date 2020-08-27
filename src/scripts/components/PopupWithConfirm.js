import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this.submitForm = submitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm();
      this.closePopup();
    });
  }
}


/*
при сабмите

//отмена стандартного сабмита
//отправка делит запроса (нужен ай ди)
удаление карточки со странички ()
//закрытие попапа.
*/
