// логика попапа
// список переменных/const
// переменные кнопок
const popupElement = document.querySelector ('.popup');
const popupOpenButtonElement = document.querySelector ('.profile__button-edit');
const popupCloseButtonElement = popupElement.querySelector ('.popup__button-close');
const popupSaveButtonElement = popupElement.querySelector ('.popup__button-save');

// переменные инпутов в профиле
const profileNameElement = document.querySelector ('.profile__user-name');
const profileCaptionElement = document.querySelector ('.profile__user-caption');

// переменные инпутов в форме попапа
const formElement = popupElement.querySelector ('.popup__form');
const nameInputElement = formElement.querySelector ('.popup__input_user_name');
const captionInputElement = formElement.querySelector ('.popup__input_user_caption');

// список функций/function
// функция открытия попапа
function openPopup () {
  popupElement.classList.add('popup_opened');
  nameInputElement.value = profileNameElement.textContent;
  captionInputElement.value = profileCaptionElement.textContent;
}

// функция закрытия попапа
function closePopup () {
  popupElement.classList.remove('popup_opened');
}

// функция отправки формы
function handleFormSubmit (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = nameInputElement.value;
  profileCaptionElement.textContent = captionInputElement.value;
  closePopup ();
}

// обработчики/слушатели событий/eventListener
// обработчик события - открытие попапа по кнопке ручки
popupOpenButtonElement.addEventListener ('click', openPopup);

// обработчик события - закрытие попапа по кнопке крестика
popupCloseButtonElement.addEventListener ('click', closePopup);

// обработчик события - закрытие попапа по клику за областью попапа
popupElement.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup ();
  }
});

// обработчик события - отправка формы
formElement.addEventListener ('submit', handleFormSubmit);

//////////////PR5///////////////
const log = console.log;
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

//функция создания и добавления новой карточки на страницу
function createNewCard (data) {
  //ищем шаблон
  const cardTemplate = document.getElementById('card-template').content;
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
  //вставляем наполненного клона в разметку
  document.querySelector('.cards__list').append(cardElement);
}

//проходим по массиву функцией создания и добавления карточки
initialCards.forEach (function (item) {
  createNewCard(item);
});
