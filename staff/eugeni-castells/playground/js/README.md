# Javascript manual

### COMMANDS

console.dir() -> Prints the object and let you inspect it.

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

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

### .sort()

```js

```

STACK MEMORY vs HEAP MEMORY

In JavaScript, memory management is divided into two main areas: heap memory and stack memory. They serve different purposes and handle data in different ways.

1. Stack Memory
   The stack is used to store primitive values (like numbers, strings, and booleans) and references to objects and functions. The stack operates in a LIFO (Last In, First Out) order, meaning the last piece of data pushed onto the stack is the first one to be popped off.

Here’s how it works:

Function calls are stored on the stack. Each time a function is invoked, a "stack frame" is created, which holds the function’s local variables and some bookkeeping information.
Primitive values (like number, string, boolean, etc.) are stored directly on the stack, and they are copied when passed between functions. This is why changes to primitive values in one function do not affect those in another function.
When a function completes, its stack frame is destroyed, and control is returned to the calling function.
Example of stack:

```js
function calculateArea(radius) {
let area = Math.PI _ radius _ radius;
return area;
}

let result = calculateArea(5); // When this function is called, it goes onto the stack
In this case:
```

The calculateArea function is called and its stack frame is created.
The radius parameter and the area variable are stored in the stack.
Once the function returns the result, its stack frame is popped off. 2. Heap Memory
The heap is used to store objects, arrays, and functions. Unlike stack memory, which is more structured, the heap is a large pool of memory that is dynamically allocated at runtime.

Here’s how it works:

Objects (including arrays and functions) are stored in the heap, and only a reference to the object is stored on the stack.
When you create an object or an array, memory is allocated in the heap, and the variable on the stack holds the reference (pointer) to that memory location.
Unlike the stack, the heap is not automatically cleaned up when a function returns. Instead, garbage collection happens periodically in JavaScript to reclaim memory from objects that are no longer accessible.
Example of heap:

```js
function createPerson(name, age) {
  return { name: name, age: age }; // The object is created in heap memory
}

let person1 = createPerson("Alice", 30);
```

In this case:

The createPerson function creates an object in heap memory with name and age properties.
The variable person1 in the stack holds a reference (pointer) to the object in the heap.
Key Differences:
Memory Allocation:

Stack is used for primitives and function calls.
Heap is used for objects, arrays, and functions.
Memory Management:

Stack memory is automatically cleaned up when a function call finishes.
Heap memory requires garbage collection to reclaim space when objects are no longer in use.
Size and Performance:

Stack is usually much smaller in size and has faster access time.
Heap is larger, but access to it is slower due to the complexity of dynamically managing memory.
Summary:
Stack: Stores primitives and function calls. It’s fast but limited in size.
Heap: Stores objects, arrays, and functions. It's large but slower and requires garbage collection for cleanup.

Data types in javascript:

Primitive:

Type typeof return value Object wrapper
Null "object" N/A
Undefined "undefined" N/A
Boolean "boolean" Boolean
Number "number" Number
BigInt "bigint" BigInt
String "string" String
Symbol "symbol" Symbol
