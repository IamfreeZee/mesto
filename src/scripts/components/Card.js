export default class Card {
  constructor (dataObject, templateSelector, openPopupFunction) {
    this._cardDataObject = dataObject;
    this._cardTemplateSelector = templateSelector;
    this._zoomCard = openPopupFunction;
  };

  _findCardTemplate () {
    this._cardTemplate = document.querySelector(this._cardTemplateSelector).content;
    return this._cardTemplate;
  };

  _cloneCardTemplate () {
    this._findCardTemplate();
    this._cardElementClone = this._cardTemplate.querySelector('.card').cloneNode(true);
    return this._cardElementClone;
  };

  _toggleLikeButton () {
    this._cardButtonLikeElement.classList.toggle('card__button-like_clicked');
  };

  _deleteCard () {
    this._cardElement.remove();
  };

  _setEventListeners () {
    this._cardButtonLikeElement.addEventListener('click', () => this._toggleLikeButton());
    this._cardButtonDeleteElement.addEventListener('click', () => this._deleteCard());
    this._cardImageElement.addEventListener('click', () => this._zoomCard(this._cardDataObject));
  };

  generateCard () {
    this._cardElement = this._cloneCardTemplate();
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardCaptionElement = this._cardElement.querySelector('.card__caption');
    this._cardButtonLikeElement = this._cardElement.querySelector('.card__button-like');
    this._cardButtonDeleteElement = this._cardElement.querySelector('.card__button-delete');

    // this._cardImageElement.alt = this._cardDataObject.name;
    // this._cardImageElement.src = this._cardDataObject.src;
    // this._cardCaptionElement.textContent = this._cardDataObject.name;
    this._cardImageElement.alt = this._cardDataObject[0];
    this._cardImageElement.src = this._cardDataObject[1];
    this._cardCaptionElement.textContent = this._cardDataObject[0];
    this._setEventListeners();
    return this._cardElement;
  };
};
