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

// обработчик события - закрытие попапа редактирования профиля по клику за областью попапа
popupElement.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup ();
  }
});

// обработчик события - отправка формы
formElement.addEventListener ('submit', handleFormSubmit);
