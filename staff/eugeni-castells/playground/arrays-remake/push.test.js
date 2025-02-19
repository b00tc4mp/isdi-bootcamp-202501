require("./push.js");

// The push() method of Array instances adds the specified elements to the end of an array and returns the new length of the array.

console.info("TEST push");

console.info("CASE add one item string to the array");

{
  const animals = ["pigs", "goats", "sheep"];

  const count = animals.push("cows");

  //test if the array has added the item to the end and the rest remains the same
  console.assert(animals[0] === "pigs", "animals[0] is pigs");
  console.assert(animals[1] === "goats", "animals[1] is goats");
  console.assert(animals[2] === "sheep", "animals[2] is sheeps");
  console.assert(animals[3] === "cows", "animals[3] is cows");
  console.assert(animals.length === 4, "animals length is 4");

  //test if the return is the new length
  console.assert(
    count === animals.length,
    "count length is different from returned arrays length"
  );
}

console.info("CASE if push with more than one arguments works");

{
  const animals = ["pigs", "goats", "sheep"];

  let count = animals.push("chickens", "cats", "dogs");

  console.assert(animals[0] === "pigs", "animals[0] is pigs");
  console.assert(animals[1] === "goats", "animals[1] is goats");
  console.assert(animals[2] === "sheep", "animals[2] is sheeps");
  console.assert(animals[3] === "chickens", "animals[3] is cows");
  console.assert(animals[4] === "cats", "animals[3] is cows");
  console.assert(animals[5] === "dogs", "animals[3] is cows");
  console.assert(animals.length === 6, "animals length is 6");

  //test if the return is the new length
  console.assert(
    count === animals.length,
    "count length is different from returned arrays length"
  );
}

console.info("CASE no item is added");

{
  const animals = ["pigs", "goats", "sheep"];

  const count = animals.push();

  console.assert(animals[0] === "pigs", "animals[0] is pigs");
  console.assert(animals[1] === "goats", "animals[1] is goats");
  console.assert(animals[2] === "sheep", "animals[2] is sheeps");
  console.assert(animals.length === 3, "animals length is 3");
}
