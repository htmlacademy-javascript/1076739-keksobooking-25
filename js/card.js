import { odjectDataArray } from './data.js';

const cardsDataArray = odjectDataArray();
const cardTemplate = document.querySelector('#card').content.querySelector('article');
const mapCanvas = document.querySelector('#map-canvas');
const cardListFragment = document.createDocumentFragment();

const popupTypeCompare = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return 'Хижина лесника';
  }
};

const featuresCompare = (userArray, patternArray) => {
  patternArray.forEach((patternElement) => {

    const isFeatures = userArray.some((element) =>
      patternElement.classList.contains(`popup__feature--${element}`)
    );
    if (!isFeatures) {
      patternElement.remove();
    }
  });
};

const photosCompare = (photos) => {
  const photoListFragment = document.createDocumentFragment();
  photos.forEach((photosElement) => {
    const photo = document.createElement('img');
    photo.width = 45;
    photo.height = 40;
    photo.src = photosElement;
    photo.alt = 'Фотография жилья';
    photo.classList.add('popup__photo');
    photoListFragment.appendChild(photo);

  });
  return photoListFragment;
};

cardsDataArray.forEach((cards) => {
  const newCard = cardTemplate.cloneNode(true);
  if (cards.offer.title) {
    newCard.querySelector('.popup__title').textContent = cards.offer.title;
  } else {
    newCard.querySelector('.popup__title').style.display = 'none';
  }
  if (cards.offer.address) {
    newCard.querySelector('.popup__text--address').textContent = cards.offer.address;
  } else {
    newCard.querySelector('.popup__text--address').style.display = 'none';
  }
  if (cards.offer.price) {
    newCard.querySelector('.popup__text--price').textContent = `${cards.offer.price}  ₽/ночь`;
  } else {
    newCard.querySelector('.popup__text--price').textContent = 'Цена по запросу';
  }
  if (cards.offer.type) {
    newCard.querySelector('.popup__type').textContent = popupTypeCompare(cards.offer.type);
  } else {
    newCard.querySelector('.popup__type').style.display = 'none';
  }
  if (cards.offer.rooms && cards.offer.guests) {
    newCard.querySelector('.popup__text--capacity').textContent = `${cards.offer.rooms} комнаты для ${cards.offer.guests} гостей`;
  } else {
    newCard.querySelector('.popup__text--capacity').textContent = 'Есть номера различной вместимости';
  }
  if (cards.offer.checkin && cards.offer.checkout) {
    newCard.querySelector('.popup__text--time').textContent = `Заезд после ${cards.offer.checkin}, выезд до ${cards.offer.checkout}`;
  } else {
    newCard.querySelector('.popup__text--time').style.display = 'none';
  }
  if (cards.offer.description) {
    featuresCompare(cards.offer.features, newCard.querySelectorAll('.popup__feature'));
  } else {
    newCard.querySelectorAll('.popup__feature').style.display = 'none';
  }
  if (cards.offer.description) {
    newCard.querySelector('.popup__description').textContent = cards.offer.description;
  } else {
    newCard.querySelector('.popup__description').style.display = 'none';
  } if (cards.offer.photos) {
    const photosList = newCard.querySelector('.popup__photos');
    photosList.innerHTML = '';
    photosList.appendChild(photosCompare(cards.offer.photos));
  } else {
    newCard.querySelector('.popup__photos').style.display = 'none';
  }
  if (cards.author.avatar) {
    newCard.querySelector('.popup__avatar').src = cards.author.avatar;
  }
  else {
    newCard.querySelector('.popup__avatar').style.display = 'none';
  }

  cardListFragment.appendChild(newCard);
});

mapCanvas.appendChild(cardListFragment.querySelectorAll('article')[0]);

