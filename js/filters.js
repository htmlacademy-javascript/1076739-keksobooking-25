const mapFiltersElement = document.querySelectorAll('.map__filter');
const mapFormFiltersElement = document.querySelector('.map__filters');
const mapFilterTypeElement = mapFormFiltersElement.querySelector('#housing-type');
const mapFilterPriceElement = mapFormFiltersElement.querySelector('#housing-price');
const mapFilterRoomsElement = mapFormFiltersElement.querySelector('#housing-rooms');
const mapFilterGuestsElement = mapFormFiltersElement.querySelector('#housing-guests');
const mapFilterFeaturesElement = mapFormFiltersElement.querySelectorAll('#housing-features input');

const clearFilter = () => {
  mapFormFiltersElement.reset();
};

const valueFilterPrice = {
  'any': [0, Infinity],
  'low': [0, 10000],
  'middle': [10000, 50000],
  'high': [50000, Infinity]
};


const compareFeatures = () => {
  const featuresCheckbox = [];
  mapFilterFeaturesElement.forEach((element) => {
    if (element.checked) {
      featuresCheckbox.push(element.value);
    }
  });
  return featuresCheckbox;
};


const compareFilters = (data) => {
  const newData = data.slice()
    .filter((element) => mapFilterTypeElement.value.toString() === element.offer.type || mapFilterTypeElement.value.toString() === 'any')
    .filter((element) => (valueFilterPrice[mapFilterPriceElement.value][0] <= element.offer.price && element.offer.price < valueFilterPrice[mapFilterPriceElement.value][1]))
    .filter((element) => mapFilterRoomsElement.value === element.offer.rooms.toString() || mapFilterRoomsElement.value === 'any')
    .filter((element) => mapFilterGuestsElement.value === element.offer.rooms.toString() || mapFilterGuestsElement.value === 'any')
    .filter((element) => {
      let isfeatures = false;
      const userFeatures = compareFeatures();
      if (element.offer.features) {
        isfeatures = userFeatures.every((userfeature) => element.offer.features.includes(userfeature));
      }
      return isfeatures;
    })
    .slice(0, 10);
  return newData;
};


const onChangeFiter = (data, filterName, cb) => {
  filterName.forEach((filterElement) => {
    filterElement.addEventListener('change', () => {
      cb(compareFilters(data));
    });
  });
};

export { mapFiltersElement, mapFormFiltersElement, onChangeFiter, mapFilterFeaturesElement, compareFilters, clearFilter };
