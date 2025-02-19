Array.prototype.indexOf = function (searchElement, fromIndex) {
    let index
    let arrayLength = this.length

    if (typeof fromIndex === 'number') {
        if (fromIndex >= arrayLength || fromIndex < - arrayLength) {
            return -1
        }
        if (fromIndex < 0) {
            index = arrayLength + fromIndex
        } else {
            index = fromIndex
        }

    } else {
        index = 0
    }

    if (searchElement === '' || Number.isNaN(searchElement) || searchElement === undefined)
        return -1

    let found = false
    let result = -1
    for (index; index < arrayLength; index++) {
        let actualElement = this[index]
        if (searchElement === actualElement) {
            found = true
            result === -1 ? result = index : result += ',' + index

        }
    }
    if (found) {
        return result
    } else {
        return result
    }
}