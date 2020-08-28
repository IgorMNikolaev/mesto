import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { config, forms, profileAvatar, buttonEditOpen, buttonAddOpen, buttonAvatarOpen} from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api.js';
import { callBackWithCard } from '../scripts/utils/utils.js';
import './index.css';


const api = new Api({
  baseUrl:'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
      authorization: 'ec93ee6a-cab3-4375-91a2-83f97b61093a',
      'content-type': 'application/json'
    }
});

const confirm = new PopupWithConfirm('.popup__confirm', {submitForm: (card) => {
  api.deleteCard(card._id)
  .then(card._deleteElement())
  .then(confirm.closePopup())
  .catch((err) => {
    console.log(err);
  })
  }
})
confirm.setEventListeners();

api.getInitialData().then((res) => {
  const [cardsInfo, profileInfo] = res;
  const user = new UserInfo({nameSelector:'.profile__name', descriptionSelector:'.profile__description', avatarSelector:'.profile__avatar'});
  const {name, about: description, avatar, _id} = profileInfo;
  user.setUserInfo({name, description, avatar});

  buttonAddOpen.addEventListener('click', () => {
    popupAdd.openPopup();
    popupAdd.inactivSubmit();
    popupAdd.clearInputs();
  });

  buttonEditOpen.addEventListener('click', () => {
    popupEdit.openPopup();
    popupEdit.setInputValues(user.getUserInfo());
    popupEdit.clearInputs();
  });

  buttonAvatarOpen.addEventListener('click',() => {
    popupAvatar.openPopup();
  });

  const initiation = new Section({
    items: cardsInfo,
    renderer: (info) => {
      const card = callBackWithCard(info, _id, profileInfo, api, confirm);
      const newCard = card.generateCard ();
      initiation.addItem(newCard)
    }
    },
    '.elements');

  initiation.render();

const popupEdit = new PopupWithForm('.popup-edit', {
  submitForm: (element) => {
    api.profileInfoEdit(element).then((info) => {
        const name = info.name;
        const description = info.about;
        const avatar = info.avatar;
        user.setUserInfo({name, description, avatar});
      })
      .then(popupEdit.closePopup())
      .catch((err) => {
        console.log(err);
      })
      .finally(()=> {
        popupEdit.renderLoading(false);
      });
  }
});

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup-add', {
  submitForm: (element) => {
    const {name, image:link} = element;
    api.postNewCard(name, link).then((res) => {
    const addCard = new Section(
      {items: [res], renderer: (info) => {
        const card = callBackWithCard(info, _id, profileInfo, api, confirm);
        const newCard = card.generateCard ();
        addCard.addNewcard(newCard);
      }
    },
    '.elements');

    addCard.render();
    })
    .then(popupAdd.closePopup())
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      popupAdd.renderLoading(false);
    });
  },
    disablingButton: (button) => {
    const disableSubmit = new FormValidator(config, '.popup__add-form');
    disableSubmit.disablingButton(button, 'popup__submit-button_disabled');
    }
});

popupAdd.setEventListeners();

})
.catch((err) => {
  console.log(err);
})


const popupAvatar = new PopupWithForm('.popup-avatar', {
  submitForm: (avatarUrl) => {
    const {image} = avatarUrl;
    api.profileAvatarEdit(image).then((res) => {
      profileAvatar.src = res.avatar;
    })
    .then(popupAvatar.closePopup())
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      popupAvatar.renderLoading(false);
    });
  }
});

popupAvatar.setEventListeners();

forms.forEach((item) => {
  const formValidate = new FormValidator (config, item.formPopupSelector);
  formValidate.enableValidation();
});
