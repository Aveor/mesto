export default class UserInfo {
  constructor(userElement, avatarElement) {
    this._profileTitle = userElement.profileTitle;
    this._profileSubtitle = userElement.profileSubtitle;
    this._avatar = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._avatar.textContent
    }
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
    this._profileTitle.id = data._id;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }

  getUserAvatar() {
    return this._avatar.src;
  }
  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  };

}
