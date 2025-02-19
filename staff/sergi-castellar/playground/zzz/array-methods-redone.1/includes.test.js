delete Array.prototype.includes

Array.prototype.includes = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === element)
            return true
    }
    return false
}

const characters = ['a', 'b', 'c', 'd', 'e']
const result = characters.includes('e')
console.log(result)