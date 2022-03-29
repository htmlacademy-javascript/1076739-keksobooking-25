import { generateOdjectDataArray, TYPES } from './data.js';

const cardsDataArray = generateOdjectDataArray();
const cardTemplate = document.querySelector('#card').content.querySelector('article');
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
  if (content && !content.includes(undefined)) {
    element.textContent = content;
  } else {
    element.remove();
  }
};

const createPinPopup = (card) => {
  const newCard = cardTemplate.cloneNode(true);

  fillElement(newCard.querySelector('.popup__title'), card.offer.title);

  fillElement(newCard.querySelector('.popup__text--address'), card.offer.address);

  fillElement(newCard.querySelector('.popup__text--price'), `${card.offer.price} ₽/ ночь`);

  fillElement(newCard.querySelector('.popup__type'), TYPES[card.offer.type]);

  fillElement(newCard.querySelector('.popup__text--capacity'), `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`);

  fillElement(newCard.querySelector('.popup__text--time'), `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);

  if (card.offer.description) {
    createFeatures(newCard.querySelector('.popup__features'), card.offer.features);
  } else {
    newCard.querySelectorAll('.popup__feature').remove();
  }

  fillElement(newCard.querySelector('.popup__description'), card.offer.description);

  if (card.offer.photos) {
    createPhotos(newCard.querySelector('.popup__photos'), card.offer.photos);
  } else {
    newCard.querySelector('.popup__photos').remove();
  }

  if (card.author.avatar) {
    newCard.querySelector('.popup__avatar').src = card.author.avatar;
  } else {
    newCard.querySelector('.popup__avatar').remove();
  }

  cardListFragment.appendChild(newCard);
  return newCard;
};


export { cardsDataArray, createPinPopup };
