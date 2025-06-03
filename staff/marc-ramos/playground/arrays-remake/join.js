Array.prototype.join = function(separator = ',') {
    let result = ''
    
    for (let i = 0; i < this.length; i++) {
        result += this[i]

        if (i < this.length - 1){
            result += separator
        }
    }

    return result
}

/*
const array = ['a', 'b', 'c']

console.log(array.join(' '))
*/