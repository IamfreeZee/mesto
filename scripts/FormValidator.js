export default class FormValidator {
  constructor (configObject, form) {
    this._form = form; // значением будет строка '.popup__form'
    this._inputSelector = configObject.inputSelector; // значением будет строка '.popup__input'
    this._submitButtonSelector = configObject.submitButtonSelector; // значением будет строка '.popup__button-save'
    this._activeButtonClass = configObject.activeButtonClass; // значением будет строка 'popup__button-save_active'
    this._inactiveButtonClass = configObject.inactiveButtonClass; // значением переменной будет строка 'popup__button-save_inactive'
    this._inputErrorClass = configObject.inputErrorClass; // значением будет строка 'popup__input_error'
    this._errorClass = configObject.errorClass; // значением будет строка 'popup__error'
  };

  // функция добавляющая класс ошибки у инпута
  _addErrorClass (input) {
    input.classList.add(this._inputErrorClass);
  };

  // функция убирающая класс ошибки у инпута
  _removeErrorClass (input) {
    input.classList.remove(this._inputErrorClass);
  };

  // функция показа сообщения с ошибкой под невалидным инпутом
  _checkInputValidity (input) {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) { // checkValidity - метод проверки валидности инпута отдает true или false, if срабатывает если true, else если false
      currentInputErrorContainer.textContent = '';
      this._removeErrorClass(input);
    } else {
      currentInputErrorContainer.textContent = input.validationMessage;
      this._addErrorClass(input);
    };
  };

  // функция включения кнопки отправки формы
  _enableButton (button) {
    button.classList.remove(this._inactiveButtonClass);
    button.classList.add(this._activeButtonClass);
    button.removeAttribute('disabled');
  };

  // функция выключения кнопки отправки формы
  _disableButton (button) {
    button.classList.add(this._inactiveButtonClass);
    button.classList.remove(this._activeButtonClass);
    button.setAttribute('disabled', true);
  };

  // функция проверки есть ли в форме хотя бы один не валидный инпут
  // метод some возвращает true если хотя бы для одного элемента проверка вернет true
  //                       false если для всех элементов проверка возвращает false
  _hasInvalidInput (inputs) {
    const hasInvalidInputResult = inputs.some((input) => !input.checkValidity());
    const formButton = this._form.querySelector(this._submitButtonSelector);
    if (hasInvalidInputResult) {
      this._disableButton(formButton);
    } else {
      this._enableButton(formButton);
    };
  };

  // функция добавления на все инпуты в форме обработчика события input
  _setEventListener (form) {
    const formInputs = Array.from(form.querySelectorAll(this._inputSelector));
    const formButton = form.querySelector(this._submitButtonSelector);
    this._disableButton(formButton);
    form.addEventListener('reset', () => {
      this._disableButton(formButton);
    });
    formInputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._hasInvalidInput(formInputs);
      });
    });
  };

  // функция добавления обработчика события submit на каждую форму из массива форм и вызов функции добавления обработчика события на каждый инпут формы
  enableValidation (form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener(form);
  };

};
