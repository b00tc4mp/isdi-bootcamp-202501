Array.prototype.join = function (separator) {
    let stringArray = ''
    const arrayLength = this.length

    if (arrayLength === 0) {
        return stringArray
    }
    if (arrayLength === 1) {
        stringArray = this[0]
    }

    if (separator || separator === '') {
        for (let i = 0; i < arrayLength; i++) {
            let currentElement = this[i]
            if (currentElement === undefined || currentElement === null) {
                currentElement = ''
            }
            stringArray.length === 0 ? stringArray += currentElement : stringArray += separator + currentElement
        }
    } else {
        for (let i = 0; i < arrayLength; i++) {
            let currentElement = this[i]
            if (currentElement === undefined || currentElement === null) {
                currentElement = ''
            }
            stringArray.length === 0 ? stringArray += currentElement : stringArray += ',' + currentElement
        }
    }

    return stringArray
}