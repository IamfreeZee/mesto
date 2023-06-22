// импорт файла стилей для сборки проекта вебпаком
import './index.css'

// импорты констант
import {
  validationConfigObject,
  profileInfoSelectors,
  popupProfileEditFormElement,
  popupAddNewCardFormElement,
  popupEditAvatarFormElement,
  popupProfileEditSelector,
  popupAddNewCardSelector,
  popupWithImageSelector,
  popupAvatarEditSelector,
  popupCardDeleteSelector,
  cardTemplateSelector,
  cardContainerSelector,
} from '../utils/constants.js';

// импорты классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupCardDelete from '../components/PopupCardDelete.js';
import Api from '../components/Api.js';

const defaultButtonText = 'Сохранить'

// функция создания карточки
function renderCard (dataObject) {
  const card = new Card(dataObject, cardTemplateSelector, popupWithImage.openPopup, popupCardDelete.openPopup, (cardId, btnLikeElem) => {
    if (btnLikeElem.classList.contains('card__button-like_clicked')) {
      api.deleteLike(cardId)
        .then((res) => {
          card.toggleLikeButton(res.likes)
        })
        .catch((err) => {
          console.error(`Что-то пошло не так: ${err}`)
        })
    } else {
      api.putLike(cardId)
        .then((res) => {
          card.toggleLikeButton(res.likes)
        })
        .catch((err) => {
          console.error(`Что-то пошло не так: ${err}`)
        })
    }
  })
  const cardElement = card.generateCard();
  return cardElement;
};

// создание экземпляра класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'be886bc9-e319-4975-941a-d3278ff6ff0a',
    'Content-Type': 'application/json'
  }
});

// создание экземпляра класса для формы редактирования профиля
const profileFormValidatorExampleObject = new FormValidator(validationConfigObject, popupProfileEditFormElement);
profileFormValidatorExampleObject.enableValidation();

// создание экземпляра класса для формы добавления новой карточки
const cardFormValidatorExampleObject = new FormValidator(validationConfigObject, popupAddNewCardFormElement);
cardFormValidatorExampleObject.enableValidation();

// создание экземпляра класса для формы изменения аватара
const avatarFormValidator = new FormValidator(validationConfigObject, popupEditAvatarFormElement);
avatarFormValidator.enableValidation();

// создание экземпляра класса профиля пользователя
const userInfo = new UserInfo(profileInfoSelectors);

// создание экземпляра класса попапа с увеличенным изображением
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

// создание экземпляра класса попапа удаления карточки
const popupCardDelete = new PopupCardDelete(popupCardDeleteSelector, (cardObj) => {
  api.deleteCard(cardObj._cardId)
    .then((res) => {
      cardObj.deleteCard()
      popupCardDelete.closePopup()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupCardDelete.submitButton.textContent = defaultButtonText;
    })
});
popupCardDelete.setEventListeners();

// создание экземпляра класса Section
const section = new Section((dataObj) => {
  section.addItemAppend(renderCard(dataObj))
}, cardContainerSelector);

// создание экземпляра класса попапа редактирования профиля
const popupProfileEdit = new PopupWithForm(popupProfileEditSelector, (dataObject) => {
  api.setUserInfo(dataObject)
    .then((resObj) => {
      userInfo.setUserInfo(resObj)
      popupProfileEdit.closePopup();
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupProfileEdit.submitButton.textContent = defaultButtonText;
    })
});
popupProfileEdit.setEventListeners();

// создание экземпляра класса попапа добавления новой карточки
const popupAddNewCard = new PopupWithForm(popupAddNewCardSelector, (dataObject) => {
  Promise.all([api.getUserInfo(), api.addNewCard(dataObject)])
    .then(([userDataObj, cardDataObj]) => {
      cardDataObj.userId = userDataObj._id
      section.addItemPrepend(renderCard(cardDataObj))
      popupAddNewCard.closePopup()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupAddNewCard.submitButton.textContent = defaultButtonText;
    })
});
popupAddNewCard.setEventListeners();

// создание экземпляра класса попапа изменения аватара
const popupAvatarEdit = new PopupWithForm(popupAvatarEditSelector, (dataObject) => {
  api.setUserAvatar(dataObject)
    .then((resObj) => {
      userInfo.setUserInfo(resObj)
      popupAvatarEdit.closePopup();
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupAvatarEdit.submitButton.textContent = defaultButtonText;
    })
});
popupAvatarEdit.setEventListeners();

// обработчик события - открытие попапа редактирования профиля по кнопке ручки
const popupEditButtonElement = document.querySelector('.profile__button-edit');

popupEditButtonElement.addEventListener ('click', () => {
  profileFormValidatorExampleObject.resetErrorWhenOpenForm();
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  popupProfileEdit.openPopup();
});

// обработчик события - открытие попапа добавления новой карточки по кнопке плюса
const popupAddButtonElement = document.querySelector('.profile__button-add');

popupAddButtonElement.addEventListener('click', () => {
  cardFormValidatorExampleObject.resetErrorWhenOpenForm();
  popupAddNewCard.openPopup();
});

// обработчик события - открытие попапа изменения аватара
const profileAvatarButtonElement = document.querySelector('.profile__avatar');

profileAvatarButtonElement.addEventListener('click', () => {
  avatarFormValidator.resetErrorWhenOpenForm();
  popupAvatarEdit.openPopup();
});

// запрос массива изначальных карточек
api.getData()
  .then(([userDataObj, cardsArray]) => {
    userInfo.setUserInfo(userDataObj)
    cardsArray.forEach((card) => {
      card.userId = userDataObj._id
    })
    section.renderItems(cardsArray)
  })
  .catch((err) => {
    console.error(`Что-то пошло не так: ${err}`)
  })
