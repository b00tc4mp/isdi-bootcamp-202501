Array.prototype.splice = function (indexFrom, removeCount, ...elements) {
    const removedElements = []

    if (elements.length !== 0) {
        for (let i = indexFrom; i < indexFrom + removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            this[i] = elements[i - indexFrom]
        }
    } else {
        for (let i = indexFrom; i < indexFrom + removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            const displaceIndex = i + removeCount

            if (displaceIndex < this.length)
                this[i] = this[displaceIndex]
        }

        this.length -= removeCount
    }

    return removedElements
}