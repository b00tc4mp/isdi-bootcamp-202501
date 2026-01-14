Array.prototype.splice = function (indexFrom, removeCount, ...element) {
    const removedElements = []
    const adjustedIndexFrom = indexFrom < 0 ? this.length + indexFrom : indexFrom

    if (element.length !== 0) {
        for (let i = adjustedIndexFrom; i < adjustedIndexFrom + removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            this[i] = element[i - adjustedIndexFrom]
        }
    } else {
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