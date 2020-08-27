import PopupWithConfirm from "./PopupWithConfirm";
import { info } from "autoprefixer";

export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getInitial() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
      })
     .then((res) => {
       if (res.ok) {
          return res.json();
       }
         return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }

  _getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
       })
  }

  profileInfoEdit(info) {
    const {name, description: about} = info;
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
        })
      })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
       })
  }

  profileAvatarEdit(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
        })
      })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
       })
  }

  postNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
        })
      })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
       })
  }

  deleteCard(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
       })
  }

  setLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
       })
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
           return res.json();
        }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
       })
  }

  getInitialData() {
    return Promise.all([this._getInitial(), this._getProfileInfo()]);
  }

}

//console.log(res)
/*
.then(res =>{
  if (res.ok) {
    res.json();
  }
})
*/
