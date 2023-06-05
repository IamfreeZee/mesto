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

// функция добавляющая класс ошибки у инпута
function addErrorClass (input, { inputErrorClass }) {
  input.classList.add(inputErrorClass);
};

// функция убирающая класс ошибки у инпута
function removeErrorClass (input, { inputErrorClass }) {
  input.classList.remove(inputErrorClass);
};

// функция показа сообщения с ошибкой под невалидным инпутом
function checkInputValidity (input, {...rest}) {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) { // метод проверки валидности инпута отдает true или false, if срабатывает если true, else если false
    currentInputErrorContainer.textContent = '';
    removeErrorClass(input, rest);
  } else {
    currentInputErrorContainer.textContent = input.validationMessage;
    addErrorClass(input, rest);
  };
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

// функция добавления на все инпуты в форме обработчика события input и логики включения/выключения кнопки отправки формы
function setEventListener (form, { inputSelector, submitButtonSelector, ...rest }) {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  form.addEventListener('reset', () => {
    disableButton(formButton, rest);
  });
  formInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      };
    });
  });
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

// включение валидации
enableValidation(validationConfigObject);
