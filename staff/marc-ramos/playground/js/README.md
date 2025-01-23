# JavaScript
![Js logo](https://imgs.search.brave.com/0LCHWkyldYZN1XIZKcWQI3gAaEGQnv0nCcyMKil20W8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/NC8yMy8xNy80MS9q/YXZhc2NyaXB0LTcz/NjQwMF8xMjgwLnBu/Zw)
##  .map
Iterate over each element in an array and apply a function to each element, returning a new array.
```sh
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]
```
## .reduce
Array function that allows you to reduce all the elements of an array to a single value.
```sh
const numbers = [1, 2, 3, 4, 5];

const suma = numbers.reduce((acumulador, valorActual) => {
  return acumulador + valorActual;
}, 0); // El valorInicial es 0

console.log(suma); // 15
```
## .filter
Filter just the elements that pass the test implemented by the provided function.
```sh
const ages = [32, 33, 16, 40];
const result = ages.filter(checkAdult);
function checkAdult(age) {
  return age >= 18;
}
// Expected output: [32, 33, 40]
```
## .every
Checks if all elements in the array meets the condition implemented by the provided function.
```sh
const ages = [32, 33, 16, 40]
function checkAge(age) {
  return age > 18;
}
ages.every(checkAge)
// Expected output: false
````
## .some
Checks if at least one element of the array meets the condition implemented by the provided function.
```sh
const ages = [3, 10, 18, 20];

ages.some(checkAdult);
function checkAdult(age) {
  return age > 18;
}
// Expected output: true
````

