var value = -10

var prevState = { a: true, b: 30, c: 2 }
var newState = {
    ...prevState,
    [value > 5 ? 'b' : 'c']: value
}
console.log(newState)
// VM503:8 {a: true, b: 30, c: -10}


var n = [10, 20, 30]
n[value > 0 ? 1 : 2] = value
console.log(n)
// VM503:13 (3) [10, 20, -10]