export default class Section {
  constructor ({ itemsArray, rendererFunction }, cardContainerSelector) {
    this._initialCardsArray = itemsArray;
    this._renderer = rendererFunction;
    this._cardContainer = document.querySelector(cardContainerSelector);
  };

  renderItems () {
    this._initialCardsArray.forEach((card) => {
      this._renderer(card);
    });
  };

  addItem (cardElement) {
    this._cardContainer.prepend(cardElement);
  };

};


