export default class UserInfo {
  constructor (profileInfoSelectors) {
    this._userName = document.querySelector(profileInfoSelectors.userNameSelector);
    this._userCaption = document.querySelector(profileInfoSelectors.userCaptionSelector);
  };

  getUserInfo () {
    this._userInfoObj = {};
    this._userInfoObj[0] = this._userName.textContent;
    this._userInfoObj[1] = this._userCaption.textContent;
    // console.log(this._userInfoObj)
    return this._userInfoObj;
  };

  setUserInfo (inputValuesObj) {
    // console.log(inputValuesObj)
    this._userName.textContent = inputValuesObj[0];
    this._userCaption.textContent = inputValuesObj[1];
  };

};
