import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._zoomedImageElement = this._popupElement.querySelector('.popup-zoom-image__image');
    this._zoomedImageCaptionElement = this._popupElement.querySelector('.popup-zoom-image__image-caption');
  };

  openPopup (cardDataObject) {
    super.openPopup();
    console.log(cardDataObject)
    this._zoomedImageElement.src = cardDataObject.link;
    this._zoomedImageElement.alt = cardDataObject.name;
    this._zoomedImageCaptionElement.textContent = cardDataObject.name;
  };

};
