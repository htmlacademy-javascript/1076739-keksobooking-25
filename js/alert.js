const errorElement = document.querySelector('#error').content.querySelector('.error');
const successElement = document.querySelector('#success').content.querySelector('.success');
const errorButtonElement = errorElement.querySelector('.error__button');
const body = document.querySelector('body');

const onClickCloseMessage = (message) => {
  document.addEventListener('click', () => {
    message.remove();
  });
};

const onButtonClick = (button, element) => {
  button.addEventListener('click', () => {
    element.remove();
  });
};

const onEscCloseMessage = (message) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
  });
};

const showMessage = (template) => {
  const message = template.cloneNode(true);
  body.appendChild(message);
  onClickCloseMessage(message);
  onEscCloseMessage(message);
  onButtonClick(errorButtonElement, message);
};

const showError = () => showMessage(errorElement);
const showSuccess = () => showMessage(successElement);

export { showError, showSuccess };
