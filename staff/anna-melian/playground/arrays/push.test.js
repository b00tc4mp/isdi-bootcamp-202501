// adds elements to the end of an array
// returns length of new array


const fruits = ['apple', 'banana', 'strawberry', 'watermelon']

const count = fruits.push('kiwi')
console.log(count)
// 4
console.log(fruits)
// fruits ['apple', 'banana', 'strawberry', 'watermelon']

fruits.push('melon', 'blueberry')
console.log(fruits)
// fruits ['apple', 'banana', 'strawberry', 'watermelon', 'melon', 'blueberry']