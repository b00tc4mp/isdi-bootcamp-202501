delete Array.prototype.join

Array.prototype.join = function (element) {
    let joinedString = ''
    let separator
    if (!arguments[0]) {
        separator = ','
    } else {
        separator = element
    }
    for (let i = 0; i < this.length; i++) {
        if (i === 0)
            joinedString += this[i]
        else
            joinedString += (separator + this[i])
    }

    return joinedString
}

// creates new string with joined by specified separator elements of an array
// if separator isn't specified, it joins elements by coma
// returns new string
// doesn't modify original array

const wordHello = ['h', 'e', 'l', 'l', 'o']

console.log(wordHello.join())
// Expected output: "h,e,l,l,o"

console.log(wordHello.join(''))
// Expected output: "hello"

console.log(wordHello.join('-'))
// Expected output: "h-e-l-l-o"

console.log(wordHello)
