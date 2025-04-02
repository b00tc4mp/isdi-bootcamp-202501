// #0

for (var i = 0; i < 3; i++)
    console.log(i)

console.log(i)
// VM1969:2 0
// VM1969:2 1
// VM1969:2 2
// VM1969:4 3

// #1

for (let i = 0; i < 3; i++)
    console.log(i)

console.log(i)
// VM2010:2 0
// VM2010:2 1
// VM2010:2 2
// VM2010:4 Uncaught ReferenceError: i is not defined
//     at <anonymous>:4:13

// #2

{
    var i = 10

    console.log(i)
}

console.log(i)
// VM2126: 4 10
// VM2126: 7 10

// #3

{
    let i = 10

    console.log(i)
}

console.log(i);
// VM2175:4 10
// VM2175:4 Uncaught ReferenceError: i is not defined
//     at <anonymous>:4:13

// #4

(function () {
    var i = 10

    console.log(i)
})() // IIFE

console.log(i)
// VM2408:4 10
// VM2408:7 Uncaught ReferenceError: i is not defined
//     at <anonymous>:7:13

// #5

for (let i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log('hello world', i)
    }, 1000 * i)
}

console.log(i)
// VM3078:7 Uncaught ReferenceError: i is not defined
//     at <anonymous>:7:13
// (anonymous) @ VM3078:7Understand this errorAI
// VM3078:3 hello world 0
// VM3078:3 hello world 1
// VM3078:3 hello world 2

// #6

for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log('hello world', i)
    }, 1000 * i)
}

console.log(i)
// VM4108:9 3
// undefined
// VM4108:5 hello world 3
// VM4108:5 hello world 3
// VM4108:5 hello world 3

// #7 (eq to #6)

var i

for (i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log('hello world', i)
    }, 1000 * i)
}

console.log(i)
// VM4108:9 3
// undefined
// VM4108:5 hello world 3
// VM4108:5 hello world 3
// VM4108:5 hello world 3

