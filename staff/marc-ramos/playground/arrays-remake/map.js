Array.prototype.map = function(callback, context) {
    const newArray = []

    for (let i = 0; i < this.length; i++) {
        const element = this[i] 

        const result = callback.call(context, element, i, this)

        newArray[i] = result
    }

    return newArray
}