require("./map.js");

console.info("TEST map");

console.info(
  "CASE return a new array from original array items multiplied by 2"
);

{
  const numbers = [1, 4, 9, 16];

  const newNumbersArray = numbers.map((x) => x * 2);

  //test if the new array is as expected
  console.assert(newNumbersArray[0] === 2, "newNumbersArray[0] is 2");
  console.assert(newNumbersArray[1] === 8, "newNumbersArray[1] is 8");
  console.assert(newNumbersArray[2] === 18, "newNumbersArray[2] is 18");
  console.assert(newNumbersArray[3] === 32, "newNumbersArray[3] is 32");
  console.assert(newNumbersArray.length === 4, "newNumbersArray.length is 4");

  //test if the original array remains the same
  console.assert(numbers[0] === 1, "numbers[0] is 1");
  console.assert(numbers[1] === 4, "numbers[1] is 4");
  console.assert(numbers[2] === 9, "numbers[2] is 9");
  console.assert(numbers[3] === 16, "numbers[3] is 16");
}

console.info(
  "CASE return a new array from original array items multiplied by index"
);

{
  const numbers = [1, 4, 9, 16];

  const newNumbersArray = numbers.map((x, i) => x * i);

  //test if the new array is as expected
  console.assert(newNumbersArray[0] === 0, "newNumbersArray[0] is 0");
  console.assert(newNumbersArray[1] === 4, "newNumbersArray[1] is 4");
  console.assert(newNumbersArray[2] === 18, "newNumbersArray[2] is 18");
  console.assert(newNumbersArray[3] === 48, "newNumbersArray[3] is 48");
  console.assert(newNumbersArray.length === 4, "newNumbersArray.length is 4");

  //test if the original array remains the same
  console.assert(numbers[0] === 1, "numbers[0] is 1");
  console.assert(numbers[1] === 4, "numbers[1] is 4");
  console.assert(numbers[2] === 9, "numbers[2] is 9");
  console.assert(numbers[3] === 16, "numbers[3] is 16");
}

console.info(
  "CASE every item of the new array is the correspondant item from the original array multoplied by index and plus the first element of the original"
);

{
  const numbers = [1, 4, 9, 16];

  const newNumbersArray = numbers.map(
    (x, i, originalArr) => x * i + originalArr[0]
  );

  //test if the new array is as expected
  console.assert(newNumbersArray[0] === 1, "newNumbersArray[0] is 1");
  console.assert(newNumbersArray[1] === 5, "newNumbersArray[1] is 5");
  console.assert(newNumbersArray[2] === 19, "newNumbersArray[2] is 19");
  console.assert(newNumbersArray[3] === 49, "newNumbersArray[3] is 49");
  console.assert(newNumbersArray.length === 4, "newNumbersArray.length is 4");

  //test if the original array remains the same
  console.assert(numbers[0] === 1, "numbers[0] is 1");
  console.assert(numbers[1] === 4, "numbers[1] is 4");
  console.assert(numbers[2] === 9, "numbers[2] is 9");
  console.assert(numbers[3] === 16, "numbers[3] is 16");
}

console.info("CASE use values from another array changing the context");

{
  const numbers = [1, 4, 9, 16];

  const contextNumbers = [1, 2, 3, 4];

  const newNumbersArray = numbers.map(function (x) {
    return x + this[0];
  }, contextNumbers);

  //test if new array it's like we expect
  console.assert(newNumbersArray[0] === 2, "newNumbersArray[0] is 2");
  console.assert(newNumbersArray[1] === 5, "newNumbersArray[1] is 3");
  console.assert(newNumbersArray[2] === 10, "newNumbersArray[2] is 7");
  console.assert(newNumbersArray[3] === 17, "newNumbersArray[3] is 13");
}
