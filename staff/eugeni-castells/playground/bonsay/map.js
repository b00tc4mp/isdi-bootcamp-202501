const Bonsay = require("./Bonsay");

Bonsay.prototype.map = function (callback, context) {
  let returnedArray = [];

  for (let i = 0; i < this.length; i++) {
    let returnedValue = callback.call(context, this[i], i, this);
    returnedArray[returnedArray.length] = returnedValue;
  }

  return returnedArray;
};
