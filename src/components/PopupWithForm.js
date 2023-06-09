import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitFunction) {
    super (popupSelector);
    this._submitFunction = submitFunction;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formInputs = this._formElement.querySelectorAll('.popup__input');
    this.submitButton = this._formElement.querySelector('.popup__button-save');
  };

  closePopup () {
    super.closePopup();
    this._formElement.reset();
  };

  _getInputValues () {
    this._inputValuesObj = {};
    this._formInputs.forEach((input) => {
      this._inputValuesObj[input.name] = input.value
    });
    return this._inputValuesObj;
  };

  setInputValues (dataObject) {
    this._formInputs.forEach((input) => {
      input.value = dataObject[input.name]
    });
  };

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitButton.textContent = this.submitButton.textContent + '...';
      this._submitFunction(this._getInputValues());
    });
  };

};
