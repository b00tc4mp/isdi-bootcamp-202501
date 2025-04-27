require("./forEach.js");

console.info("TEST forEach");

console.info("CASE copy each element into a new array");

{
  const characters = ["a", "b", "c"];

  const copiedCharacters = [];

  characters.forEach(function (element) {
    copiedCharacters[copiedCharacters.length] = element;
  });

  //tests to check if the original array remains the same
  console.assert(characters[0] === "a", "character[0] is a");
  console.assert(characters[1] === "b", "character[1] is b");
  console.assert(characters[2] === "c", "character[2] is c");
  console.assert(characters.length === 3, "character's length is 3");

  //test to check if the copiedArray is correct
  console.assert(copiedCharacters[0] === "a", "copiedCharacter[0] is a");
  console.assert(copiedCharacters[1] === "b", "copiedCharacter[1] is b");
  console.assert(copiedCharacters[2] === "c", "copiedCharacter[2] is c");
  console.assert(
    copiedCharacters.length === 3,
    "copiedCharacter's length is 3"
  );
}

console.info("CASE copy every index of the given array to a new one");

{
  const characters = ["a", "b", "c"];

  const copiedCharacters = [];

  characters.forEach(function (element, i) {
    copiedCharacters[copiedCharacters.length] = i;
  });

  //tests to check if the original array remains the same
  console.assert(characters[0] === "a", "character[0] is a");
  console.assert(characters[1] === "b", "character[1] is b");
  console.assert(characters[2] === "c", "character[2] is c");
  console.assert(characters.length === 3, "character's length is 3");

  //test to check if the copiedArray is correct
  console.assert(copiedCharacters[0] === 0, "copiedCharacter[0] is 0");
  console.assert(copiedCharacters[1] === 1, "copiedCharacter[1] is 1");
  console.assert(copiedCharacters[2] === 2, "copiedCharacter[2] is 2");
  console.assert(
    copiedCharacters.length === 3,
    "copiedCharacter's length is 3"
  );
}

console.info("CASE add everytime the first item of the given array");

{
  const characters = ["a", "b", "c"];

  const copiedCharacters = [];

  characters.forEach(function (element, i, currentArray) {
    copiedCharacters[copiedCharacters.length] = element + currentArray[0];
  });

  //tests to check if the original array remains the same
  console.assert(characters[0] === "a", "character[0] is a");
  console.assert(characters[1] === "b", "character[1] is b");
  console.assert(characters[2] === "c", "character[2] is c");
  console.assert(characters.length === 3, "character's length is 3");

  //test to check if the copiedArray is correct
  console.assert(copiedCharacters[0] === "aa", "copiedCharacter[0] is aa");
  console.assert(copiedCharacters[1] === "ba", "copiedCharacter[1] is ba");
  console.assert(copiedCharacters[2] === "ca", "copiedCharacter[2] is ca");
  console.assert(
    copiedCharacters.length === 3,
    "copiedCharacter's length is 3"
  );
}

console.info(
  "CASE add every value of the array to the empty object with the attributes being the index of the item"
);

{
  const characters = ["a", "b", "c"];

  const object = {};

  characters.forEach(function (element) {
    this[element] = element.toUpperCase();
  }, object);

  keys = Object.keys(object);

  //tests to check if the original array remains the same
  console.assert(characters[0] === "a", "character[0] is a");
  console.assert(characters[1] === "b", "character[1] is b");
  console.assert(characters[2] === "c", "character[2] is c");
  console.assert(characters.length === 3, "character's length is 3");

  //test to check if the copiedArray is correct
  console.assert(object["a"] === "A", "object[0] is A");
  console.assert(object["b"] === "B", "object[1] is B");
  console.assert(object["c"] === "C", "object[2] is C");
  console.assert(keys.length === 3, "object keys's length is 3");
}
