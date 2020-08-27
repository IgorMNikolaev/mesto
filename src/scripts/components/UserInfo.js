export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const info = {}
    info.name = this._nameSelector.textContent;
    info.description = this._descriptionSelector.textContent;
    return info;
  }

  setUserInfo(info) {
    const {name, description, avatar} = info;
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
    this._avatarSelector.src=avatar;
  }
}
