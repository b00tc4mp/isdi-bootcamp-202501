Array.prototype.reduce = function (callback, initialValue){
    let accumulator
    let index = 0;

    if (this.length === 0 && initialValue === undefined) {
        throw new TypeError('Array is empty');
    }

    if (initialValue === undefined){
        accumulator = this[0]
        index = 1;
    }else{
        accumulator = initialValue;
    }

    for (; index < this.length; index++) {
        const element = this[index];
        
        accumulator = callback(accumulator, element, index,this)
    }

    return accumulator;
}