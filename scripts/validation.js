function toValidate (input, errorClass, inputErrorClass, inputCover, errorMassageInactiv){
  const inputError = input.closest(inputCover).querySelector(errorMassageInactiv);

  if (!input.validity.valid) {
    showError(input, errorClass, inputErrorClass, inputError, input.validationMessage);
  } else {
    hideError(input, errorClass, inputErrorClass, inputError);
  }
}

function showError(input, errorClass, inputErrorClass, inputError, errorMassage) {
  input.classList.add(inputErrorClass);
  inputError.classList.add(errorClass);
  inputError.textContent = errorMassage;
}

function hideError(input, errorClass, inputErrorClass, inputError) {
  input.classList.remove(inputErrorClass);
  inputError.classList.remove(errorClass);
  inputError.textContent = '';
}

function setEventListeners(form, inputSelector, inputErrorClass, errorClass, errorMassageInactiv, inputCover, submitButtonSelector, inactiveButtonClass){
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitButton, inactiveButtonClass);
  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      toValidate(input, errorClass, inputErrorClass, inputCover, errorMassageInactiv);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
}

function checkValidity(inputList){
  return inputList.some(function (input) {
  return !input.validity.valid;
});
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (checkValidity(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.disabled=true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled=false;
  }
}

function enableValidation ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorMassageInactiv, inputCover}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(function(form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, inputSelector, inputErrorClass, errorClass, errorMassageInactiv, inputCover, submitButtonSelector, inactiveButtonClass);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_activ',
  errorMassageInactiv: '.popup__input-error',
  inputCover: '.popup__input-cover'
});

