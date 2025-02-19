delete Array.prototype.forEach

Array.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]

        callback(element)
    }
}

const characters = ['a', 'b', 'c']

characters.forEach(element => console.log(element))

// a
// b
// c 