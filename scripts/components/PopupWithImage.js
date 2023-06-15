import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._zoomedImageElement = this._popupElement.querySelector('.popup-zoom-image__image');
    this._zoomedImageCaptionElement = this._popupElement.querySelector('.popup-zoom-image__image-caption');
    this.openPopup = this.openPopup.bind(this)
  };

  openPopup (cardDataObject) {
    super.openPopup();
    this._zoomedImageElement.src = cardDataObject[1];
    this._zoomedImageElement.alt = cardDataObject[0];
    this._zoomedImageCaptionElement.textContent = cardDataObject[0];
  };

};
