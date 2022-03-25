import { generateOdjectDataArray, TYPES } from './data.js';

const cardsDataArray = generateOdjectDataArray();
const cardTemplate = document.querySelector('#card').content.querySelector('article');
const mapCanvas = document.querySelector('#map-canvas');
const cardListFragment = document.createDocumentFragment();

const createFeatures = (parentList, userFeatures) => {
  parentList.innerHTML = '';
  userFeatures.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add(`popup__feature--${feature}`);
    parentList.appendChild(newFeature);
  });
};

const createPhotos = (parentList, photoSources) => {
  parentList.innerHTML = '';
  photoSources.forEach((photoSrc) => {
    const photoElement = document.createElement('img');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.src = photoSrc;
    photoElement.alt = 'Фотография жилья';
    photoElement.classList.add('popup__photo');
    parentList.appendChild(photoElement);
  });
};

const fillElement = (element, content) => {
  if (content) {
    element.textContent = content;
  } else {
    element.remove();
  }
};

cardsDataArray.forEach((cards) => {
  const newCard = cardTemplate.cloneNode(true);

  fillElement(newCard.querySelector('.popup__title'), cards.offer.title);

  fillElement(newCard.querySelector('.popup__text--address'), cards.offer.address);

  if (cards.offer.price) {
    newCard.querySelector('.popup__text--price').textContent = `${cards.offer.price} ₽/ ночь`;
  } else {
    newCard.querySelector('.popup__text--price').remove();
  }

  fillElement(newCard.querySelector('.popup__type'), TYPES[cards.offer.type]);

  if (cards.offer.rooms && cards.offer.guests) {
    newCard.querySelector('.popup__text--capacity').textContent = `${cards.offer.rooms} комнаты для ${cards.offer.guests} гостей`;
  } else {
    newCard.querySelector('.popup__text--capacity').remove();
  }

  if (cards.offer.checkin && cards.offer.checkout) {
    newCard.querySelector('.popup__text--time').textContent = `Заезд после ${cards.offer.checkin}, выезд до ${cards.offer.checkout}`;
  } else {
    newCard.querySelector('.popup__text--time').remove();
  }

  if (cards.offer.description) {
    createFeatures(newCard.querySelector('.popup__features'), cards.offer.features);
  } else {
    newCard.querySelectorAll('.popup__feature').remove();
  }

  fillElement(newCard.querySelector('.popup__description'), cards.offer.description);

  if (cards.offer.photos) {
    createPhotos(newCard.querySelector('.popup__photos'), cards.offer.photos);
  } else {
    newCard.querySelector('.popup__photos').remove();
  }

  if (cards.author.avatar) {
    newCard.querySelector('.popup__avatar').src = cards.author.avatar;
  } else {
    newCard.querySelector('.popup__avatar').remove();
  }

  cardListFragment.appendChild(newCard);
});

mapCanvas.appendChild(cardListFragment.querySelectorAll('article')[0]);