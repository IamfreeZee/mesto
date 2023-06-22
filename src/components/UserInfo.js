export default class UserInfo {
  constructor (profileInfoSelectors) {
    this._userName = document.querySelector(profileInfoSelectors.userNameSelector);
    this._userCaption = document.querySelector(profileInfoSelectors.userCaptionSelector);
    this._userAvatar = document.querySelector(profileInfoSelectors.userAvatarSelector);
  };

  getUserInfo () {
    this._userInfoObj = {};
    this._userInfoObj.userName = this._userName.textContent;
    this._userInfoObj.userCaption = this._userCaption.textContent;
    return this._userInfoObj;
  };

  setUserInfo (userDataObj) {
    this._userName.textContent = userDataObj.name;
    this._userCaption.textContent = userDataObj.about;
    this._userAvatar.style.backgroundImage = `url('${userDataObj.avatar}')`;
  };

};
