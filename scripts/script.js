// список переменных
// все попапы со всей страницы
const popups = document.querySelectorAll('.popup');

// переменные попапов
const popupProfileEditElement = document.querySelector('.popup-profile-edit');
const popupAddNewCardElement = document.querySelector('.popup-add-new-card');
const popupZoomImageElement = document.querySelector('.popup-zoom-image');

// переменные кнопок
const popupEditButtonElement = document.querySelector('.profile__button-edit');
const popupAddButtonElement = document.querySelector('.profile__button-add');

// переменные текстовых полей в профиле
const profileNameElement = document.querySelector('.profile__user-name');
const profileCaptionElement = document.querySelector('.profile__user-caption');

// переменные форм
const popupProfileEditFormElement = document.forms['edit-profile'];
const popupAddNewCardFormElement = document.forms['add-new-card'];

// переменные полей инпутов в форме попапа редактирования профиля
const nameInputElement = popupProfileEditFormElement.querySelector('.popup__input_user_name');
const captionInputElement = popupProfileEditFormElement.querySelector('.popup__input_user_caption');

// переменные полей инпутов в форме добавления новой карточки
const cardNameInputElement = popupAddNewCardFormElement.querySelector('.popup__input_card_name');
const cardLinkInputElement = popupAddNewCardFormElement.querySelector('.popup__input_card_link');

// переменные внутри попапа с увеличенным изображением
const zoomedImageElement = popupZoomImageElement.querySelector('.popup-zoom-image__image');
const zoomedImageCaptionElement = popupZoomImageElement.querySelector('.popup-zoom-image__image-caption');

// Переменная для вставки новой карточки
const cardsListElement = document.querySelector('.cards__list');

// массив объектов изначальных карточек
const initialCards = [
  {
    name: 'Алтай',
    src: './images/collection-altay.jpg'
  },
  {
    name: 'Байкал',
    src: './images/collection-baykal.jpg'
  },
  {
    name: 'Эльбрус',
    src: './images/collection-elbrus.jpg'
  },
  {
    name: 'Карелия',
    src: './images/collection-kareliya.jpg'
  },
  {
    name: 'Нижний Новгород',
    src: './images/collection-nizhny-novgorod.jpg'
  },
  {
    name: 'Камчатка',
    src: './images/collection-kamchatka.jpg'
  }
];

// список функций
// функция открытия попапа
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupIfPressEsc);
};

// функция закрытия попапа
function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupIfPressEsc);
};

// функция закрытия попапа при нажатии Escape
function closePopupIfPressEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  };
};

// функция отправки формы редактирования профиля
function handleProfileEditFormSubmit(event) {
  event.preventDefault(); // Эта строка отменяет стандартную отправку формы
  profileNameElement.textContent = nameInputElement.value;
  profileCaptionElement.textContent = captionInputElement.value;
  closePopup(popupProfileEditElement);
};

// функция создания новой карточки
function createNewCard(object) {
  // ищем шаблон
  const cardTemplate = document.querySelector('#card-template').content;
  // клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // заполняем клона значениями
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardCaptionElement = cardElement.querySelector('.card__caption');
  const cardButtonLikeElement = cardElement.querySelector('.card__button-like');
  const cardButtonDeleteElement = cardElement.querySelector('.card__button-delete');

  cardImageElement.alt = object.name;
  cardImageElement.src = object.src;
  cardCaptionElement.textContent = object.name;
  // вешаем слушатель клика по кнопке лайка
  cardButtonLikeElement.addEventListener('click', function () {
    cardButtonLikeElement.classList.toggle('card__button-like_clicked');
  });
  // вешаем слушатель клика по кнопке удаления карточки
  cardButtonDeleteElement.addEventListener('click', function () {
    cardElement.remove();
  });
  // вешаем слушатель клика по фотографии
  cardImageElement.addEventListener('click', function () {
    zoomedImageElement.src = object.src;
    zoomedImageElement.alt = object.name;
    zoomedImageCaptionElement.textContent = object.name;
    openPopup(popupZoomImageElement);
  });
  return cardElement;
};

// функция добавления новой карточки в разметку
function addNewCard(object, element) {
  const newCardElement = createNewCard(object);
  element.prepend(newCardElement);
};

// функция отправки формы добавления новой карточки
function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  const newCardObject = {};
  newCardObject.name = cardNameInputElement.value;
  newCardObject.src = cardLinkInputElement.value;
  addNewCard(newCardObject, cardsListElement);
  closePopup(popupAddNewCardElement);
  event.target.reset();
};

// обработчики событий
// обработчик события - открытие попапа редактирования профиля по кнопке ручки
popupEditButtonElement.addEventListener('click', function () {
  nameInputElement.value = profileNameElement.textContent;
  captionInputElement.value = profileCaptionElement.textContent;
  openPopup(popupProfileEditElement);
});

// обработчик события - отправка формы редактирования профиля
popupProfileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);

// обработчик события - открытие попапа добавления новой карточки по кнопке плюса
popupAddButtonElement.addEventListener('click', function () {
  openPopup(popupAddNewCardElement);
});

// обработчик события - отправка формы добавления новой карточки
popupAddNewCardFormElement.addEventListener('submit', handleAddNewCardFormSubmit);

// обходы массивов
// проходим по массиву с функцией добавления новой карточки в разметку
initialCards.forEach(function (object) {
  addNewCard(object, cardsListElement);
});

// добавляем каждому попапу слушатель события mousedown с условием сравнения наличия класса у кликнутого элемента
popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if (event.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    };
  });
});
