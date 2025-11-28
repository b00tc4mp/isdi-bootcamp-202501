Array.prototype.push = function (element) {
    this[this.length] = element

    return this.length
}