// creates new array with modified elements through callback function
// it modifies each element of an array but doesn't change the original array
// returns new array

delete Array.prototype.map

Array.prototype.map = function (callback, context) {
    const modifiedArray = []

    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        result = callback.call(context, element, i, this)

        modifiedArray[i] = result
    }

    return modifiedArray
}