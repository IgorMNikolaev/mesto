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


const openEditbutton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup-edit');
const InputName = document.querySelector('.popup__input-name');
const InputDiscription = document.querySelector('.popup__input-discription');
const profileName = document.querySelector('.profile__name');
const profileDiscription = document.querySelector('.profile__discription');
openEditbutton.addEventListener('click', openEdit);

function openEdit(){
  popupEdit.classList.add('popup_opened');
  InputName.value = profileName.textContent;
  InputDiscription.value = profileDiscription.textContent;
}
 const closeEditbutton = document.querySelector('.popup-edit__close-button');
 closeEditbutton.addEventListener('click', closeEdit);
 function closeEdit(){
   popupEdit.classList.remove('popup_opened');
 }

const editformElement=document.querySelector('.popup__edit-form');
editformElement.addEventListener('submit', editformSubmitHandler);

function editformSubmitHandler (evt) {
    evt.preventDefault();

    const name=InputName.value;
    const discription = InputDiscription.value;
    const profileName = document.querySelector('.profile__name');
    const profileDiscription = document.querySelector('.profile__discription');
    profileName.textContent = name;
    profileDiscription.textContent = discription;
    closeEdit();
}

  const openAddbutton = document.querySelector('.profile__add-button');
  openAddbutton.addEventListener('click', openAdd);

  function openAdd(){
  Inputname.value = '';
  Inputimage.value = '';
  popupAdd.classList.add('popup_opened');
  }

  const closeAddbutton = document.querySelector('.popup-add__close-button');
  closeAddbutton.addEventListener('click', closeAdd);

  function closeAdd(){
    popupAdd.classList.remove('popup_opened');
  }

  const elements = document.querySelector('.elements')
  const elementTemplate = document.querySelector('#element').content;
  const popupAdd = document.querySelector('.popup-add');
  const addformElement=document.querySelector('.popup__add-form');
  const Inputname = addformElement.querySelector('.popup__input_place');
  const Inputimage = addformElement.querySelector('.popup__input_image');
  addformElement.addEventListener('submit', addformSubmitHandler);

  function addListeners(newElement) {
    newElement.querySelector('.element__trash-button').addEventListener('click', deleteElement);
    newElement.querySelector('.element__like').addEventListener('click', likeElement);
    newElement.querySelector('.element__image').addEventListener('click', scaleElement);
  }

function addElement (name, image) {
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector('.element__name').textContent = name;
  newElement.querySelector('.element__image').src = image;
  addListeners(newElement);
  return newElement;
}

function addformSubmitHandler(evt) {
  evt.preventDefault();
  const name = Inputname.value;
  const image = Inputimage.value;
  addElement(name, image);
  elements.prepend(addElement(name, image));
  closeAdd();
  }

  function deleteElement(event){
    const eltoDel = event.target.closest('.element');
    eltoDel.remove();
  };

  function likeElement(event){
    event.target.classList.toggle('element__like_activ');
  };

  const popupImage = document.querySelector('.popup-image');

  function scaleElement(event){
    const image = event.target.closest('.element__image');
    const parentname = event.target.closest('.element');
    const name = parentname.querySelector('.element__name');
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image').src = image.src;
    popupImage.querySelector('.popup__name').textContent = name.textContent;
  }

 const closeImagebutton = document.querySelector('.popup-image__close-button');
 closeImagebutton.addEventListener('click', closeImage);

 function closeImage(){
   popupImage.classList.remove('popup_opened');
 }

 function inition () {
  for (let i = 0; i < initialElements.length; i++) {
    name = initialElements[i].name;
    image = initialElements[i].image;
    elements.append(addElement(name, image));
  }
 }
  inition ()

