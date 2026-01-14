// removes the last element from an array
// return deleted element

delete Array.prototype.pop

Array.prototype.pop = function () {
    const lastElement = this[this.length - 1]

    if (!this[this.length])
        this.length = this.length - 1

    return lastElement
}