delete Array.prototype.indexOf;

Array.prototype.indexOf = function (item, indexToStart) {
  if (indexToStart > -1 || indexToStart === undefined) {
    for (let i = 0; i < this.length; i++) {
      if (item === this[i]) return i;
    }

    return -1;
  } else if (indexToStart < 0) {
    for (let i = this.length - 1; i > 0; i--) {
      if (item === this[i]) return i;
    }
    return -1;
  }
};

const num = [1, 2, 3, 4, 5];

console.log(num.indexOf(8));

// fromIndex	Comportament
// ≥ 0	Cerca des de fromIndex.
// >= array.length	Retorna -1 (no trobat).
// -array.length <= fromIndex < 0	Es recalcula com fromIndex + array.length.
// < -array.length	Es tracta com 0, busca tot l’array.
// Omisió (undefined)	Es tracta com 0, busca tot l’array.
