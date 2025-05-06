// search the element in the array
// returns true or false

delete Array.prototype.includes

Array.prototype.includes = function (element, index) {
    let startIndex

    if (index)
        startIndex = index > -1 ? index : this.length + index
    else
        startIndex = 0

    if (startIndex < 0)
        startIndex = 0

    for (let i = startIndex; i < this.length; i++) {
        const currentElement = this[i]

        if (element === currentElement || isNaN(element) && isNaN(currentElement))
            return true
    }

    return false
}