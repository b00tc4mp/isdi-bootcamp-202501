Array.prototype.pop = function () {
    if (this.length === 0) {
        return undefined
    }

    let removeElement
    const indexLastElement = this.length - 1
    removeElement = this[indexLastElement]


    this.length = indexLastElement //ignoras el ultimo elemento al declarar la length

    return removeElement

}