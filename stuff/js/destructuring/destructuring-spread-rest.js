// destructuring an oject

{
    const o = { name: 'Oswald', age: 30, 0: 100, 1: 200, length: 2 }

    /*
    //const name = o.name
    const name = o['name']
    const age = o.age
    //const zero = o['0']
    const zero = o[0]
    const one = o[1]
    const length = o.length
    */

    const { name, age, 0: zero, 1: one, length } = o
    console.log(name, age, zero, one, length)
}

// destructuring an array

{
    const a = [10, 20, 30]

    const { 0: zero, 1: one, 2: two, length } = a

    console.log(zero, one, two, length)
}

{
    const a = [10, 20, 30]

    const [zero, one, two] = a

    console.log(zero, one, two)
}

{
    const a = [10, 20, 30]

    const [, , two] = a

    console.log(two)
}

{
    const a = [10, 20, 30, 40, 50]

    const [zero, one, ...rest] = a

    console.log(zero, one, rest)
}

// other cases

// from array to object

{
    const a = [10, 20, 30, 40, 50]

    const o = { ...a, length: a.length }

    console.log(o)
}

// from object to array

/*
// FAIL
{
    const o = {0: 10, 1: 20, 2: 30, 3: 40, 4: 50, length: 5}
    
    const a = [...o]

    console.log(a)
}
*/

// from array to array

{
    var a = [10, 20, 30, 40, 50]

    var b = [...a, 60]

    console.log(b)
}

// from array to object

{
    var a = [10, 20, 30, 40, 50]

    var b = { ...a, 2: 300 }

    console.log(b)
}