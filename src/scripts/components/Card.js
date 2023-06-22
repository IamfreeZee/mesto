export default class Card {
  constructor (dataObject, templateSelector, openPopupFunction, openCardDeletePopupFunc, setLikeStateFunc) {
    this._cardDataObject = dataObject;
    this._cardTemplateSelector = templateSelector;
    this._zoomCardFunc = openPopupFunction;
    this._openCardDeletePopupFunc = openCardDeletePopupFunc;
    this._userId = this._cardDataObject.userId;
    this._ownerId = this._cardDataObject.owner._id;
    this._cardId = this._cardDataObject._id;
    this._likesArray = this._cardDataObject.likes;
    this._setLikeStateFunc = setLikeStateFunc;
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

  _setEventListeners () {
    this._cardButtonLikeElement.addEventListener('click', () => {
      this._setLikeState();
    });
    this._cardButtonDeleteElement.addEventListener('click', () => {
      this._openCardDeletePopupFunc(this);
    });
    this._cardImageElement.addEventListener('click', () => {
      this._zoomCardFunc(this._cardDataObject);
    });
  };

  _checkCardOwner () {
    if (this._userId !== this._ownerId) {
      this._cardButtonDeleteElement.remove();
    };
  };

  _checkLikesQuantity () {
    this._likesArray.forEach((item) => {
      if (item._id === this._userId) {
        this._cardButtonLikeElement.classList.toggle('card__button-like_clicked');
      };
    });
    this._likeCounterElem.textContent = this._likesArray.length;
  };

  _setLikeState () {
    this._setLikeStateFunc(this._cardId, this._cardButtonLikeElement);
  };

  toggleLikeButton (likesArr) {
    this._cardButtonLikeElement.classList.toggle('card__button-like_clicked');
    this._likeCounterElem.textContent = likesArr.length;
  }

  deleteCard () {
    this._cardElement.remove();
  };

  generateCard () {
    this._cardElement = this._cloneCardTemplate();
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardCaptionElement = this._cardElement.querySelector('.card__caption');
    this._cardButtonLikeElement = this._cardElement.querySelector('.card__button-like');
    this._cardButtonDeleteElement = this._cardElement.querySelector('.card__button-delete');
    this._likeCounterElem = this._cardElement.querySelector('.card__like-counter');
    this._checkCardOwner();
    this._checkLikesQuantity();

    this._cardImageElement.src = this._cardDataObject.link;
    this._cardImageElement.alt = this._cardDataObject.name;
    this._cardCaptionElement.textContent = this._cardDataObject.name;
    this._setEventListeners();
    return this._cardElement;
  };
};
