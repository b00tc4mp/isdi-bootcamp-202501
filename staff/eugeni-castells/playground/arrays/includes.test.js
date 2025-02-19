// The includes() method of Array instances determines whether an array includes a certain value among its entries, returning true or false as appropriate.

const numbers = [1, 2, 3];

console.log(numbers.includes(2));
// Expected output: true

const pets = ["cat", "dog", "bat"];

console.log(pets.includes("cat"));
// Expected output: true

console.log(pets.includes("at"));
// Expected output: false

//DOESN'T CHANGE THE ORIGINAL ARRAY
