import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {config, forms, buttonEditOpen, buttonAddOpen} from '../utils/constants.js';
import {initialElements} from '../utils/initial';
import '../../pages/index.css';

buttonAddOpen.addEventListener('click', () => {
  popupAdd.openPopup();
  popupAdd.disablingButton();
});

buttonEditOpen.addEventListener('click', () => {
  popupEdit.openPopup();
  popupEdit.setInputValues(user.getUserInfo());
  popupEdit.clearInputs();
});

const initiation = new Section({
  items: initialElements,
  renderer: (element) => {
    const card = new Card (element, {handleCardClick: (elementName, elementImage) => {
      const image = new PopupWithImage('.popup-image');
      image.openPopup(elementName, elementImage);
      image.setEventListeners();
      }
    },
    '.template_element');
  const newCard = card.generateCard ();
  initiation.addItem(newCard)
  }
},
'.elements');

initiation.render();

const popupAdd = new PopupWithForm('.popup-add', {
  submitForm: (element) => {
    const addCard = new Section({
      items: [element], renderer: (info) => {
        const card = new Card (info, {
          handleCardClick: (elementName, elementImage) => {
            const image = new PopupWithImage('.popup-image');
            image.openPopup(elementName, elementImage);
            image.setEventListeners();
          }
        },
        '.template_element');
        const newCard = card.generateCard ();
        addCard.addNewcard(newCard);
      }
    },
    '.elements');
    addCard.render();
  }
});

popupAdd.setEventListeners();

const popupEdit = new PopupWithForm('.popup-edit', {
  submitForm: (element) => {
    const useredit = new UserInfo({nameSelector:'.profile__name', descriptionSelector:'.profile__description'});
    useredit.setUserInfo(element);
  }
});

popupEdit.setEventListeners();

const user = new UserInfo({nameSelector:'.profile__name', descriptionSelector:'.profile__description'});

forms.forEach((item) => {
  const formValidate = new FormValidator (config, item.formPopupSelector);
  formValidate.enableValidation();
});
