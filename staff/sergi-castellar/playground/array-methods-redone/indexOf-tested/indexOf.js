Array.prototype.includes = function (searchElement, fromIndex) {
    let index = 0

    if (fromIndex) {
        if (fromIndex > 0) {
            if (fromIndex >= this.length) {
                return -1
            } else if (fromIndex < this.length) {
                index = fromIndex
            }
        }
        else if (fromIndex < 0) {
            const difference = this.length + fromIndex
            if (difference < 0) {
                index = 0
            } else if (difference > 0) {
                index = difference
            }
        }
    }

    for (; index < this.length; index++) {
        if (this[index] === searchElement)
            return index
    }
    return -1
}