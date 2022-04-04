import { TYPES, COORDINATE_POINTS } from './data.js';
import { sliderElement } from './slider.js';
import { onMarkerMoveed } from './map.js';

const typeFieldElement = document.querySelector('#type');
const fieldsetElements = document.querySelectorAll('.ad-form__element');
const mapFiltersElement = document.querySelectorAll('.map__filter');
const mapFormFiltersElement = document.querySelector('.map__filters');
const MAX_PRICE = 100000;
const priceElement = document.querySelector('#price');
const formElement = document.querySelector('form.ad-form');
const roomsElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const addressElement = document.querySelector('#address');


const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__title--invalid',
  successClass: 'ad-form__title--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error'
}
);

const roomCapacity = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3']
};

const roomsDeclinations = ['комната', 'комнаты', 'комнат'];

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

const minPrice = () => TYPES[typeFieldElement.value].minPrice;

const setAttribute = () => {
  const priceValue = TYPES[typeFieldElement.value].minPrice;
  priceElement.min = priceValue;
  priceElement.setAttribute('placeholder', priceValue);
};

setAttribute();

const setPriceRange = () => {
  sliderElement.noUiSlider.updateOptions({
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


//валидация цены взависимости от типа размещения

const getPriceErrorMessage = () => `Минимальная цена для типа размещения ${TYPES[typeFieldElement.value].name} составляет ${TYPES[typeFieldElement.value].minPrice} ₽/ ночь`;

const validatePriceField = () =>  priceElement.value >= TYPES[typeFieldElement.value].minPrice;
pristine.addValidator(priceElement, validatePriceField, getPriceErrorMessage);


sliderElement.noUiSlider.on('change.one', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});


formElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

addressElement.value = `${COORDINATE_POINTS.lat}, ${COORDINATE_POINTS.lng}`;

onMarkerMoveed(addressElement);

export { formElement, priceElement, fieldsetElements, mapFiltersElement, mapFormFiltersElement };
