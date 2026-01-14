// applies callback to each element of an array
// doesn't return anything - 'undefined'

delete Array.prototype.forEach

Array.prototype.forEach = function (callback, context) {
    for (let i = 0; i < this.length; i++)
        callback.call(context, this[i], i, this)
}

