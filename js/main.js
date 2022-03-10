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

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
  'hotel'
];

const TIMES = [
  '12.00',
  '13.00',
  '14.00'
];

const FEATURES = [
  'wi-fi',
  'dishwaher',
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

const getRandomArrayElements = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getMyltipleArrayElements = (elements) =>  elements.slice(0, getRandomNumber(1, elements.length));

const generateFakeData = (value, index) => {
  const lat = getRandomLocation(35.65, 35.70, 5);
  const lng = getRandomLocation(139.7, 139.8, 5);
  return {
    autor: {
      avatar: `img/avatars/user${getNumberWithLeadZero(index + 1)}.png`
    },
    offer: {
      title: getRandomArrayElements(TITLES),
      adress: `${lat}, ${lng}`,
      price: getRandomNumber(100, 15000),
      type: getRandomArrayElements(TYPES),
      rooms: getRandomNumber(1, 5),
      checkin: getRandomArrayElements(TIMES),
      checkout: getRandomArrayElements(TIMES),
      features: getMyltipleArrayElements(FEATURES),
      description: getRandomArrayElements(DESCRIPTIONS),
      photos: getMyltipleArrayElements(PHOTOS)
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const odjectDataArray = Array.from({length: 10}, generateFakeData);

export {odjectDataArray};
