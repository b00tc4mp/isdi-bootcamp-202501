const Bonsay = require('./Bonsay.js')

Bonsay.prototype.push = function (element) {
    if (arguments.length === 1) {
        this[this.length] = element
        this.length++
    } else
        for (let i = 0; i < arguments.length; i++) {
            const argument = arguments[i]

            this[this.length] = argument
            this.length++
        }


    return this.length
}