function getLessNumber(from, to) {
  return Math.min(Math.abs(from), Math.abs(to));
}

function getUpperNumber(from, to) {
  return Math.max(Math.abs(from), Math.abs(to));
}

function getRandomNumber(from, to) {
  const lower = getLessNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

getRandomNumber(17, 15);

function getRandomLocation(from, to, digit) {
  const lower = getLessNumber(from, to);
  const upper = getUpperNumber(from, to);
  if (lower === upper) {
    return upper;
  }
  return Math.round((Math.random() * (upper - lower) + lower) * (10 ** digit)) / (10 ** digit);
}

getRandomLocation(1, 5, 2);
