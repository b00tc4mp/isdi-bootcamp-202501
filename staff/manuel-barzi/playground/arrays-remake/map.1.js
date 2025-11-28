Array.prototype.map = function (callback) {
    const mapped = []

    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        const result = callback(element)

        mapped[i] = result
    }

    return mapped
}