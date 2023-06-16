import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitFunction) {
    super (popupSelector);
    this._submitFunction = submitFunction;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formInputs = this._formElement.querySelectorAll('.popup__input');
  };

  closePopup () {
    super.closePopup();
    // this._formElement.reset();
  };

  getInputValues () {
    this._inputValuesObj = {};
    this._inputValuesObj[0] = this._formInputs[0].value;
    this._inputValuesObj[1] = this._formInputs[1].value;
    // console.log(this._inputValuesObj)
    return this._inputValuesObj;
  };

  setInputValues (userInfoObj) {
    this._formInputs[0].value = userInfoObj[0];
    this._formInputs[1].value = userInfoObj[1];
    // console.log(this._formInputs[1].value)
  };

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitFunction);
  };

};
