import './card.js';
import { formElement, fieldsetElements, resetForm, setFormSubmit, clearForm, clearSubmit } from './form.js';
import { mapFiltersElement, mapFormFiltersElement, mapFilterFeaturesElement, changeFiter, compareFilters, clearFilter } from './filters.js';
import { isMapLoading, createMarkers, getDefaultValuesMap, removePopUp } from './map.js';
import { getDefaultValuesSlider } from './slider.js';
import { toggleForm, debounce, showAlert } from './util.js';
import './api-fetch.js';
import { getData } from './api-fetch.js';
import { clearPreview, previewAvatarContainer, previewPhotoContainer } from './avatar.js';
import { showSuccess } from './alert.js';
const RERENDER_DELAY = 500;

toggleForm(false, formElement, fieldsetElements, 'ad-form--disabled');

toggleForm(false, mapFormFiltersElement, mapFiltersElement, 'map__filters--disabled');

toggleForm(isMapLoading, formElement, fieldsetElements, 'ad-form--disabled');

getData('https://25.javascript.pages.academy/keksobooking/data',
  (data) => {
    createMarkers(data.slice(0, 10));
    toggleForm(true, mapFormFiltersElement, mapFiltersElement, 'map__filters--disabled');
    changeFiter(data, mapFiltersElement, debounce(() => createMarkers(compareFilters(data)), RERENDER_DELAY));
    changeFiter(data, mapFilterFeaturesElement, debounce(() => createMarkers(compareFilters(data)), RERENDER_DELAY));
    resetForm(() => {
      clearPreview(previewAvatarContainer, previewPhotoContainer);
      clearFilter();
      clearForm(); createMarkers(data.slice(0, 10));
      getDefaultValuesMap(); getDefaultValuesSlider();
    });
    setFormSubmit(() => createMarkers(data.slice(0, 10)));
  },
  () => showAlert('К сожалению при загрузке обьявлений произошла ошибка попробуйте позже')
);

setFormSubmit(() => {
  showSuccess();
  clearForm();
  removePopUp();
  clearSubmit();
  clearFilter();
  getDefaultValuesMap();
  getDefaultValuesSlider();
  clearPreview(previewAvatarContainer, previewPhotoContainer);
});

