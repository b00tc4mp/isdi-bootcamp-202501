# Java Script

## Declare variables
- ### let 
You can declare a variable with let. This type of declaration is re-assignable.
```sh
let name;
```
- ### const
This type of declaration is used if you dont want to modify the value 
```sh
const name;
```
- ### var
This declarations is not he most used because is a globally scoped
```sh
var name;
```

## Arrays

### Create an array
```sh
var numbers = [1,2,3,4];
```

## Array methods
### **pop():**
Remove the last element of an array
```sh
let numbers = [1,2,3,4]
numbers.pop();
>[1,2,3]
```

## **push():**
Add new element to the end
```sh
let numbers = [1,2,3]
numbers.push(4);
>[1,2,3,4]
```

## **map():**
Creates a new array populated with the results of calling a provided function on every element in the calling array.
```sh
let numbers = [1,2,3]
const map1= numbers.map((x) => x * 2);
console.log(map1);
>[2,4,6]
```

## **reduce():**
Executes a reducer function on each element of the array, resulting in a single output value.
```sh
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((acc, curr) => acc + curr);
console.log(sum);
>10
```

## **filter():**
Creates a new array with all elements that pass the test implemented by the provided function.
```sh
let numbers = [1, 2, 3, 4, 5];
let newArr = numbers.filter(element => element % 2 === 0);
console.log(newArr);
>[2, 4]
```