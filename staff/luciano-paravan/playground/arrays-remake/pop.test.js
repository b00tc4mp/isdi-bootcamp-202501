delete Array.prototype.pop

Array.prototype.pop = function () {
    lastElement = this[this.length - 1]
    newArray = []

    for (let i = 0; i < this.length - 1; i++) {
        newArray[i] = this[i]
    }
    characters = newArray

    return lastElement
}


const characters = ['a', 'b', 'c', 'd']

const lastElement = characters.pop()

console.log(lastElement)
// d

console.log(characters)
// ['a', 'b', 'c']