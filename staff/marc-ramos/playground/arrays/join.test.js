const array = ['Spiderman', 'Ironman', 'Thor']

console.log(array.join())
// 'Spiderman,Ironman,Thor'

console.log(array.join(''))
// 'SpidermanIronmanThor'

console.log(array.join('-'))
// 'Spiderman-Ironman-Thor'


const array1 = [null]

console.log(array1.join()) // devolvera un string vacio
// ''


// .join() is used to return a string with all the array elements joined. The (separator) is used to separate the values with the string that we want. But we can only put one separator, if we put more than one value on the separator, only the first one is going to be joined between the elements. Examples: ('-'), (''), ('.'), ('a')
