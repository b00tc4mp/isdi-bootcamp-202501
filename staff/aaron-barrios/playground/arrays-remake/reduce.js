Array.prototype.reduce = function (callback, initialValue) {
    let accumulator
    let i

    if (initialValue === undefined) {
        accumulator = this[0]
        i = 1
    } else {
        accumulator = initialValue
        i = 0
    }

    for (; i < this.length; i++) {
        const element = this[i]

        accumulator = callback(element, accumulator, currentIndex, this)
    }

    return accumulator
}