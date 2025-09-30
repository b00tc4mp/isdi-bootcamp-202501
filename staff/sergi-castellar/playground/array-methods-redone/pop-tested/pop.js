Array.prototype.pop = function () {
    const element = this[this.length - 1]
    if (this.length > 0)
        this.length -= 1
    return element

}