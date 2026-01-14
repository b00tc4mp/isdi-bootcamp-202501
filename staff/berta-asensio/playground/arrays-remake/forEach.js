// implementación FOR EACH

//CASE 4.iterate using a context argument

Array.prototype.forEach = function(callback, context) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        callback.call(context, element, i, this)
    }
  }