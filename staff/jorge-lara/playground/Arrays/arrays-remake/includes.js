Array.prototype.includes = function (element, fromIndex) {
  let len = this.length;
  if (len === 0) return false;

  // If fromIndex is not defined, start at 0
  let start;
  if (fromIndex === undefined) {
    start = 0;
  } else {
    start = fromIndex;
  }

  // If start is negative, adjust it by adding the array length
  if (start < 0) {
    let computedIndex = len + start;
    if (computedIndex < 0) {
      start = 0;
    } else {
      start = computedIndex;
    }
  }

  // Iterate through the array from the start index
  for (; start < len; start++) {
    if (this[start] === element) {
      return true;
    }
  }

  return false;
};
