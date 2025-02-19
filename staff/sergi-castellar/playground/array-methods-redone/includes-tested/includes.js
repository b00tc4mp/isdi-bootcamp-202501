Array.prototype.includes = function (searchElement, fromIndex) {
    let index = 0

    if (fromIndex) {
        if (fromIndex > 0) {
            if (fromIndex >= this.length) {
                return false
            } else if (fromIndex < this.length) {
                index = fromIndex
            }
        }
        else if (fromIndex < 0) {
            const difference = this.length + fromIndex
            if (difference <= 0) {
                index = 0
            } else if (difference > 0) {
                index = difference
            }
        }
    }

    const searchElementIsNaN = isNaN(searchElement)

    for (; index < this.length; index++) {
        const iterativeElement = this[index]

        if (iterativeElement === searchElement || (isNaN(iterativeElement) && searchElementIsNaN)) {
            return true
        }
    }
    return false
}