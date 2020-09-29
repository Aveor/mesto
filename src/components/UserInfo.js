export default class UserInfo {
  constructor({ userName, userInfo, userImg }) {
    this._name = userName;
    this._info = userInfo;
    this._img = userImg;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
    this._img.alt = data.name;
  }
}