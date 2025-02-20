Array.prototype.pop = function() {
    if (this.length === 0) return undefined

    const lastElement = this[this.length - 1]
    this.length -= 1

    return lastElement
}

/*
const array = [1, 2, 3, 4]

console.log(array.pop())
*/