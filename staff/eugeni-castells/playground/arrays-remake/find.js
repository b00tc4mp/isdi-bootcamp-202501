Array.prototype.find = function (callback, context) {
  let found;

  let index;

  for (let i = 0; i < this.length && found === undefined; i++) {
    let element = this[i];

    let boolean = callback.call(context, element, i, this);

    if (boolean) {
      found = element;
      index = i;
    }
  }

  return found;
};
