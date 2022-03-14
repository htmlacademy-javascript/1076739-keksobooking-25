const getLowerNumber = (from, to) => Math.min(Math.abs(from), Math.abs(to));

const getUpperNumber = (from, to) => Math.max(Math.abs(from), Math.abs(to));

const getRandomNumber = (from, to) => {
  const lower = getLowerNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomLocation = (from, to, digit) => {
  const lower = getLowerNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.round((Math.random() * (upper - lower) + lower) * (10 ** digit)) / (10 ** digit);
};

const getNumberWithLeadZero = (num) => num < 10 ? `0${num}` : num;

const getRandomArrayElements = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getMyltipleArrayElements = (elements) => elements.slice(0, getRandomNumber(1, elements.length));

export { getRandomNumber, getRandomLocation, getNumberWithLeadZero, getRandomArrayElements, getMyltipleArrayElements };
