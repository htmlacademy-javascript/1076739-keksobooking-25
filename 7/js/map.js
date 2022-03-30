import { formElement } from './form.js';
import { cardsDataArray, createPinPopup } from './card.js';

const fieldsetElements = document.querySelectorAll('.ad-form__element');
const mapFormFiltersElement = document.querySelector('.map__filters');
const mapFiltersElement = mapFormFiltersElement.querySelectorAll('.map__filter');
const adressElement = document.querySelector('#address');

const makeMapInactive = () => {
  formElement.classList.add('ad-form--disabled');
  mapFormFiltersElement.classList.add('map__filters--disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  mapFiltersElement.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
};

makeMapInactive();

const makeMapActive = () => {
  formElement.classList.remove('ad-form--disabled');
  mapFormFiltersElement.classList.remove('map__filters--disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', 'disabled');
  });
  mapFiltersElement.forEach((filter) => {
    filter.removeAttribute('disabled', 'disabled');
  });
};

const map = L.map('map-canvas')
  .on('load', () => {
    makeMapActive();
  })
  .setView({ lat: 35.6817, lng: 139.7539 }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainMarker = L.marker(
  {
    lat: 35.6817,
    lng: 139.7539,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

adressElement.value = `${mainMarker.getLatLng().lat}:${mainMarker.getLatLng().lng}`;

mainMarker.addTo(map);

const getPinAdress = (evt) => {
  const adressLat = evt.target.getLatLng().lat;
  const adresslng = evt.target.getLatLng().lng;
  adressElement.value = `${adressLat.toFixed(5)}:${adresslng.toFixed(5)}`;
};

mainMarker.on('moveend', (evt) => {
  getPinAdress(evt);
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const createMarker = (card) => {
  const { lat, lng } = card.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createPinPopup(card));
};

cardsDataArray.forEach((card) => {
  createMarker(card);
});
