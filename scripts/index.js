import {Card} from './card.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup} from './utils.js';
import {popupImage} from './constants.js';
import {initialElements} from './initial.js';

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorMassageInactiv: '.popup__input-error',
  inputCover: '.popup__input-cover'
}

const forms = [
  {formPopupSelector: '.popup__edit-form'},
  {formPopupSelector: '.popup__add-form'}
];

const profile = document.querySelector('.profile');
const buttonEditOpen = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const buttonAddOpen = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup-edit');
const inputName = popupEdit.querySelector('.popup__input-name');
const inputDescription = popupEdit.querySelector('.popup__input-description');
const formElementEdit=popupEdit.querySelector('.popup__edit-form');

const popupAdd = document.querySelector('.popup-add');
const formElementAdd=popupAdd.querySelector('.popup__add-form');
const inputPlace = formElementAdd.querySelector('.popup__input_place');
const inputImage = formElementAdd.querySelector('.popup__input_image');

const elements = document.querySelector('.elements');

formElementAdd.addEventListener('submit', addFormSubmitHandler);
buttonEditOpen.addEventListener('click', openEdit);
buttonAddOpen.addEventListener('click', openAdd);
popupEdit.addEventListener('click', (event) =>listenFocus(event, popupEdit));
popupAdd.addEventListener('click', (event) => listenFocus(event, popupAdd));
popupImage.addEventListener('click', (event) => listenFocus(event, popupImage));
formElementEdit.addEventListener('submit', editFormSubmitHandler);

function openEdit(){
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  clearInputs(popupEdit);
}

function openAdd() {
  openPopup(popupAdd);
  const submitButton = 'popup__submit-button_disabled';
  const button = popupAdd.querySelector('.popup__submit-button');
  inputPlace.value = '';
  inputImage.value = '';
  disablingButton(button, submitButton);
  clearInputs(popupAdd);
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name=inputName.value;
  const description = inputDescription.value;
  profileName.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEdit);
}

function listenFocus(event, popup) {
  if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const info = {};
  info.name = inputPlace.value;
  info.image = inputImage.value;
  elements.prepend(addElement(info));
  closePopup(popupAdd);
}

function addElement (element) {
  const card = new Card(element, '.template_element');
  const newCard = card.generateCard ();
  return newCard;
}

initialElements.forEach((element) => {
  const card = new Card (element, '.template_element');
  const newCard = card.generateCard ();
  elements.append(newCard);
});

forms.forEach((item) => {
  const formValidate = new FormValidator (config, item.formPopupSelector);
  formValidate.enableValidation();
});

function disablingButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled=true;
}

function clearInputs(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    const inputError = input.closest('.popup__input-cover').querySelector('.popup__input-error');
    input.classList.remove('popup__input_invalid');
    inputError.textContent = '';
  });
}

