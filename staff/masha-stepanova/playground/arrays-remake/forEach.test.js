delete Array.prototype.forEach

Array.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++)
        callback(this[i])
}

// applies callback to each element of an array
// doesn't return anything - 'undefined'

const array1 = ['a', 'b', 'c']

array1.forEach((element) => console.log(element += '1'))

// Expected output: 'a1'
// Expected output: 'b1'
// Expected output: 'c1'
console.log(array1)