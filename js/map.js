
import { cardsDataArray, createCard } from './card.js';
import { COORDINATE_POINTS, PIN_SIZE, MAIN_PIN_SIZE, PIN_RATIO } from './data.js';
let isMapLoading = false;


const map = L.map('map-canvas')
  .on('load', () => {
    isMapLoading = true;
  })
  .setView(COORDINATE_POINTS, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createIcon = (size, urlIcon) => {
  const markerIcon = L.icon({
    iconUrl: urlIcon,
    iconSize: [size, size],
    iconAnchor: [size * PIN_RATIO, size],
  });
  return markerIcon;
};

const createMarker = ({ lat, lng }, icon, draggable) => {
  const newMarker = L.marker(
    {
      lat,
      lng
    },
    {
      draggable,
      icon
    },
  );
  return newMarker;
};

const mainMarker = createMarker(COORDINATE_POINTS, createIcon(MAIN_PIN_SIZE, './img/main-pin.svg'), true);
mainMarker.addTo(map);

const getStingCoordinate = ({ lat, lng }) => `${lat.toFixed(5)} ,${lng.toFixed(5)}`;

const getPinAdress = (evt, element) => {
  element.value = getStingCoordinate(evt.target.getLatLng());
};

export const onMarkerMoveed = (element) => {
  mainMarker.on('moveend', (evt) => {
    getPinAdress(evt, element);
  });
};

const createMarkers = (card) => {
  const icon = createIcon(PIN_SIZE, './img/pin.svg');
  const marker = createMarker(card.location, icon, false);

  marker
    .addTo(map)
    .bindPopup(createCard(card));
};

cardsDataArray.forEach((card) => {
  createMarkers(card);
});

export { map, isMapLoading };
