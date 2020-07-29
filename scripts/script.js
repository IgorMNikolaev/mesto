import {Card} from './card.js';
import {FormValidator} from './validation.js';

const initialElements = [
  {
      name: 'Карачаевск',
      image: 'images/Karach.png'
  },
  {
      name: 'Гора Эльбрус',
      image: 'images/El-brus.png'
  },
  {
      name: 'Домбай',
      image: 'images/Dombai.png'
  },
  {
      name: 'Гора Эльбрус',
      image: 'images/El-brus.png'
  },
  {
      name: 'Домбай',
      image: 'images/Dombai.png'
  },
  {
      name: 'Карачаево-Черкессия',
      image: 'images/Karach.png'
  }
];

const forms = [
{formPopupSelector: '.popup__edit-form'},
{formPopupSelector: '.popup__add-form'}
];

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorMassageInactiv: '.popup__input-error',
  inputCover: '.popup__input-cover'
}


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

const popupImage = document.querySelector('.popup-image');
const popupImageScale = popupImage.querySelector('.popup__image');
const popupImageName = popupImage.querySelector('.popup__name');

const elements = document.querySelector('.elements');

formElementAdd.addEventListener('submit', addFormSubmitHandler);
buttonEditOpen.addEventListener('click', openEdit);
buttonAddOpen.addEventListener('click', openAdd);
popupEdit.addEventListener('click', (event) =>listenFocus(event, popupEdit));
popupAdd.addEventListener('click', (event) => listenFocus(event, popupAdd));
popupImage.addEventListener('click', (event) => listenFocus(event, popupImage));
formElementEdit.addEventListener('submit', editFormSubmitHandler);

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeCheck);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeCheck);
}

function openEdit(){
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;profileName
}

function openAdd() {
  openPopup(popupAdd);
  const submitButton = 'popup__submit-button_disabled';
  const button = popupAdd.querySelector('.popup__submit-button');
  inputPlace.value = '';
  inputImage.value = '';
  disablingButton(button, submitButton);
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name=inputName.value;
  const description = inputDescription.value;
  profileName.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEdit);
}

function escapeCheck(event) {
  const popup = document.querySelector('.popup_opened');
  if (event.key ==='Escape') {
    closePopup(popup);
  }
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

export function scaleElement(name, image){
  openPopup(popupImage);
  popupImageName.textContent = name;
  popupImageScale.src = image;
  popupImageScale.alt = name;
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
