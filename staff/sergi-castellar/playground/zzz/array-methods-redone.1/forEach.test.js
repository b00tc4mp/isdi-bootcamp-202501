delete Array.prototype.forEach

Array.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i])
    }
}

const characters = ['a', 'b', 'c', 'd', 'e']
const result = characters.forEach(element => console.log(element))
console.log(result)