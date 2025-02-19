Array.prototype.splice = function (indexFrom, removeCount, ...elements) {
    const removedElements = []

    if (elements.length !== 0) {
        const adjustedIndexFrom = indexFrom < 0 ? this.length + indexFrom : indexFrom

        for (let i = adjustedIndexFrom; i < adjustedIndexFrom + removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            this[i] = elements[i - adjustedIndexFrom]
        }
    } else {
        const adjustedIndexFrom = indexFrom < 0 ? this.length + indexFrom : indexFrom

        for (let i = adjustedIndexFrom; i < adjustedIndexFrom + removeCount; i++) {
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