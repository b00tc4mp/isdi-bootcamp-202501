Array.prototype.pop = function () {
  returnedValue = this[this.length - 1];

  if (this.length === 0) return undefined;

  this.length = this.length - 1;

  return returnedValue;
};
