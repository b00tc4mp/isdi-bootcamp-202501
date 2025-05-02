Array.prototype.indexOf = function (searchIndex, fromIndex){
    
    if (fromIndex >= this.length || typeof searchIndex == 'string') {
        return -1;
    }

    let index = (fromIndex !== undefined) ? fromIndex : 0;

    if (index < 0){
        index += this.length;
    }
    for (; index < this.length; index++) {
        if (this[index] === searchIndex){
            return index;
        }
    }
    return -1;
}   