const form = document.querySelector('form.ad-form');
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const pristine = new Pristine(form
  , {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__title--invalid',
    successClass: 'ad-form__title--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'p',
    errorTextClass: 'ad-form__error'
  }
);

function priceValidator(value) {
  return value >= 5000 && value <= 100000;
}

pristine.addValidator(price, priceValidator, 'Цена за ночь не может быть больше 100 000 или меньше 5000');

const roomCapacity = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3']
};

function capacityMessageError() {
  const people = (rooms.value === '1') ? 'гостя' : 'гостей';
  return `${rooms.value} комнат(а) для ${roomCapacity[rooms.value].join(' или ')} ${people}`;
}

function roomsValidator() {
  return roomCapacity[rooms.value].includes(capacity.value);
}


pristine.addValidator(rooms, roomsValidator, capacityMessageError);
pristine.addValidator(capacity, roomsValidator, capacityMessageError);

capacity.addEventListener('change', () => {
  pristine.validate();
});

rooms.addEventListener('change', () => {
  pristine.validate();
});


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
