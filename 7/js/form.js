const priceElement = document.querySelector('#price');

const formElement = document.querySelector('form.ad-form');
const roomsElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

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

formElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const typeMinPrices = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const typeElement = document.querySelector('#type');

typeElement.addEventListener('change', (evt) => {
  const priceValue = typeMinPrices[evt.target.value];
  priceElement.setAttribute('placeholder', priceValue);
});

export { formElement, typeElement, typeMinPrices, priceElement };
