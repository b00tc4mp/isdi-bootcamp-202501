console.info("TEST find");

console.info("CASE find first positive number");

{
  const numbers = [-1, -7, 0, 7];

  const positiveValue = numbers.find((number) => number >= 0);

  console.assert(positiveValue === 0, "positive value is 0");
  console.assert(numbers.length === 4, "numbers length is 4");
  console.assert(numbers[0] === -1, "numbers length is 4");
  console.assert(numbers[1] === -7, "numbers length is 4");
  console.assert(numbers[2] === 0, "numbers length is 4");
  console.assert(numbers[3] === 7, "numbers length is 4");
}
