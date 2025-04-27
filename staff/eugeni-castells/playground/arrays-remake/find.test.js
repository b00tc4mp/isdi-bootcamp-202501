require("./find");

console.info("TEST find");

console.info("CASE find first positive number");

{
  const numbers = [-1, -7, 0, 7];

  const positiveValue = numbers.find((number) => number >= 0);

  console.assert(positiveValue === 0, "positive value is 0");
  console.assert(numbers.length === 4, "numbers length is 4");
  console.assert(numbers[0] === -1, "numbers[0] is -7");
  console.assert(numbers[1] === -7, "numbers[1] is -1");
  console.assert(numbers[2] === 0, "numbers[2] is 0");
  console.assert(numbers[3] === 7, "numbers[3] is 7");
}

console.info("CASE find positive number plus index");
{
  const numbers = [-7, -1, 0, 7];

  const positiveValue = numbers.find((number, i) => number + i >= 0);

  console.assert(positiveValue === -1, "positive value is -1");
  console.assert(numbers.length === 4, "numbers length is 4");
  console.assert(numbers[0] === -7, "numbers[0] is -7");
  console.assert(numbers[1] === -1, "numbers[1] is -1");
  console.assert(numbers[2] === 0, "numbers[2] is 0");
  console.assert(numbers[3] === 7, "numbers[3] is 7");
}

console.info(
  "CASE find positive number plus index plus first value of the array"
);

{
  const numbers = [-7, -1, 0, 7];

  const positiveValue = numbers.find(
    (number, i, array) => number + i + array[0] >= 0
  );

  console.assert(positiveValue === 7, "positive value is 7");
  console.assert(numbers.length === 4, "numbers length is 4");
  console.assert(numbers[0] === -7, "numbers[0] is -7");
  console.assert(numbers[1] === -1, "numbers[1] is -1");
  console.assert(numbers[2] === 0, "numbers[2] is 0");
  console.assert(numbers[3] === 7, "numbers[3] is 7");
}

console.info(
  "CASE find positive number plus index plus first value of the array and the price property in the context object"
);

{
  const numbers = [-7, -1, 0, 7];

  const obj = {
    price: 5,
  };

  const positiveValue = numbers.find(function (number, i, array) {
    return number + i + array[0] + this.price >= 0;
  }, obj);

  console.assert(positiveValue === 0, "positive value is -1");
  console.assert(numbers.length === 4, "numbers length is 4");
  console.assert(numbers[0] === -7, "numbers[0] is -7");
  console.assert(numbers[1] === -1, "numbers[1] is -1");
  console.assert(numbers[2] === 0, "numbers[2] is 0");
  console.assert(numbers[3] === 7, "numbers[3] is 7");
}
