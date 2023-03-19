// открытие/закрытие попапа

// выбрать DOM элементы и сохранить их в переменные

const popupElement = document.querySelector ('.popup');
const popupOpenButtonElement = document.querySelector ('.profile__button-edit');
const popupCloseButtonElement = popupElement.querySelector ('.popup__button-close');
const popupSaveButtonElement = popupElement.querySelector ('.popup__button-save');

// функция переключения состояния попапа открыт/закрыт

function togglePopupVisibility () {
  popupElement.classList.toggle('popup_opened');
}

// обработчик события - открытие попапа по кнопке ручки

popupOpenButtonElement.addEventListener ('click', togglePopupVisibility);

// обработчик события - закрытие попапа по кнопке крестика

popupCloseButtonElement.addEventListener ('click', togglePopupVisibility);

//обработчик события - закрытие попапа по кнопке сохранения

popupSaveButtonElement.addEventListener ('click', togglePopupVisibility);

//=====================================================================================

//изменение текстовых полей в форме

// Находим форму в DOM

let formElement = popupElement.querySelector ('.popup__form');

// Находим поля формы в DOM

let nameInput = formElement.querySelector ('.popup__user-name');
let captionInput = formElement.querySelector ('.popup__user-caption');

// Обработчик «отправки» формы

function handleFormSubmit (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let caption = captionInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileNameElement = document.querySelector ('.profile__user-name');
  let profileCaptionElement = document.querySelector ('.profile__user-caption');
  // Вставьте новые значения с помощью textContent
  profileNameElement.textContent = name;
  profileCaptionElement.textContent = caption;
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener ('submit', handleFormSubmit);

// ====================================================================================







