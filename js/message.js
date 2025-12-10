const messageTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const showMessage = (template, buttonClass) => {
  const messageElement = template.cloneNode(true);
  const messageButton = messageElement.querySelector(buttonClass);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onMessageClick = (evt) => {
    if (!evt.target.closest(`.${template.classList[0]}__inner`)) {
      closeMessage();
    }
  };

  messageButton.addEventListener('click', closeMessage);
  messageElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.appendChild(messageElement);
};

const showErrorMessage = (text = 'Не удалось загрузить данные. Попробуйте обновить страницу') => {
  const template = messageTemplate.cloneNode(true);
  template.querySelector('.error__title').textContent = text;
  showMessage(template, '.error__button');
};

const showSuccessMessage = () => {
  const template = successTemplate.cloneNode(true);
  showMessage(template, '.success__button');
};

export { showErrorMessage, showSuccessMessage };
