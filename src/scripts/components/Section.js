export default class Section {
  constructor (rendererFunction, cardContainerSelector) {
    this._renderer = rendererFunction;
    this._cardContainer = document.querySelector(cardContainerSelector);
  };

  renderItems (itemsArray) {
    itemsArray.forEach((card) => {
      this._renderer(card);
    });
  };

  addItem (cardElement) {
    this._cardContainer.prepend(cardElement);
  };

};
