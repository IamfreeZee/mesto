import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
  constructor (popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this.submitButton = this._formElement.querySelector('.popup__button-save');
  };

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitButton.textContent = this.submitButton.textContent + '...';
      this._submitFunction(this._cardObj);
      // console.log(this._cardObj)
    });
  };

  openPopup (context) {
    super.openPopup();
    this._cardObj = context;
  }

};
