export default class FormValidator {
  constructor (configObject, form) {
    this._form = form; // значением будет строка '.popup__form'
    this._inputSelector = configObject.inputSelector; // значением будет строка '.popup__input'
    this._submitButtonSelector = configObject.submitButtonSelector; // значением будет строка '.popup__button-save'
    this._activeButtonClass = configObject.activeButtonClass; // значением будет строка 'popup__button-save_active'
    this._inactiveButtonClass = configObject.inactiveButtonClass; // значением переменной будет строка 'popup__button-save_inactive'
    this._inputErrorClass = configObject.inputErrorClass; // значением будет строка 'popup__input_error'
    this._errorClass = configObject.errorClass; // значением будет строка 'popup__error' //нигде не используется
    this._submitButtonElement = this._form.querySelector(this._submitButtonSelector); // значением будет строка 'popup__button-save'
    this._formInputsArray = Array.from(this._form.querySelectorAll(this._inputSelector)); // массив из всех инпутов формы
  };

  // функция показывающая ошибку инпута
  _showErrorClass (input) {
    const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
    currentInputErrorContainer.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  };

  // функция скрывающая ошибку инпута
  _hideErrorClass (input) {
    const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
    currentInputErrorContainer.textContent = '';
    input.classList.remove(this._inputErrorClass);
  };

  // функция проверки валидности инпута
  _checkInputValidity (input) {
    const checkInputValidityResult = input.checkValidity(); // checkValidity - метод проверки валидности инпута отдает true или false
    return checkInputValidityResult;
  };

  // функция переключения состояния инпута формы
  _switchInputState (input) {
    if (this._checkInputValidity(input)) {
      this._hideErrorClass(input);
    } else {
      this._showErrorClass(input);
    };
  };

  // функция включения кнопки отправки формы
  _enableButton () {
    this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    this._submitButtonElement.classList.add(this._activeButtonClass);
    this._submitButtonElement.removeAttribute('disabled');
  };

  // функция выключения кнопки отправки формы
  _disableButton () {
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
    this._submitButtonElement.classList.remove(this._activeButtonClass);
    this._submitButtonElement.setAttribute('disabled', true);
  };

  // функция проверки есть ли в форме хотя бы один не валидный инпут
  // метод массива some возвращает true если хотя бы для одного элемента проверка вернет true
  //                               false если для всех элементов проверка возвращает false
  // надо попробовать сделать через every
  _hasInvalidInput () {
    const hasInvalidInputResult = this._formInputsArray.some((input) => !input.checkValidity());
    return hasInvalidInputResult;
  };

  // функция переключения состояния кнопки отправки формы
  _switchButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  // функция добавления слушателей событий
  _setEventListeners () {
    this._form.addEventListener('reset', () => {
      this._disableButton();
    });
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._formInputsArray.forEach((input) => {
      input.addEventListener('input', () => {
        this._switchInputState(input);
        this._switchButtonState();
      });
    });
  };

  // функция включения валидации
  enableValidation () {
    this._setEventListeners();
  };

  // функция сброса ошибок при открытии попапа с формой
  resetErrorWhenOpenForm () {
    this._formInputsArray.forEach((input) => {
      this._hideErrorClass(input);
    });
    this._disableButton();
  };

};
