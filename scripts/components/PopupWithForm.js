import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this.submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  setInputValues(object) {
    const {name, description} = object;
    const values = [name, description];
    let i = 0;
    this._inputList.forEach(function (input) {
      input.value = values[i];
      i=i+1;
    });
  }

  disablingButton() {
    const button = this._popup.querySelector('.popup__submit-button');
    button.classList.add('popup__submit-button_disabled');
    button.disabled=true;
  }

  closePopup() {
    super.closePopup();
    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('click', (event) => this._listenFocus(event));
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm(this._getInputValues());
      this.closePopup();
    });
  }

  clearInputs() {
    this._inputList.forEach((input) => {
      const inputError = input.closest('.popup__input-cover').querySelector('.popup__input-error');
      input.classList.remove('popup__input_invalid');
      inputError.textContent = '';
    });
  }
}

