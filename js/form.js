import { TYPES, COORDINATE_POINTS, roomCapacity, roomsDeclinations } from './data.js';
import { slider } from './slider.js';
import { chooseAddress } from './map.js';
import { showError } from './alert.js';
import { setData } from './api-fetch.js';

const typeFieldElement = document.querySelector('#type');
const fieldsetElements = document.querySelectorAll('.ad-form__element');
const MAX_PRICE = 100000;
const priceElement = document.querySelector('#price');
const formElement = document.querySelector('form.ad-form');
const roomsElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const addressElement = document.querySelector('#address');
const timeInElement = document.querySelector('#timein');
const timeInElementOptions = timeInElement.querySelectorAll('option');
const timeOutElement = document.querySelector('#timeout');
const timeOutElementOptions = timeOutElement.querySelectorAll('option');
const adFormSubmitElement = document.querySelector('.ad-form__submit');
const adFormResetElement = document.querySelector('.ad-form__reset');
const allowedKeys = [...'01234567890', 'Backspace', 'Delete'];

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__title--invalid',
  successClass: 'ad-form__title--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error'
});

const getCapacityErrorMessage = () => {
  const people = (roomsElement.value === '1') ? 'гостя' : 'гостей';
  const rooms = window.declineOfNumeral(roomsElement.value, roomsDeclinations);
  const guests = roomCapacity[roomsElement.value].join(' или ');
  return `${roomsElement.value} ${rooms} для ${guests} ${people}`;
};

const validateRooms = () => roomCapacity[roomsElement.value].includes(capacityElement.value);

pristine.addValidator(capacityElement, validateRooms, getCapacityErrorMessage);

roomsElement.addEventListener('change', () => {
  pristine.validate(capacityElement);
});

// синхронизация полей цена тип
priceElement.addEventListener('keydown', (e) => {
  if (!allowedKeys.includes(e.key)) {
    e.preventDefault();
    return false;
  }
});

const minPrice = () => TYPES[typeFieldElement.value].minPrice;

const setAttribute = () => {
  const priceValue = TYPES[typeFieldElement.value].minPrice;
  priceElement.min = priceValue;
  priceElement.setAttribute('placeholder', priceValue);
};

setAttribute();

const setPriceRange = () => {
  slider.updateOptions({
    range: {
      min: minPrice(),
      max: MAX_PRICE,
    },
    start: minPrice()
  });
};

setPriceRange();

typeFieldElement.addEventListener('change', () => {
  setAttribute();
  setPriceRange();
  pristine.validate(priceElement);
});

// синхронизация полей времени размещения
const syncField = (fieldOne, fieldTwoOptions) => {
  fieldOne.addEventListener('change', () => {
    fieldTwoOptions.forEach((option) => {
      if (fieldOne.value === option.value) {
        option.selected = true;
      }
    });
  });
};

syncField(timeInElement, timeOutElementOptions);
syncField(timeOutElement, timeInElementOptions);

//валидация цены взависимости от типа размещения
const getPriceErrorMessage = () => `Минимальная цена для типа размещения ${TYPES[typeFieldElement.value].name} составляет ${TYPES[typeFieldElement.value].minPrice} ₽/ ночь`;

const validatePriceField = () => priceElement.value >= TYPES[typeFieldElement.value].minPrice;
pristine.addValidator(priceElement, validatePriceField, getPriceErrorMessage);


slider.on('change.one', () => {
  priceElement.value = slider.get();
});

priceElement.addEventListener('change', () => {
  slider.set(priceElement.value);
});

addressElement.value = `${COORDINATE_POINTS.lat}, ${COORDINATE_POINTS.lng}`;

chooseAddress(addressElement);

const clearForm = () => {
  formElement.reset();
  fieldsetElements.forEach((element) => {
    if (element.classList.contains('ad-form__title--invalid')) {
      element.classList.remove('ad-form__title--invalid');
      const error = element.querySelector('.pristine-error');
      error.remove();
    }
  });
};

const resetForm = (cb) => {
  adFormResetElement.addEventListener('click', () => {
    cb();
  });
};

const clearSubmit = () => {
  adFormSubmitElement.removeAttribute('disabled', 'disabled');
  adFormSubmitElement.textContent = 'Отправить';
};

const setFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      adFormSubmitElement.setAttribute('disabled', 'disabled');
      adFormSubmitElement.textContent = 'Сохраняю....';
      const formData = new FormData(evt.target);

      setData('https://25.javascript.pages.academy/keksobooking',
        formData,
        () => onSuccess(), () => {
          showError();
          clearSubmit();
        });
    }
  });
};

export { formElement, priceElement, fieldsetElements, clearForm, resetForm, setFormSubmit, clearSubmit };
