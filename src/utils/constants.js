// объект для конструктора класса валидатора форм
const validationConfigObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  activeButtonClass: 'popup__button-save_active',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};

// Объект с селекторами для класса UserInfo
const profileInfoSelectors = {
  userNameSelector: '.profile__user-name',
  userCaptionSelector: '.profile__user-caption',
  userAvatarSelector: '.profile__avatar'
};

// переменные форм
const popupProfileEditFormElement = document.forms['edit-profile'];
const popupAddNewCardFormElement = document.forms['add-new-card'];
const popupEditAvatarFormElement = document.forms['editAvatar'];

// селекторы попапов
const popupProfileEditSelector = '.popup-profile-edit';
const popupAddNewCardSelector = '.popup-add-new-card';
const popupWithImageSelector = '.popup-zoom-image';
const popupAvatarEditSelector = '.popup-avatar-edit';
const popupCardDeleteSelector = '.popup-card-delete';

// селектор шаблона карточки
const cardTemplateSelector = '#card-template';

// Селектор контейнера для карточек
const cardContainerSelector = '.cards__list';

export {
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
};
