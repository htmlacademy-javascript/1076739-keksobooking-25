function getLowerNumber(from, to) {
  return Math.min(Math.abs(from), Math.abs(to));
}

function getUpperNumber(from, to) {
  return Math.max(Math.abs(from), Math.abs(to));
}

function getRandomNumber(from, to) {
  const lower = getLowerNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function getRandomLocation(from, to, digit) {
  const lower = getLowerNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.round((Math.random() * (upper - lower) + lower) * (10 ** digit)) / (10 ** digit);
}

const URLNUMBERS = [];
for (let i = 0; i < 10; i++) {
  if ((i + 1) >= 10) {
    URLNUMBERS[i] = `${1 + i}` ;
  } else {
    URLNUMBERS[i] = `0${1 + i}`;
  }
}

function getRandomUrl(numbers) {
  const randomUrlindex = getRandomNumber(0, numbers.length - 1);
  const randomUrl = numbers[randomUrlindex];
  numbers.splice(randomUrlindex, 1);
  return randomUrl;
}

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

function getRandomArrayElements(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function getMyltipleArrayElements(elements) {
  return elements.slice(0, getRandomNumber(1, elements.length));
}

function generateFakeData() {
  return {
    autor: {
      avatar: `img/avatars/user${getRandomUrl(URLNUMBERS)}.png`
    },
    offer: {
      title: getRandomArrayElements(TITLES),
      adress: `${getRandomLocation(35.65, 35.70, 5)},${getRandomLocation(139.7, 139.8, 5)}`,
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
      lat: getRandomLocation(35.65, 35.70, 5),
      lng: getRandomLocation(139.7, 139.8, 5)
    }
  };
}

const odjectDataArray = Array.from({length: 10},generateFakeData);
odjectDataArray;
