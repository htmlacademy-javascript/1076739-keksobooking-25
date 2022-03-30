import { priceElement } from './form.js';

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  if (sliderElement.noUiSlider.get() > 0) {
    priceElement.value = sliderElement.noUiSlider.get();
  }

});

priceElement.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});
