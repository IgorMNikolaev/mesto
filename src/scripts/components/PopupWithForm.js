import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm, disablingButton}) {
    super(popupSelector);
    this.submitButton = this._popup.querySelector('.popup__submit-button');
    this.loader = this._popup.querySelector('.popup__loading')
    this.disablingButton = disablingButton;
    this.submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this.submitButton.classList.add('.popup__submit-button_invisible');
      this.loader.classList.add('.popup__loading_visible');
    } else {
      this.submitButton.classList.remove('.popup__submit-button_invisible');
      this.loader.classList.remove('.popup__loading_visible');
    }
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

  closePopup() {
    super.closePopup();
    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('click', (event) => this._listenFocus(event));
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
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

  inactivSubmit(){
   this.disablingButton(this.submitButton)
 }
}

