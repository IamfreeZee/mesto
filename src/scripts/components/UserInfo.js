export default class UserInfo {
  constructor (profileInfoSelectors) {
    this._userName = document.querySelector(profileInfoSelectors.userNameSelector);
    this._userCaption = document.querySelector(profileInfoSelectors.userCaptionSelector);
  };

  getUserInfo () {
    this._userInfoObj = {};
    this._userInfoObj.userName = this._userName.textContent;
    this._userInfoObj.userCaption = this._userCaption.textContent;
    // console.log(this._userInfoObj)
    return this._userInfoObj;
  };

  setUserInfo (inputValuesObj) {
    // console.log(inputValuesObj)
    this._userName.textContent = inputValuesObj.userName;
    this._userCaption.textContent = inputValuesObj.userCaption;
  };

};
