// creates new string with joined by specified separator elements of an array
// if separator isn't specified, it joins elements by coma
// returns new string
// doesn't modify original array

delete Array.prototype.join

Array.prototype.join = function (element) {
    let joinedString = ''
    let separator
    if (!element && element !== '') {
        separator = ','
    } else {
        separator = element
    }
    for (let i = 0; i < this.length; i++) {
        if (i === 0)
            joinedString += this[i]
        else
            joinedString += separator + this[i]
    }

    return joinedString
}
