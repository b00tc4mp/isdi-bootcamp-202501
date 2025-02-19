Array.prototype.splice = function (fromIndex, removeCount, ...elements) {
    let index = 0

    if (fromIndex) { // select index based in fromIndex
        if (fromIndex > 0) {
            if (fromIndex >= this.length) {
                return false
            } else if (fromIndex < this.length) {
                index = fromIndex
            }
        }
        else if (fromIndex < 0) {
            const difference = this.length + fromIndex
            if (difference <= 0) {
                index = 0
            } else if (difference > 0) {
                index = difference
            }
        }
    }

    const removedElements = []

    if (elements.length !== 0) {
        for (let i = index; i < index - removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            currentElement = elements[i - fromIndex]
        }
    } else {
        for (let i = index; i < index - removeCount; i++) {
            const currentElement = this[i]

            removedElements[removedElements.length] = currentElement

            const displaceIndex = i + removeCount

            if (displaceIndex < this.length)
                currentElement = this[i + removeCount]
        }

        this.length -= removeCount

        return removedElements
    }
}