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
const elementTemplate = document.querySelector('#element').content;

buttonEditOpen.addEventListener('click', openEdit);
buttonAddOpen.addEventListener('click', openAdd);
popupEdit.addEventListener('click', (event) =>listenFocus(event, popupEdit));
formElementEdit.addEventListener('submit', editFormSubmitHandler);
popupAdd.addEventListener('click', (event) => listenFocus(event, popupAdd));
formElementAdd.addEventListener('submit', addFormSubmitHandler);
popupImage.addEventListener('click', (event) => listenFocus(event, popupImage));

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (event) => escapeCheck(event, popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (event) => escapeCheck(event, popup));
}

function openEdit(){
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;profileName
}

function openAdd() {
  openPopup(popupAdd);
  inputPlace.value = '';
  inputImage.value = '';
  disablingButton(popupAdd);
}

function disablingButton(popup) {
  const button = popup.querySelector('.popup__submit-button')
  button.classList.add('popup__submit-button_disabled');
  button.disabled=true;
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name=inputName.value;
  const description = inputDescription.value;
  profileName.textContent = name;
  profileDescription.textContent = description;
  closePopup(popupEdit);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = inputPlace.value;
  const image = inputImage.value;
  elements.prepend(addElement(name, image));
  closePopup(popupAdd);
}

function addElement (name, image) {
  const newElement = elementTemplate.cloneNode(true);
  const place = newElement.querySelector('.element__image');
  newElement.querySelector('.element__name').textContent = name;
  place.alt = name;
  place.src = image;
  newElement.querySelector('.element__trash-button').addEventListener('click', deleteElement);
  newElement.querySelector('.element__like').addEventListener('click', likeElement);
  newElement.querySelector('.element__image').addEventListener('click', () => scaleElement(name, image));
  return newElement;
}

function deleteElement(event) {
  const elementRemove = event.target.closest('.element');
  elementRemove.remove();
}

function likeElement(event) {
  event.target.classList.toggle('element__like_activ');
}

function scaleElement(name, image){
  openPopup(popupImage);
  popupImageName.textContent = name;
  popupImageScale.src = image;
  popupImageScale.alt = name;
}

function escapeCheck(event, popup) {
  if (event.key ==='Escape')  {
    closePopup(popup);
  }
}

function listenFocus(event, popup) {
  if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

initialElements.forEach(function (element) {
  const name = element.name;
  const image = element.image;
  elements.append(addElement(name, image));
});
