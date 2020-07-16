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
const buttonEditClose = popupEdit.querySelector('.popup-edit__close-button');
const formElementEdit=popupEdit.querySelector('.popup__edit-form');

const popupAdd = document.querySelector('.popup-add');
const buttonAddClose = popupAdd.querySelector('.popup-add__close-button');
const formElementAdd=popupAdd.querySelector('.popup__add-form');
const inputPlace = formElementAdd.querySelector('.popup__input_place');
const inputImage = formElementAdd.querySelector('.popup__input_image');

const popupImage = document.querySelector('.popup-image');
const buttonImageClose = popupImage.querySelector('.popup-image__close-button');
const popupImageScale = popupImage.querySelector('.popup__image');
const popupImageName = popupImage.querySelector('.popup__name');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

const popupClose = document.querySelector('.popup');

buttonEditOpen.addEventListener('click', openEdit);
buttonAddOpen.addEventListener('click', openAdd);
popupEdit.addEventListener('click', () => closePopup(event, popupEdit));
//document.addEventListener('keydown', () => closePopup(event, popupEdit));
formElementEdit.addEventListener('submit', editFormSubmitHandler);
popupAdd.addEventListener('click', () => closePopup(event, popupAdd));
//document.addEventListener('keydown', () => closePopup(event, popupAdd));
formElementAdd.addEventListener('submit', addformSubmitHandler);
popupImage.addEventListener('click', () => closePopup(event, popupImage));
//document.addEventListener('keydown', () => closePopup(event, popupImage));


function closePopup(event, popup) {
  if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
  togglePopup(popup);
  } else if (event.key ==='Escape' && popup.classList.contains('popup_opened'))  {
    togglePopup(popup);
  }
  removeKeyListener(popup);
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function openEdit(){
  togglePopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  addKeyListener(popupEdit);
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name=inputName.value;
  const description = inputDescription.value;
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  profileName.textContent = name;
  profileDescription.textContent = description;
  togglePopup(popupEdit);
}

function openAdd() {
  togglePopup(popupAdd);
  inputPlace.value = '';
  inputImage.value = '';
  addKeyListener(popupAdd);
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

function addformSubmitHandler(evt) {
  evt.preventDefault();
  const name = inputPlace.value;
  const image = inputImage.value;
  elements.prepend(addElement(name, image));
  togglePopup(popupAdd);
}

function deleteElement(event) {
  const elementRemove = event.target.closest('.element');
  elementRemove.remove();
}

function likeElement(event) {
  event.target.classList.toggle('element__like_activ');
}

function scaleElement(name, image){
  togglePopup(popupImage);
  popupImageName.textContent = name;
  popupImageScale.src = image;
  popupImageScale.alt = name;
  addKeyListener(popupImage);
}

initialElements.forEach(function (element) {
  const name = element.name;
  const image = element.image;
  elements.append(addElement(name, image));
});

function addKeyListener(popup){
  document.addEventListener('keydown', () => closePopup(event, popup));
}

function removeKeyListener(popup){
  document.removeEventListener('keydown', () => closePopup(event, popup));
}
