Array.prototype.includes = function (searchElement, fromIndex) {
    let index
    const arrayLength = this.length
    let found = false

    if (typeof fromIndex === 'number') {
        if (fromIndex >= arrayLength) {
            return false
        }
        if (fromIndex < 0) {
            index = arrayLength + fromIndex
        } else {
            index = fromIndex
        }

    } else {
        index = 0
    }

    for (index; index < arrayLength; index++) {
        const currentElement = this[index]
        if (!Number.isNaN(currentElement)) {
            if (currentElement === searchElement) {
                found = true
            }
        } else {
            if (Number.isNaN(searchElement)) {
                found = true
            }
        }
    }

    return found

}