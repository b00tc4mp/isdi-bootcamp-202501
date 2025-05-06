Array.prototype.reduce = function (callback, initialValue) {
    let accumulator = initialValue
    let startIndex = 0

    if (initialValue === undefined) {
        accumulator = this[0]
        startIndex = 1
    }

    for (let i = startIndex; i < this.length; i++) {
        const element = this[i]

        accumulator = callback(accumulator, element, i, this)
    }

    return accumulator
}