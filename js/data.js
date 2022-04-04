import { getRandomNumber, getRandomLocation, getNumberWithLeadZero, getRandomArrayElements, getMyltipleArrayElements } from './util.js';

const COORDINATE_POINTS = {
  lat: 35.6817,
  lng: 139.7539
};

const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const PIN_RATIO = 0.5;

const TITLES = [
  '5-местная палатка',
  'Номер в отеле',
  'Каморка со швабрами',
  'Кровать в общей спальне',
  'Чулан под лестницей',
  'Дом на площади Гримо',
  'Маленькая комната , для маленького человека',
  'Хижина на окраине',
  'Дворец ',
  'Квартира с видом на зоопарк'
];

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
    name: 'Бунгало',
    minPrice: 3000
  }
};

const TIMES = [
  '12.00',
  '13.00',
  '14.00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'вид на парк , 5 минут до центра',
  'тихое место , рядом много ресторанов',
  'свежий воздух, нет шума',
  'удачное расположение, веселые соседи',
  'отличный вариант для недолгого путешествия',
  'уютное место и расположение, для семей с детьми'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const generateFakeData = (value, index) => {
  const lat = getRandomLocation(35.65, 35.70, 5);
  const lng = getRandomLocation(139.7, 139.8, 5);
  return {
    author: {
      avatar: `img/avatars/user${getNumberWithLeadZero(index + 1)}.png`
    },
    offer: {
      title: getRandomArrayElements(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomNumber(100, 15000),
      type: getRandomArrayElements(Object.keys(TYPES)),
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(1, 5),
      checkin: getRandomArrayElements(TIMES),
      checkout: getRandomArrayElements(TIMES),
      features: getMyltipleArrayElements(FEATURES),
      description: getRandomArrayElements(DESCRIPTIONS),
      photos: getMyltipleArrayElements(PHOTOS)
    },
    location: {
      lat,
      lng
    }
  };
};

const generateOdjectDataArray = () => Array.from({ length: 10 }, generateFakeData);


export { generateOdjectDataArray, COORDINATE_POINTS, PIN_SIZE, MAIN_PIN_SIZE, PIN_RATIO };
