// creates new array with modified elements through callback function
// it modifies each element of an array but doesn't change the original array
// returns new array

delete Array.prototype.map

Array.prototype.map = function (callback, context) {
    const modifiedArray = []

    for (let i = 0; i < this.length; i++) {
        modifiedArray[modifiedArray.length] = callback.call(context, this[i], i, this)
    }

    return modifiedArray
}