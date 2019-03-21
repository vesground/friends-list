String.prototype.capitalize = function () {
  return this.replace(/(?:^|\s)\S/g, firstCharacter => firstCharacter.toUpperCase());
};

export const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export const compareInAscendingOrder = (a, b, colunmName) => {
  if (a[colunmName] > b[colunmName]) {
    return 1;
  }
  if (a[colunmName] < b[colunmName]) {
    return -1;
  }
  return 0;
};

export const compareInDescendingOrder = (a, b, colunmName) => {
  if (a[colunmName] < b[colunmName]) {
    return 1;
  }
  if (a[colunmName] > b[colunmName]) {
    return -1;
  }
  return 0;
};
