export default class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  };

  // функция открытия попапа
  openPopup () {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupByPressEsc);
  };

  // функция закрытия попапа
  closePopup () {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupByPressEsc);
  };

  // функция закрытия попапа при нажатии на Escape
  _closePopupByPressEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  };

  // функция добавления слушателей событий
  setEventListeners () {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup();
      };
      if (evt.target.classList.contains('popup__button-close')) {
        this.closePopup();
      };
    });
  };

};
