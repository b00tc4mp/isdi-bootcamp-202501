delete Array.prototype.push

Array.prototype.push = function (element) {
    this[this.length] = element

    return this.length
}

const characters = ['a', 'b']

const length = characters.push('c')
console.log(length)
// 3
console.log(characters)
// [a,b,c]