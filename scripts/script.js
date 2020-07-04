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
const inputname = formElementAdd.querySelector('.popup__input_place');
const inputimage = formElementAdd.querySelector('.popup__input_image');

const popupImage = document.querySelector('.popup-image');
const buttonImageClose = popupImage.querySelector('.popup-image__close-button');

const elements = document.querySelector('.elements')
const elementTemplate = document.querySelector('#element').content;

buttonEditOpen.addEventListener('click', openEdit);
buttonAddOpen.addEventListener('click', openAdd);
buttonEditClose.addEventListener('click', closePopup);
formElementEdit.addEventListener('submit', editFormSubmitHandler);
buttonAddClose.addEventListener('click', closePopup);
formElementAdd.addEventListener('submit', addformSubmitHandler);
buttonImageClose.addEventListener('click', closePopup);

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function closePopup(event) {
  const popupClose = event.target.closest('.popup')
  togglePopup (popupClose);
}

function openEdit(){
  togglePopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
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
  inputname.value = '';
  inputimage.value = '';
}

function addElement (name, image) {
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__name').textContent = name;
  newElement.querySelector('.element__image').alt = name;
  newElement.querySelector('.element__image').src = image;
  newElement.querySelector('.element__trash-button').addEventListener('click', deleteElement);
  newElement.querySelector('.element__like').addEventListener('click', likeElement);
  newElement.querySelector('.element__image').addEventListener('click', scaleElement);
  return newElement;
}

function addformSubmitHandler(evt) {
  evt.preventDefault();
  const name = inputname.value;
  const image = inputimage.value;
  addElement(name, image);
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

function scaleElement(event){
  togglePopup(popupImage);
  const image = event.target.closest('.element__image');
  const parentName = event.target.closest('.element');
  const name = parentName.querySelector('.element__name');
  popupImage.querySelector('.popup__image').src = image.src;
  popupImage.querySelector('.popup__image').alt = name.textContent;;
  popupImage.querySelector('.popup__name').textContent = name.textContent;
}

initialElements.forEach(function (element) {
  const name = element.name;
  const image = element.image;
  elements.append(addElement(name, image));
});


