Array.prototype.find = function (callback, argument) {
    for (let i = 0; i < this.length; i++) {
        const currentValue = this[i]

        const result = callback.call(argument, currentValue, i, this)

        if (result) return currentValue
    }

    return undefined
}