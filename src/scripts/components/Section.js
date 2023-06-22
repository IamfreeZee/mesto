export default class Section {
  constructor (rendererFunction, cardContainerSelector) {
    this._renderer = rendererFunction;
    this._cardContainer = document.querySelector(cardContainerSelector);
  };

  renderItems (cardsArray) {
    cardsArray.forEach((card) => {
      this._renderer(card);
    });
  };

  addItemPrepend (cardElement) {
    this._cardContainer.prepend(cardElement);
  };

  addItemAppend (cardElement) {
    this._cardContainer.append(cardElement);
  };

};
