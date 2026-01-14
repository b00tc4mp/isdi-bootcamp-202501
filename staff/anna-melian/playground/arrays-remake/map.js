Array.prototype.map = function (callbackFn, thisArg) {
    let newArray = []
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        newArray[newArray.length] = callbackFn.call(thisArg, element, i, this)
    }
    return newArray
}

