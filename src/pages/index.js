import './index.css'

// импорты констант
import {
  initialCardsArray,
  validationConfigObject,
  profileInfoSelectors,
  popupProfileEditFormElement,
  popupAddNewCardFormElement,
  popupEditButtonElement,
  popupAddButtonElement,
  popupProfileEditSelector,
  popupAddNewCardSelector,
  popupWithImageSelector,
  cardTemplateSelector,
  cardContainerSelector
} from '../scripts/utils/constants.js';

// импорты классов
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

// создание экземпляра класса для формы редактирования профиля
const profileFormValidatorExampleObject = new FormValidator(validationConfigObject, popupProfileEditFormElement);
profileFormValidatorExampleObject.enableValidation();

// создание экземпляра класса для формы добавления новой карточки
const cardFormValidatorExampleObject = new FormValidator(validationConfigObject, popupAddNewCardFormElement);
cardFormValidatorExampleObject.enableValidation();

// создание экземпляра класса попапа с увеличенным изображением
const popupWithImage = new PopupWithImage(popupWithImageSelector)
popupWithImage.setEventListeners()

// создание экземпляра класса Section
const section = new Section({ itemsArray: initialCardsArray, rendererFunction: renderCard }, cardContainerSelector)
section.renderItems();

// создание экземпляра класса профиля пользователя
const userInfo = new UserInfo(profileInfoSelectors)
// console.log(userInfo)

// создание экземпляра класса попапа редактирования профиля
const popupProfileEdit = new PopupWithForm(popupProfileEditSelector, handleProfileEditFormSubmit);
popupProfileEdit.setEventListeners();

// создание экземпляра класса попапа добавления новой карточки
const popupAddNewCard = new PopupWithForm(popupAddNewCardSelector, handleAddNewCardFormSubmit);
popupAddNewCard.setEventListeners();

// функция создания карточки
function renderCard (dataObject) {
  const cardExample = new Card(dataObject, cardTemplateSelector, popupWithImage.openPopup);
  const cardElement = cardExample.generateCard();
  section.addItem(cardElement);
};

// функция отправки формы редактирования профиля
function handleProfileEditFormSubmit (event) {
  event.preventDefault();
  userInfo.setUserInfo(popupProfileEdit.getInputValues());
  popupProfileEdit.closePopup();
  event.target.reset();
};

// функция отправки формы добавления новой карточки
function handleAddNewCardFormSubmit (event) {
  event.preventDefault();
  renderCard(popupAddNewCard.getInputValues());
  popupAddNewCard.closePopup();
  event.target.reset();
};

// обработчик события - открытие попапа редактирования профиля по кнопке ручки
popupEditButtonElement.addEventListener ('click', () => {
  profileFormValidatorExampleObject.resetErrorWhenOpenForm();
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  popupProfileEdit.openPopup();
});

// обработчик события - открытие попапа добавления новой карточки по кнопке плюса
popupAddButtonElement.addEventListener('click', () => {
  cardFormValidatorExampleObject.resetErrorWhenOpenForm();
  popupAddNewCard.openPopup();
});
