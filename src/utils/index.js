export const uniqueArray = (array) =>
  array.filter((v, i, a) => a.indexOf(v) === i);

export const removeItemFromArray = (array, i) =>
  array.filter((item) => item !== i);
