import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this.submitForm = submitForm;
  }

  openPopup(data) {
    super.openPopup();
    this.data = data
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm(this.data);
    });
  }
}
