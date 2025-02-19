Array.prototype.forEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};

const numbers = [1, 2, 3, 4];

numbers.forEach((element) => console.log(element));
