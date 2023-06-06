import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// список переменных
// Переменная селектора шаблона карточки используемая в конструкторе класса карточки
const cardTemplateSelector = '#card-template';

// все попапы со всей страницы
const popupsArray = Array.from(document.querySelectorAll('.popup'));

// переменные попапов по отдельности
const popupProfileEditElement = document.querySelector('.popup-profile-edit');
const popupAddNewCardElement = document.querySelector('.popup-add-new-card');
const popupZoomImageElement = document.querySelector('.popup-zoom-image');

// переменные внутри попапа с увеличенным изображением
const zoomedImageElement = popupZoomImageElement.querySelector('.popup-zoom-image__image');
const zoomedImageCaptionElement = popupZoomImageElement.querySelector('.popup-zoom-image__image-caption');

// переменные кнопок открытия попапов
const popupEditButtonElement = document.querySelector('.profile__button-edit');
const popupAddButtonElement = document.querySelector('.profile__button-add');

// переменные текстовых полей в профиле
const profileNameElement = document.querySelector('.profile__user-name');
const profileCaptionElement = document.querySelector('.profile__user-caption');

// переменные форм
const popupProfileEditFormElement = document.forms['edit-profile'];
const popupAddNewCardFormElement = document.forms['add-new-card'];

// переменные полей инпутов в форме редактирования профиля
const nameInputElement = popupProfileEditFormElement.querySelector('.popup__input_user_name');
const captionInputElement = popupProfileEditFormElement.querySelector('.popup__input_user_caption');

// переменные полей инпутов в форме добавления новой карточки
const cardNameInputElement = popupAddNewCardFormElement.querySelector('.popup__input_card_name');
const cardLinkInputElement = popupAddNewCardFormElement.querySelector('.popup__input_card_link');

// Переменная для вставки новой карточки
const cardsListElement = document.querySelector('.cards__list');

// массив объектов изначальных карточек
const initialCardsArray = [
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

// объект для конструктора класса валидатора форм
const validationConfigObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  activeButtonClass: 'popup__button-save_active',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};

// валидация форм
// создание экземпляра класса для формы редактирования профиля
const profileFormValidatorExampleObject = new FormValidator(validationConfigObject, popupProfileEditFormElement);
// запускаем валидацию формы редактирования профиля
profileFormValidatorExampleObject.enableValidation();

// создание экземпляра класса для формы добавления новой карточки
const cardFormValidatorExampleObject = new FormValidator(validationConfigObject, popupAddNewCardFormElement);
// запускаем валидацию формы добавления новой карточки
cardFormValidatorExampleObject.enableValidation();

// список функций
// функция открытия попапа
function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupIfPressEsc);
};

// функция открытия попапа с увеличенным изображением
function zoomPopup (cardDataObject) {
  zoomedImageElement.src = cardDataObject.src;
  zoomedImageElement.alt = cardDataObject.name;
  zoomedImageCaptionElement.textContent = cardDataObject.name;
  openPopup(popupZoomImageElement);
};

// функция закрытия попапа
function closePopup (element) {
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
function handleProfileEditFormSubmit (event) {
  event.preventDefault(); // Эта строка отменяет стандартную отправку формы
  profileNameElement.textContent = nameInputElement.value;
  profileCaptionElement.textContent = captionInputElement.value;
  closePopup(popupProfileEditElement);
  event.target.reset();
};

// функция отправки формы добавления новой карточки
function handleAddNewCardFormSubmit (event) {
  event.preventDefault();
  const newCardDataObject = {};
  newCardDataObject.name = cardNameInputElement.value;
  newCardDataObject.src = cardLinkInputElement.value;
  addNewCard(cardsListElement, newCardDataObject, cardTemplateSelector, zoomPopup);
  closePopup(popupAddNewCardElement);
  event.target.reset();
};

// функция создания карточки
function createCard (dataObject, templateSelector, zoomFunction) {
  // создание экземпляра класса карточки
  const cardExample = new Card(dataObject, templateSelector, zoomFunction);
  // вызов метода генерации карточки
  const cardElement = cardExample.generateCard();
  return cardElement;
};

// функция вставки карточки в разметку
function addNewCard (listElement, dataObject, templateSelector, zoomFunction) {
  listElement.prepend(createCard(dataObject, templateSelector, zoomFunction));
};

// обработчики событий
// обработчик события - открытие попапа редактирования профиля по кнопке ручки
popupEditButtonElement.addEventListener ('click', function () {
  popupProfileEditFormElement.reset();
  profileFormValidatorExampleObject.resetErrorWhenOpenForm();
  nameInputElement.value = profileNameElement.textContent;
  captionInputElement.value = profileCaptionElement.textContent;
  openPopup(popupProfileEditElement);
});

// обработчик события - открытие попапа добавления новой карточки по кнопке плюса
popupAddButtonElement.addEventListener('click', function () {
  popupAddNewCardFormElement.reset();
  cardFormValidatorExampleObject.resetErrorWhenOpenForm();
  openPopup(popupAddNewCardElement);
});

// обработчик события - отправка формы редактирования профиля
popupProfileEditFormElement.addEventListener('submit', handleProfileEditFormSubmit);

// обработчик события - отправка формы добавления новой карточки
popupAddNewCardFormElement.addEventListener('submit', handleAddNewCardFormSubmit);

// проходим по массиву изначальных карточек функцией добавления новой карточки в разметку
initialCardsArray.forEach((arrayItem) => {
  addNewCard(cardsListElement, arrayItem, cardTemplateSelector, zoomPopup);
});

// добавляем каждому попапу слушатель события mousedown с условием сравнения наличия класса у кликнутого элемента
popupsArray.forEach((popup) => {
  popup.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if (event.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    };
  });
});
