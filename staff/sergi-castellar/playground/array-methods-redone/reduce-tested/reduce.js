Array.prototype.reduce = function (callback, initialValue) {
    let accumulator
    let i

    if (initialValue !== undefined) {
        accumulator = initialValue
        i = 0
    }
    else {
        accumulator = this[0]
        i = 1
    }

    for (; i < this.length; i++) {
        const currentValue = this[i]
        accumulator = callback(accumulator, currentValue, i, this)
    }

    return accumulator
}