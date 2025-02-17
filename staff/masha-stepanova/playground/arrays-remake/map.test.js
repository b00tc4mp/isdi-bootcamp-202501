delete Array.prototype.map

Array.prototype.map = function (callback) {
    const modifiedArray = []

    for (let i = 0; i < this.length; i++) {
        modifiedArray[modifiedArray.length] = callback(this[i])
    }

    return modifiedArray
}

// creates new array with modified elements through callback function
// it modifies each element of an array but doesn't change the original array
// returns new array

const numbers = [2, 4, 6, 8, 10]

// Pass a function to map
const mapDivide = numbers.map((x) => x / 2)
const mapMultiply = numbers.map((x) => x * 2)

console.log(mapDivide)
// Expected output: Array [1, 2, 3, 4, 5]

console.log(mapMultiply)
// Expected output: Array [4, 8, 12, 16, 20]

console.log(numbers)