Array.prototype.join = function (symbol) {
    let separator
    if (!symbol && symbol !== '')
        separator = ','
    else
        separator = symbol

    let string = ''
    for (let i = 0; i < this.length; i++) {
        if (!this[i]) {
            if (i !== this.length - 1)
                string += '' + separator
            else
                string += ''
        } else {
            if (i !== this.length - 1)
                string += this[i] + separator
            else
                string += this[i]
        }
    }
    return string
}