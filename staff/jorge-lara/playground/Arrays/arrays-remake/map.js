Array.prototype.map = function (callback, arg) {
    let newArray = [];

    for (let i = 0; i < this.length; i++) {
        newArray[i] = callback.call(arg, this[i], this);
    }
    
    return newArray;
}