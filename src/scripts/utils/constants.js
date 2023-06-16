import altayImage from '../../images/collection-altay.jpg';
import baykalImage from '../../images/collection-baykal.jpg';
import elbrusImage from '../../images/collection-elbrus.jpg';
import kareliyaImage from '../../images/collection-kareliya.jpg';
import nizhnyNovgorodImage from '../../images/collection-nizhny-novgorod.jpg';
import kamchatkaImage from '../../images/collection-kamchatka.jpg';


// массив объектов изначальных карточек
const initialCardsArray = [
  {
    0: 'Алтай',
    1: altayImage
  },
  {
    0: 'Байкал',
    1: baykalImage
  },
  {
    0: 'Эльбрус',
    1: elbrusImage
  },
  {
    0: 'Карелия',
    1: kareliyaImage
  },
  {
    0: 'Нижний Новгород',
    1: nizhnyNovgorodImage
  },
  {
    0: 'Камчатка',
    1: kamchatkaImage
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

// Объект с селекторами для класса UserInfo
const profileInfoSelectors = {
  userNameSelector: '.profile__user-name',
  userCaptionSelector: '.profile__user-caption'
};

// переменные форм
const popupProfileEditFormElement = document.forms['edit-profile'];
const popupAddNewCardFormElement = document.forms['add-new-card'];

// переменные кнопок открытия попапов
const popupEditButtonElement = document.querySelector('.profile__button-edit');
const popupAddButtonElement = document.querySelector('.profile__button-add');

// селекторы попапов
const popupProfileEditSelector = '.popup-profile-edit';
const popupAddNewCardSelector = '.popup-add-new-card';
const popupWithImageSelector = '.popup-zoom-image';

// селектор шаблона карточки
const cardTemplateSelector = '#card-template';

// Селектор для вставки карточек
const cardContainerSelector = '.cards__list';

export {
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
};
