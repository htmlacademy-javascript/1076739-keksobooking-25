const ALERT_SHOW_TIME = 5000;

const getLowerNumber = (from, to) => Math.min(Math.abs(from), Math.abs(to));

const getUpperNumber = (from, to) => Math.max(Math.abs(from), Math.abs(to));

const getRandomNumber = (from, to) => {
  const lower = getLowerNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomLocation = (from, to, digit) => {
  const lower = getLowerNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.round((Math.random() * (upper - lower) + lower) * (10 ** digit)) / (10 ** digit);
};

const getNumberWithLeadZero = (num) => num < 10 ? `0${num}` : num;

const getRandomArrayElements = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getMyltipleArrayElements = (elements) => elements.slice(0, getRandomNumber(1, elements.length));

export const toggleForm = (isLoad, form, formElements, className) => {
  const classMethod = (isLoad) ? 'remove' : 'add';
  form.classList[classMethod](className);
  formElements.forEach((element) => {
    element.disabled = !isLoad;
  });
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomNumber, getRandomLocation, getNumberWithLeadZero, getRandomArrayElements, getMyltipleArrayElements };
