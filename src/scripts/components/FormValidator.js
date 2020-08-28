export default class FormValidator {
  constructor(config, formPopupSelector) {
  this._inputSelector = config.inputSelector;
  this._submitButtonSelector = config.submitButtonSelector;
  this._inactiveButtonClass = config.inactiveButtonClass;
  this._inputErrorClass = config.inputErrorClass;
  this._errorMessageInactiv = config.errorMessageInactiv;
  this._inputCover = config.inputCover;
  this._formPopupSelector = formPopupSelector;
  }

  enableValidation() {
    const form = document.querySelector(this._formPopupSelector);
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const submitButton = form.querySelector(this._submitButtonSelector);
    this._setEventListeners(inputList, submitButton);
  }

  _setEventListeners(inputList, submitButton) {
    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((input) => {
      input.addEventListener('input',() => this._toValidate(input));
      input.addEventListener('input',() => this. _toggleButtonState(inputList, submitButton));
      submitButton.addEventListener ('submit',(evt) => {
        evt.preventDefault();
      });
    });
  }

  _toValidate(input) {
    const inputError = input.closest(this._inputCover).querySelector(this._errorMessageInactiv);

    if (!input.validity.valid) {
    this._showError(input, inputError);
    } else {
    this._hideError(input, inputError);
    }
  }

  _showError(input, inputError) {
    input.classList.add(this._inputErrorClass);
    inputError.textContent = input.validationMessage;
  }

  _hideError(input, inputError) {
    input.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
  }

  _checkValidity(inputList){
    return inputList.some(function (input) {
    return !input.validity.valid;
  });
  }

  _toggleButtonState(inputList, submitButton) {
    if (this._checkValidity(inputList)) {
      this.disablingButton(submitButton, this._inactiveButtonClass);
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled=false;
    }
  }

  disablingButton(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled=true;
  }
}
