// объект с ключами для использования в функциях при валидации форм
const validationConfigObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  activeButtonClass: 'popup__button-save_active',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};

// функция добавления обработчика события submit на каждую форму из массива форм и вызов функции добавления обработчика события на каждый инпут формы
function enableValidation ({ formSelector, ...rest }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(form, rest);
  });
};

// функция добавления на все инпуты в форме обработчика события input и логики включения/выключения кнопки отправки формы
function setEventListener (form, { inputSelector, submitButtonSelector, ...rest }) {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      };
    });
  });
};

// функция показа сообщения с ошибкой под невалидным инпутом
function checkInputValidity (input, {...rest}) {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) { // метод проверки валидности инпута отдает true или false, if срабатывает если true, else если false
    currentInputErrorContainer.textContent = '';
    hideInvalidInput(input, rest);
  } else {
    currentInputErrorContainer.textContent = input.validationMessage;
    showInvalidInput(input, rest);
  };
};

// функция выделения невалидного инпута
function showInvalidInput (input, { inputErrorClass }) {
  input.classList.add(inputErrorClass);
};

// функция снятия выделения невалидного инпута
function hideInvalidInput (input, { inputErrorClass }) {
  input.classList.remove(inputErrorClass);
};

// функция проверки есть ли в форме хотя бы один не валидный инпут
function hasInvalidInput (formInputs) {
  return formInputs.some((input) => !input.checkValidity());
};

// функция включения кнопки отправки формы
function enableButton (button, { activeButtonClass, inactiveButtonClass }) {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.removeAttribute('disabled');
};

// функция выключения кнопки отправки формы
function disableButton (button, { activeButtonClass, inactiveButtonClass }) {
  button.classList.add(inactiveButtonClass);
  button.classList.remove(activeButtonClass);
  button.setAttribute('disabled', true);
};

// включение валидации
enableValidation(validationConfigObject);
