

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

const slider = sliderElement.noUiSlider;

const getDefaultValuesSlider = () => {
  slider.updateOptions({
    range: {
      min: 0,
      max: 100000
    },
    start: 0,
    step: 1
  });
};

export { slider,  getDefaultValuesSlider};
