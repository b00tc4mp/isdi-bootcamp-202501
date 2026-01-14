// simil

0 * 0
//0
1 * 0
//0
1 * 1
//1
0 * 1
//0

// case 1

function a() {
    var value = false

    console.log('a', value)

    return value
}

function b() {
    var value = false

    console.log('b', value)

    return value
}

console.log('a() && b()', a() && b())
// VM1850: 4 a false
// VM1850: 17 a() && b() false

// case 2

function a() {
    var value = true

    console.log('a', value)

    return value
}

function b() {
    var value = false

    console.log('b', value)

    return value
}

console.log('a() && b()', a() && b())
// VM1854:4 a true
// VM1854:12 b false
// VM1854:17 a() && b() false

// case 3

function a() {
    var value = true

    console.log('a', value)

    return value
}

function b() {
    var value = true

    console.log('b', value)

    return value
}

console.log('a() && b()', a() && b())
// VM1858: 4 a true
// VM1858: 12 b true
// VM1858: 17 a() && b() true

// case 4

function a() {
    var value = false

    console.log('a', value)

    return value
}

function b() {
    var value = true

    console.log('b', value)

    return value
}

console.log('a() && b()', a() && b())
// VM1865:4 a false
// VM1865:17 a() && b() false