# JS cheat code

## var
declares a variable that can be re-written and includes hosting
```sh
var name = 'Masha'
```

## let
declares variable with mutable value but cannot be re-written by its name and doesn't include hosting
```sh
let num = 2
```

## const
declares a variable with non-mutual value, doesn't include hosting
```sh
const surname = 'Stepanova'
```

## concat
concatenates two or more elements and returns the result.
```sh
concat(name, surname)
```

## array []
type of variable that contains a list of elements
```sh
let array = [1, 'pig', 25, [1, 2, 3]]
```

## array[i]
index of the array, always starting from 0 and mutable (you can reasign its value)
```sh
let animal = array[1]
```

## array.push()
method for adding elements to the end of an array, it returns the length of modified array
```sh
array.push(3, 2, 1)
```

## array.unshift()
method for adding elements to the beginnig of an array, it returns the length of modified array
```sh
array.unshift(0, 1)
```

## array.pop()
method for eliminate the last element from an array
```sh
array.pop()
```

## array.shift()
method for eliminate the first element from the array
```sh
array.shift()
```

## function name(properties) {}
keyword that can be used to define a function inside an expression
```sh
const multiply = function (width, height) {
  return width * height;
};
```

## array.flat()
method that creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
```sh
const arr2 = [0, 1, [2, [3, [4, 5]]]];
arr2.flat(Infinity)
```

## array.includes()
method for iterating through an array and searching for coincidence with the element, returns true or false
```sh
array.includes('abc')
```

## array.slice()
method to copy the array or extract some elements to the new array, returns a new array
```sh
array.slice(i, 8)
```

## array.splice()
method to eliminate consecutive elements from an array starting on indicated index, also letting you to add elements on the place of the removed elements
```sh
array.splice(i, 2, 13, 'april')
```

## array.indexOf()
method to find the index of an element, returns index or -1 if it isn't there
```sh
array.indexOf('pig')
```

## array.map()
method that iterates through each element of the array and passes it through callback function, returns an array of modificated elements
```sh 
array.map( funcion(elemet) => element + 2)
```

## array.filter()
method that iterates through each element of the array and passes it through callback function that is a condition, returns an array of truthy elements
```sh
array.filter( function(element) => element % 2 === 0)
```

## array.reduce()
method that iterates through each element of the array and passes it through callback function and accumulates its result, returns an acummulator value
```sh
array.reduce((accumulator, element) => element + accumulator)
```



