import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { config, forms, profileAvatar, buttonEditOpen, buttonAddOpen, buttonAvatarOpen} from '../scripts/utils/constants.js';
//import {initialElements} from '../scripts/utils/initial';
import './index.css';
import Api from '../scripts/components/Api.js';

// Апи
const api = new Api({
  baseUrl:'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
      authorization: 'ec93ee6a-cab3-4375-91a2-83f97b61093a',
      'content-type': 'application/json'
    }
});

//инициализация
api.getInitialData(api._getProfileInfo(), api._getInitial()).then((res) => {
  const [cardsInfo, profileInfo] = res;
  console.log(cardsInfo);
  console.log(profileInfo);
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
    renderer: (element) => {
      const card = new Card (
        element, {
        handleCardClick: (elementName, elementImage) => {
          const image = new PopupWithImage('.popup-image');
          image.openPopup(elementName, elementImage);
          image.setEventListeners();
          }
        },
        '.template_element',{openConfirm: () => {
          const confirm = new PopupWithConfirm('.popup__confirm', {submitForm: () => {
            console.log(_id)
            api.deleteCard(_id);
            card._deleteElement();
            }
          })
          confirm.openPopup();
          confirm.setEventListeners();
        }
      }, {
        generateLike: (likes, cardId, likeScore, elementLike) => {
          function haveId(like){
            return like._id ===_id;
          }
          const haveUserId = likes.some(like => haveId(like))
          console.log(likes);
          if  (haveUserId) {
            api.deleteLike(cardId)
            .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
            .then(card._removeLikeElement(elementLike));
            const index = likes.findIndex (item => item._id == _id);
            likes.splice(index, 1);
          } else {
            api.setLike(cardId)
            .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
            .then(card._addLikeElement(elementLike));
            likes.push(profileInfo);
          }
        }
        }, _id);
      const newCard = card.generateCard ();
      initiation.addItem(newCard)
    }
    },
    '.elements');

  initiation.render();

//попап эдит
const popupEdit = new PopupWithForm('.popup-edit', {
  submitForm: (element) => {
    api.profileInfoEdit(element).then(() => {
      api._getProfileInfo().then((info) => {
        const name = info.name;
        const description = info.about;
        const avatar = info.avatar;
        user.setUserInfo({name, description, avatar});
      }).finally(()=> {
        popupEdit.renderLoading(false);
      });

    });
  }
});

popupEdit.setEventListeners();

//попап эдд
const popupAdd = new PopupWithForm('.popup-add', {
  submitForm: (element) => {
    console.log(element);
    const {name, image:link} = element;
    api.postNewCard(name, link).then((res) => {
    const addCard = new Section(
      {items: [res], renderer: (info) => {
        const card = new Card (
          info, {
          handleCardClick: (elementName, elementImage) => {
            const image = new PopupWithImage('.popup-image');
            image.openPopup(elementName, elementImage);
            image.setEventListeners();
            }
          },
          '.template_element',{openConfirm: () => {
            const confirm = new PopupWithConfirm('.popup__confirm', {submitForm: () => {
              api.deleteCard(_id);
              card._deleteElement();
              }
            })
            confirm.openPopup();
            confirm.setEventListeners();
          }
        }, {
          generateLike: (likes, cardId, likeScore, elementLike) => {
            function haveId(like){
              return like._id ===_id;
            }
            const haveUserId = likes.some(like => haveId(like))
            console.log(likes);
            if  (haveUserId) {
              api.deleteLike(cardId)
              .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
              .then(card._removeLikeElement(elementLike));
              const index = likes.findIndex (item => item._id == _id);
              likes.splice(index, 1);
            } else {
              api.setLike(cardId)
              .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
              .then(card._addLikeElement(elementLike));
              likes.push(profileInfo);
            }
          }
          }, _id);
    const newCard = card.generateCard ();
    addCard.addNewcard(newCard)
      }
    },
    '.elements');

    addCard.render();
    }).finally(()=> {
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


//попап аватар
const popupAvatar = new PopupWithForm('.popup-avatar', {
  submitForm: (avatarUrl) => {
    const {image} = avatarUrl;
    api.profileAvatarEdit(image).then((res) => {
      profileAvatar.src = res.avatar;
    }).finally(()=> {
      popupAvatar.renderLoading(false);
    });
  }
});

popupAvatar.setEventListeners();



// Валидация
forms.forEach((item) => {
  const formValidate = new FormValidator (config, item.formPopupSelector);
  formValidate.enableValidation();
});


/*/ инициация
api._getInitial().then(items => {
  const initiation = new Section({
    items,
    renderer: (element) => {
      const card = new Card (element, {handleCardClick: (elementName, elementImage) => {
        const image = new PopupWithImage('.popup-image');
        image.openPopup(elementName, elementImage);
        image.setEventListeners();
        }
      },

      '.template_element',{openConfirm: (_id) => {
        const confirm = new PopupWithConfirm('.popup__confirm', _id, {submitForm: (_id) => {
          api.deleteCard(_id);
          card._deleteElement();
          }
        })
        confirm.openPopup();
        confirm.setEventListeners();
      }
    });
    const newCard = card.generateCard ();
    initiation.addItem(newCard)
    }
  },
  '.elements');

  initiation.render();
})
*/





/*const initiation = new Section({
  items: initialElements,
  renderer: (element) => {
    const card = new Card (element, {handleCardClick: (elementName, elementImage) => {
      const image = new PopupWithImage('.popup-image');
      image.openPopup(elementName, elementImage);
      image.setEventListeners();
      }
    },

    '.template_element',{openConfirm: () =>{
      const confirm = new PopupWithForm('.popup__confirm', { })
      confirm.openPopup();
      confirm.setEventListeners();                                              ///////////////////
    }
  });
  const newCard = card.generateCard ();
  initiation.addItem(newCard)
  }
},
'.elements');

initiation.render();
*/


//const card = element.owner._id = '096f27fccdb7c68c43905dc7'

/*
generateLike: (likes, cardId, likeScore, elementLike) => {
  function haveId(like){
    return like._id ===_id;
  }
  const haveUserId = likes.some(like => haveId(like))
  console.log(haveUserId)
  if  (!haveUserId) {
    api.setLike(cardId)
    .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
    .then(card._addLikeElement(elementLike));
  } else {
    api.deleteLike(cardId)
    .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
    .then(card._removeLikeElement(elementLike));
  }
}

function haveId(like) {
    return like._id ===_id;
  }
const haveUserId = likes.some(like => haveId(like))
if  (haveUserId) {
  card._addLikeElement(elementLike)
  } else
}

 (info, {
          handleCardClick: (elementName, elementImage) => {
            const image = new PopupWithImage('.popup-image');
            image.openPopup(elementName, elementImage);
            image.setEventListeners();
          }
        },
        '.template_element',{

        openConfirm: (_id) =>{
        const confirm = new PopupWithConfirm('.popup__confirm', _id, {submitForm: (_id) => {
          api.deleteCard(_id);
          card._deleteElement();
          }
        });
        confirm.openPopup();
        confirm.setEventListeners();
      }
    });
*/
