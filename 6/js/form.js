const formElement = document.querySelector('form.ad-form');
const roomsElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

const pristine = new Pristine(formElement , {
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

const roomsDeclinations = ['комната', 'комнаты','комнат'];

function getCapacityErrorMessage() {
  const people = (roomsElement.value === '1') ? 'гостя' : 'гостей';
  return `${roomsElement.value} ${window.declineOfNumeral(roomsElement.value,roomsDeclinations)} для ${roomCapacity[roomsElement.value].join(' или ')} ${people}`;
}

const validateRooms = ()  => roomCapacity[roomsElement.value].includes(capacityElement.value);

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
