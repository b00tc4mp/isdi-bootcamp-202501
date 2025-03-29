// implementación FOR EACH

//1. CASE iterate using each element

Array.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        callback(element)
    }
  }