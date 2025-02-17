delete Array.prototype.includes

Array.prototype.includes = function (element) {
    let found = false
    for (let i = 0; i < this.length; i++) {
        if (this[i] === element)
            return found = true
    }
    return found
}

const characters = ['a', 'b', 'c', 'd', 'e']
const result = characters.includes('e')
console.log(result)