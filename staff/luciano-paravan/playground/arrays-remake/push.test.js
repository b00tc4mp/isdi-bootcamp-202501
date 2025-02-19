delete Array.prototype.push

Array.prototype.push = function (element) {
    /*
    insert the element at the end of the array
    */
    this[this.length] = element

    return this.length
}

const characters = ['a', 'b']

const count = characters.push('c')
console.log(count)
// 3

console.log(characters)