// search for the first index of an element
// returns the index or -1 if it doesn't exist
// in second position can include an index to start from

const animals = ["ant", "bison", "camel", "duck", "bison"];

console.log(animals.indexOf("bison"));
// Expected output: 1

// Start from index 2
console.log(animals.indexOf("bison", 2));
// Expected output: 4

console.log(animals.indexOf("giraffe"));
// Expected output: -1