require("./pop.js");

console.info("TEST pop");

console.info("CASE remove one item from array");

let numbers = [1, 2, 3, 4];

const itemRemoved = numbers.pop();

console.assert(numbers[0] === 1, "numbers[0] is 1");
console.assert(numbers[0] === 1, "numbers[1] is 2");
console.assert(numbers[0] === 1, "numbers[2] is 3");
console.assert(numbers.length === 3, "numbers length is 3");

console.assert(itemRemoved === 4, "itemRemoved is 4");
