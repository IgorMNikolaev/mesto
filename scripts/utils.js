import {popupImage, popupImageScale, popupImageName} from './constants.js';

export function scaleElement(name, image){
  openPopup(popupImage);
  popupImageName.textContent = name;
  popupImageScale.src = image;
  popupImageScale.alt = name;
}

export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeCheck);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeCheck);
}

export function escapeCheck(event) {
  const popup = document.querySelector('.popup_opened');
  if (event.key ==='Escape') {
    closePopup(popup);
  }
}
