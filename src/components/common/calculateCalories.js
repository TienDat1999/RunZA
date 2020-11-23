// tinh chi so BWR
export const BWR = (gender, age, weight, heigh) => {
  if (gender == 'nam') {
    let bwr =
      88.362 +
      13.397 * Number(weight) +
      4.799 * Number(heigh) -
      5.667 * Number(age);

    return bwr;
  } else if (gender == 'nu') {
    let bwr =
      447.593 +
      9.247 * Number(weight) +
      3.098 * Number(heigh) -
      4.33 * Number(age);

    return bwr;
  } else {
    return 0;
  }
};
// tinh ra so luong calori dot chay trong bao nhieu phut di bo
export const CaloriesBurn = (bwr, mph, minute) => {
  let calburn = ((bwr * mph) / 24) * (minute / 60);
  return calburn;
};
