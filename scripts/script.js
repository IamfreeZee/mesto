// список переменных
// переменная попапа редактирования профиля
const popupProfileEditElement = document.querySelector ('.popup-profile-edit');
const popupAddNewCardElement = document.querySelector('.popup-add-new-card')

// переменные кнопок
const popupEditButtonElement = document.querySelector ('.profile__button-edit');
const popupAddButtonElement = document.querySelector ('.profile__button-add');
const popupProfileEditCloseButtonElement = popupProfileEditElement.querySelector ('.popup__button-close');
const popupAddNewCardCloseButtonElement = popupAddNewCardElement.querySelector('.popup__button-close');

// переменные инпутов в профиле
const profileNameElement = document.querySelector ('.profile__user-name');
const profileCaptionElement = document.querySelector ('.profile__user-caption');

// переменные форм
const popupProfileEditFormElement = popupProfileEditElement.querySelector ('#edit-profile');
const popupAddNewCardFormElement = popupAddNewCardElement.querySelector ('#add-new-card');

// переменные полей инпутов в форме попапа редактирования профиля
const nameInputElement = popupProfileEditFormElement.querySelector ('.popup__input_user_name');
const captionInputElement = popupProfileEditFormElement.querySelector ('.popup__input_user_caption');

// переменные полей инпутов в форме добавления новой карточки
const cardNameInputElement = popupAddNewCardFormElement.querySelector ('.popup__input_card_name');
const cardLinkInputElement = popupAddNewCardFormElement.querySelector ('.popup__input_card_link');

// массив из объектов-карточек с фото
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
function openPopup (element) {
  element.classList.add('popup_opened');
}

// функция закрытия попапа
function closePopup (element) {
  element.classList.remove('popup_opened');
}

// функция отправки формы редактирования профиля
function handleProfileEditFormSubmit (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileNameElement.textContent = nameInputElement.value;
  profileCaptionElement.textContent = captionInputElement.value;
  closePopup (popupProfileEditElement);
}

// функция отправки формы добавления новой карточки
function handleAddNewCardFormSubmit (event) {
  event.preventDefault();
  const newCardObject = {};
  newCardObject.name = cardNameInputElement.value;
  newCardObject.src = cardLinkInputElement.value;
  createNewCard (newCardObject);
  closePopup(popupAddNewCardElement);
  cardNameInputElement.value = '';
  cardLinkInputElement.value = '';
};

// обработчики событий
// обработчик события - открытие попапа редактирования профиля по кнопке ручки
popupEditButtonElement.addEventListener ('click', function () {
  nameInputElement.value = profileNameElement.textContent;
  captionInputElement.value = profileCaptionElement.textContent;
  openPopup(popupProfileEditElement);
});

// обработчик события - закрытие попапа редактирования профиля по кнопке крестика
popupProfileEditCloseButtonElement.addEventListener ('click', function () {
  closePopup(popupProfileEditElement);
});

// обработчик события - закрытие попапа редактирования профиля по клику за областью попапа
popupProfileEditElement.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup (popupProfileEditElement);
  }
});

// обработчик события - отправка формы редактирования профиля
popupProfileEditFormElement.addEventListener ('submit', handleProfileEditFormSubmit);

// открытие попапа добавления новой карточки по кнопке плюса
popupAddButtonElement.addEventListener('click', function () {
  openPopup(popupAddNewCardElement);
});

// закрытие попапа добавления новой карточки по кнопке крестика
popupAddNewCardCloseButtonElement.addEventListener('click', function () {
  closePopup(popupAddNewCardElement);
})

// закрытие попапа добавления новой карточки по клику за областью попапа
popupAddNewCardElement.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup (popupAddNewCardElement);
  }
});

// отправка формы добавления новой карточки
popupAddNewCardFormElement.addEventListener('submit', handleAddNewCardFormSubmit);

//функция создания и добавления новой карточки на страницу
function createNewCard (data) {
  //ищем шаблон
  const cardTemplate = document.querySelector('#card-template').content;
  //клонируем содержимое шаблона
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  //заполняем клона значениями
  cardElement.querySelector('.card__image').alt = data.name;
  cardElement.querySelector('.card__image').src = data.src;
  cardElement.querySelector('.card__caption').textContent = data.name;
  //вешаем слушатель клика по кнопке лайка
  cardElement.querySelector('.card__button-like').addEventListener('click', function () {
    cardElement.querySelector('.card__button-like').classList.toggle('card__button-like_clicked');
  });
  //вешаем слушатель клика по кнопке удаления карточки
  cardElement.querySelector('.card__button-delete').addEventListener('click', function () {
    cardElement.querySelector('.card__button-delete').closest('.card').remove();
  });
  // //вставляем наполненного клона в разметку
  document.querySelector('.cards__list').append(cardElement);
}

//проходим по массиву функцией создания и добавления карточки
initialCards.forEach (function (item) {
  createNewCard(item);
});

