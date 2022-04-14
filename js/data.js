const COORDINATE_POINTS = {
  lat: 35.6817,
  lng: 139.7539
};

const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const PIN_RATIO = 0.5;

export const TYPES = {
  palace: {
    name: 'Дворец',
    minPrice: 10000
  },
  flat: {
    name: 'Квартира',
    minPrice: 1000
  },
  house: {
    name: 'Дом',
    minPrice: 5000
  },
  bungalow: {
    name: 'Бунгало',
    minPrice: 0
  },
  hotel: {
    name: 'Отель',
    minPrice: 3000
  }
};

const roomCapacity = {
  '100': ['0'],
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3']
};

const roomsDeclinations = ['комната', 'комнаты', 'комнат'];

export { COORDINATE_POINTS, PIN_SIZE, MAIN_PIN_SIZE, PIN_RATIO, roomCapacity, roomsDeclinations };
