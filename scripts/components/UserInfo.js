export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descriptionSelector = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const info = {}
    info.name = this._nameSelector.textContent;
    info.description = this._descriptionSelector.textContent;
    return info;
  }

  setUserInfo(info) {
    const {name, description} = info;
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
  }
}
