// implementación FOR EACH

//CASE 3.iterate using each index and array

Array.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        callback(element, i, this)
    }
  }