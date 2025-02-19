Array.prototype.splice = function (indexFrom, removeCount, ...elements) {
    const removedElements = []

    //DEFENSIVE PROGRAMMING


    for (let i = indexFrom; i < indexFrom + removeCount; i++) {
        const currentElement = this[i]

        removedElements.push(currentElement)

        this[i] = elements[i - indexFrom]
    }
}

var array = ["ant", "bison", "camel", "duck", "elephant"]
var b = function (indexFrom, deleteCount, ...elements) {
    const removedElements = []

    //DEFENSIVE PROGRAMMING
    if (indexFrom >= array.length || arguments.length === 0) {
        return removedElements
    }

    // --- CASE 1 ARGUMENT ----
    if (arguments.length === 1) {
        if (fromIndex >= 0) {
            for (let i = fromIndex; i < fromIndex + deleteCount; i++) {
                const currentElement = array[i]

                removedElements.push(currentElement)

                array[i] = elements[i - indexFrom]
            }
        }
    }
}
// b(3)
array.splice(0)