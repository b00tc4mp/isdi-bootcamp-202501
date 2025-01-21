# Javascript manual

### BROWSER DEBUGGER

#### Inspector -> Source -> Snippets -> New Snippets

## Function declaration vs Function expression

FUNCTION DECLARATION:

```js
function generateIntro(name) {
  return `Hi, my name is ${name}`;
}

const dillion = generateIntro("Dillion");
console.log(dillion);

// Hi, my name is Dillion
```

FUNCTION EXPRESSION

```js
const generateIntro = function (name) {
  return `Hi, my name is ${name}`;
};

const dillion = generateIntro("Dillion");
console.log(dillion);

// Hi, my name is Dillion
```

In function expression we assign a variable to a anonyous function.

HOISTING -> When you use the first case, declare a function, it doesn't matter when the function is declared. The hoisting will bring the declared function to the top.

var also is hoisted.

## ARRAYS

### .map()

```js
let arr = [1, 2, 3, 4];
function sum(number) {
  return number.map(function (number) {
    return number + 1;
  });
}
let newSum = sum(arr);
console.log(newSum); //[2,3,4,5]
```

The .map() method takes a callback function as an argument. This callback function will be executed for every item in the array.

It returns a new array, it doesn't need to be declared inside a new variable.

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

### .reduce()

```js
let people = [
  { name: "Maria", age: 25 },
  { name: "Manel", age: 35 },
];

let newObj = people.reduce(function (acc, current) {
  acc[current.name] = current.age;
  return acc;
}, {});

console.log(newObj); //Output: {maria:25,manel:35}
```

In the first case we are reducing all the items in the array into a final object applying the changes for each item iteration.

```js
let numbers = [1, 2, 3, 4];

let sum = numbers.reduce(function (sum, current) {
  sum += current;
  return sum;
}, 0);

console.log(sum); //Output 10
```

The reduce() method takes two arguments: the callback function and the initial value of the accumulator.
The callback function takes 2 arguments: the accumulator and the currentValue. The currentVale is the item of the array that is being evaluated.
It is important to return accumulator in every reduce.

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

### .filter()

```js
let numbers = [1, 2, 3, 4];

let filteredNums = numbers.filter(function (number) {
  return number >= 3;
});

console.log(filteredNums); //Output: [3,4]
```

The .filter() method returns an new array with all the items that fulfill the condition. In other words, if the item returns true when evaluated for the given condition, goes into the new array.
