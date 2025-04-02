// simil

0 + 0
//0

1 + 0
//1

1 + 1
//1

0 + 1
//1

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

console.log('a() || b()', a() || b())
// VM1910: 4 a false
// VM1910: 12 b false
// VM1910: 17 a() || b() false

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

console.log('a() || b()', a() || b())
// VM1912:4 a true
// VM1912:17 a() || b() true

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

console.log('a() || b()', a() || b())
// VM1914:4 a true
// VM1914:17 a() || b() true

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

console.log('a() || b()', a() || b())
// VM1916:4 a false
// VM1916:12 b true
// VM1916:17 a() || b() true