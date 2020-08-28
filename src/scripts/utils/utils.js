import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';

export function callBackWithCard(info, _id, profileInfo, api, confirm) {
  const card = new Card (
    info, {
    handleCardClick: (elementName, elementImage) => {
      const image = new PopupWithImage('.popup-image');
      image.openPopup(elementName, elementImage);
      image.setEventListeners();
      }
    },
    '.template_element',{
      openConfirm: () => {
      confirm.openPopup(card);
    }
  }, {
    generateLike: (likes, cardId, likeScore, elementLike) => {
      function haveId(like){
        return like._id ===_id;
      }
      const haveUserId = likes.some(like => haveId(like))
      if  (haveUserId) {
        api.deleteLike(cardId)
        .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
        .then(card._removeLikeElement(elementLike))
        .catch((err) => {
          console.log(err);
        });
        const index = likes.findIndex (item => item._id == _id);
        likes.splice(index, 1);
      } else {
        api.setLike(cardId)
        .then((res) => {likeScore.textContent = card._setLikeScore(res.likes)})
        .then(card._addLikeElement(elementLike))
        .catch((err) => {
          console.log(err);
        });
        likes.push(profileInfo);
      }
    }
    },
    _id);
    return card;
  }
