import './card.js';
import { formElement, fieldsetElements, mapFiltersElement, mapFormFiltersElement } from './form.js';

import { isMapLoading } from './map.js';
import './slider.js';
import { togglePage } from './util.js';

togglePage(isMapLoading, formElement, fieldsetElements, 'ad-form--disabled');

togglePage(isMapLoading, mapFormFiltersElement, mapFiltersElement, 'map__filters--disabled');
