export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorMassageInactiv: '.popup__input-error',
  inputCover: '.popup__input-cover'
}

export const forms = [
  {formPopupSelector: '.popup__edit-form'},
  {formPopupSelector: '.popup__add-form'},
  {formPopupSelector: '.popup__avatar-form'},
];

const profile = document.querySelector('.profile');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const buttonEditOpen = profile.querySelector('.profile__edit-button');
export const buttonAddOpen = profile.querySelector('.profile__add-button');
export const buttonConfirmOpen = profile.querySelector('.profile__add-button');
export const buttonAvatarOpen = profile.querySelector('.profile__avatar-button');
