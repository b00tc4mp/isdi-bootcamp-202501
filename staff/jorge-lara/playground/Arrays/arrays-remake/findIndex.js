Array.prototype.findIndex = function(callback, thisArg) {

    for (let i = 0; i < this.length; i++) {
      let element = this[i];
      if (callback.call(thisArg, element, i, this)) {
        return i;
      }
    }
    return -1;
    
  };