Array.prototype.includes = function (element, fromIndex) {
  if (fromIndex > this.length) return false;

  let found = false;

  fromIndex = fromIndex !== undefined ? fromIndex : 0;

  if (fromIndex < 0) {
    let result = this.length + fromIndex;

    result = result < 0 ? 0 : result;

    for (; result < this.length && !found; result++) {
      if (element === this[result]) found = true;
    }
    if (!found) found = false;
  } else {
    for (; fromIndex < this.length; fromIndex++) {
      if (element === this[fromIndex]) found = true;
    }
  }
  return found;
};
