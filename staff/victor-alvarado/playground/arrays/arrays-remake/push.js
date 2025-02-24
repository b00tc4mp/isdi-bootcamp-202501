Array.prototype.push = function (element) {
    if (arguments.length === 1)
        this[this.length] = element
    else
        for (let i = 0; i < arguments.length; i++) {
            const argument = arguments[i]

            this[this.length] = argument
        }


    return this.length
}