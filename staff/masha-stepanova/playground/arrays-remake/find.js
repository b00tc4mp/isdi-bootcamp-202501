Array.prototype.find = function (callback, context) {
    let foundElement

    for (let i = 0; i < this.length; i++) {
        const currentElement = this[i]


        if (callback.call(context, currentElement, i, this)) {
            foundElement = currentElement
            break
        }
    }

    return foundElement
}