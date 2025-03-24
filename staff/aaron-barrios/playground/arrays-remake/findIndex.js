Array.prototype.findIndex = function (callback, context) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        const result = callback.call(context, element, i, this)

        if (result)
            return i
    }

    return -1
}