# Javascript

![js logo](https://imgs.search.brave.com/FR7MuA8olc09dBXxVLfdhq_B-oIO_adj1UsYi8JKcLQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d29ybGR2ZWN0b3Js/b2dvLmNvbS9sb2dv/cy9sb2dvLWphdmFz/Y3JpcHQuc3Zn)

## Methods

### .includes()

Checks if an array contains a specific element.

Syntax:

```sh
array.includes(element, startIndex)
```

Example:

```sh
const fruits = ['apple', 'orange', 'pear'];
console.log(fruits.includes('orange')); // true
console.log(fruits.includes('strawberry')); // false
```

### .push

Adds one or more elements to the end of an array.

Syntax:

```sh
array.push(element1, element2, ...)
```

Example:

```sh
const numbers = [1, 2, 3];
numbers.push(4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]
```

### .pop()

Removes and returns the last element from an array.

Syntax:

```sh
array.pop()
```

Example:

```sh
const numbers = [1, 2, 3];
const removed = numbers.pop();
console.log(removed); // 3
console.log(numbers); // [1, 2]
```

### .unshift()

Adds one or more elements to the beginning of an array.

Syntax:

```sh
array.unshift(element1, element2, ...)
```

Example:

```sh
const numbers = [2, 3, 4];
numbers.unshift(0, 1);
console.log(numbers); // [0, 1, 2, 3, 4]
```

### .shift()

Removes and returns the first element from an array.

Syntax:

```sh
array.shift()
```

Example:

```sh
const numbers = [1, 2, 3];
const removed = numbers.shift();
console.log(removed); // 1
console.log(numbers); // [2, 3]
```

### .concat()

Combines two or more arrays into one.

Syntax:

```sh
array.concat(array2, array3, ...)
```

Example:

```sh
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]
```

### .splice()

Adds, removes, or replaces elements in an array at a specific index.

Syntax:

```sh
array.splice(startIndex, deleteCount, element1, element2, ...)
```

Example:

- Add elements

```sh
const numbers = [1, 2, 5];
numbers.splice(2, 0, 3, 4); // At index 2, add 3 and 4.
console.log(numbers); // [1, 2, 3, 4, 5]
```

- Remove elements

```sh
const fruits = ['apple', 'pear', 'orange'];
fruits.splice(1, 1); // At index 1, remove 1 element.
console.log(fruits); // ['apple', 'orange']
```

### .forEach()

Executes a callback function for each array element.

Syntax:

```sh
array.forEach(callbackFunction(element, index, array))
```

Example:

```sh
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num * 2)); // 2, 4, 6
```

### .map()

Creates a new array with the results of calling a function on every element.

Syntax:

```sh
array.map(callbackFunction(element, index, array))
```

Example:

```sh
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
```

### .filter()

Creates a new array with all elements that pass the test in the provided function.

Syntax:

```sh
array.filter(callbackFunction(element, index, array))
```

Example:

```sh
const numbers = [1, 2, 3, 4];
const even = numbers.filter(num => num % 2 === 0);
console.log(even); // [2, 4]
```

### .find()

Returns the first element that matches a condition in the callback function.

Syntax:

```sh
array.find(callbackFunction(element, index, array))
```

Example:

```sh
const users = [
  { id: 1, name: 'Luciano' },
  { id: 2, name: 'Maria' },
];
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Maria' }
```

### .some()

Tests if at least one element in the array passes the condition.

Syntax:

```sh
array.some(callbackFunction(element, index, array))
```

Example:

```sh
const numbers = [1, 3, 5];
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // false
```

### .every()

Tests if all elements in the array pass the condition.

Syntax:

```sh
array.every(callbackFunction(element, index, array))
```

Example:

```sh
const numbers = [2, 4, 6];
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true
```

### .sort()

Sorts the elements of an array in place.

Syntax:

```sh
array.sort(compareFunction(a, b))
```

Example:

```sh
const numbers = [4, 2, 5, 1];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 4, 5]
```

### .reduce()

Reduces an array to a single value by executing a reducer function on each element.

Syntax:

```sh
array.reduce(callbackFunction(accumulator, element, index, array), initialValue)
```

Example:

```sh
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10
```

## Stack & Heap