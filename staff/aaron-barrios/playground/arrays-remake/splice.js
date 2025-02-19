Array.prototype.splice = function (indexFrom, removeCount, ...elements) {
    const removedElements = []

    for (let i = indexFrom; i < indexFrom + removeCount; i++) {
        const currentElement = this[i]

        removedElements.push(currentElement)

        this[i] = elements[i - indexFrom]
    }
}