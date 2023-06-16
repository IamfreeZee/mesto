import altayImage from '../../images/collection-altay.jpg';
import baykalImage from '../../images/collection-baykal.jpg';
import elbrusImage from '../../images/collection-elbrus.jpg';
import kareliyaImage from '../../images/collection-kareliya.jpg';
import nizhnyNovgorodImage from '../../images/collection-nizhny-novgorod.jpg';
import kamchatkaImage from '../../images/collection-kamchatka.jpg';


// массив объектов изначальных карточек
const initialCardsArray = [
  {
    cardName: 'Алтай',
    cardLink: altayImage
  },
  {
    cardName: 'Байкал',
    cardLink: baykalImage
  },
  {
    cardName: 'Эльбрус',
    cardLink: elbrusImage
  },
  {
    cardName: 'Карелия',
    cardLink: kareliyaImage
  },
  {
    cardName: 'Нижний Новгород',
    cardLink: nizhnyNovgorodImage
  },
  {
    cardName: 'Камчатка',
    cardLink: kamchatkaImage
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
  popupProfileEditSelector,
  popupAddNewCardSelector,
  popupWithImageSelector,
  cardTemplateSelector,
  cardContainerSelector
};
