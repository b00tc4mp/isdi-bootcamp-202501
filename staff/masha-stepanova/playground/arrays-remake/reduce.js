Array.prototype.reduce = function (callback) {
    let accumulator

    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        accumulator += callback(context, element, i, this)
    }
}