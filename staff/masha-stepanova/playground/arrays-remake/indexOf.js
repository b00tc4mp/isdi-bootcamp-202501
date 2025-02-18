// search for the first index of an element
// returns the index or -1 if it doesn't exist
// in second position can include an index to start from

delete Array.prototype.indexOf

Array.prototype.indexOf = function (element, index) {
    let startIndex

    if (index)
        startIndex = index > -1 ? index : this.length + index
    else
        startIndex = 0

    if (startIndex < 0)
        startIndex = 0

    for (let i = startIndex; i < this.length; i++) {
        if (element === this[i] && element !== undefined)
            return i
    }

    return -1
}