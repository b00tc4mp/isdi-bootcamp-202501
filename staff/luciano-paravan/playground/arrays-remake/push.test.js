delete Array.prototype.push

Array.prototype.push = function (arguments) {
    /*
    insert the arguments at the end of the array
    */
    this[this.length] = arguments[i]

    return this.length
}

const characters = ['a', 'b']

const count = characters.push('c')
console.log(count)
// 3

console.log(characters)