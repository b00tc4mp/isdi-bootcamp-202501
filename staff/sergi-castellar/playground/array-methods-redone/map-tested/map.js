Array.prototype.map = function (callback, context) {
    const mapped = []

    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        const result = callback.call(context, element, i, this)
        mapped[mapped.length] = result
    }

    return mapped
}