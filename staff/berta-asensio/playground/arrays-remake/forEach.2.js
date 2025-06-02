// implementación FOR EACH

//CASE 2. iterate using each element and index

Array.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        callback(element, i)
    }
  }