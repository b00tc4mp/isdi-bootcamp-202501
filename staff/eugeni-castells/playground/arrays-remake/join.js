Array.prototype.join = function (separator) {
  separator === undefined ? (separator = ",") : separator;
  let returnedString = "";

  for (let i = 0; i < this.length; i++) {
    let element = this[i];

    i === this.length - 1
      ? (returnedString += element)
      : returnedString + separator;
  }

  return returnedString;
};
