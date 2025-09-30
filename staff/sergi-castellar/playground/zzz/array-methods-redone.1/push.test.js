delete Array.prototype.push

Array.prototype.push = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i]
    }
    return this.length
}

const characters = ['a', 'b', 'c', 'd', 'e']
characters.push('f', 'g')
console.log(characters)