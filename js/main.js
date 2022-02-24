function getRandomNumber(min, max) {
  if(min<0||max<0) {
    return 0;
  } else if ((max-min)<0){
    const mem = max;
    max = min;
    min = mem;
  }
  return Math.round(Math.random()*(max-min))+min;
}

getRandomNumber(17,15);

function getRandomLocation(min, max, digit) {
  if(min<0||max<0) {
    return 0;
  } else if ((max-min)<0){
    const mem = max;
    max = min;
    min = mem;
  }
  return Math.round((Math.random()*(max-min)+min)*(10**digit))/(10**digit);
}

getRandomLocation(1, 5, 2);
