// increment after

var i = 0
console.log(i++)
// 0

// increment before

var i = 0
console.log(++i)
// 1


// managing a pseudo-array

var a = [100, 200, 300]
a[a.length] = 400
console.log(a)
// (4)[100, 200, 300, 400]0: 1001: 2002: 3003: 400length: 4[[Prototype]]: Array(0)


var a = { 0: 100, 1: 200, 2: 300, length: 3 } // pseudo-array
// a[a.length] = 400
// a.length++
a[a.length++] = 400
console.log(a)
// { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }