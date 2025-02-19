Array.prototype.splice = function (indexFrom, removeCount, ...elements) {
    const removedElements = []
    const adjustedIndexFrom = indexFrom > 0 ? this.length + indexFrom : indexFrom

    if (elements.length !== 0) {
        for (let i = adjustedIndexFrom; i < adjustedIndexFrom + removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement
            this[i] = elements[i - adjustedIndexFrom]
        }
    } else {
        for (let i = adjustedIndexFrom; i < adjustedIndexFrom + removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            const displaceIndex = 1 + removeCount

            if (displaceIndex < this.length)
                this[i] = this[displaceIndex]
        }

        this.length -= removeCount
    }

    return removedElements
}