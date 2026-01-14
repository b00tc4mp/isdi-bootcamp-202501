Array.prototype.find = function (callback, context) {
    let returnedElement

    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        const result = callback.call(context, element, i, this)

        if (result) {
            returnedElement = element
            break
        }
    }

    return returnedElement
}