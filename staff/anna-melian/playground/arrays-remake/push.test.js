require('./push.js')

console.info('TEST push')


console.info('CASE return the new array length')

{
    const fruits = ['apple', 'banana', 'strawberry', 'watermelon']
    const count = fruits.push('kiwi')
    console.assert(fruits.length === 5, 'return correct length')
    //5
}



console.info('CASE add a string element at the end')
{
    const fruits = ['apple', 'banana', 'strawberry', 'watermelon']
    const count = fruits.push('kiwi')
    console.assert(fruits.length === 5, 'return correct length')
    console.assert(fruits[fruits.length - 1] === 'kiwi', 'add the element at the end')
    // fruits ['apple', 'banana', 'strawberry', 'watermelon', 'kiwi']
}

console.info('CASE merge arrays')

{
    const fruits = ['apple', 'banana', 'strawberry', 'watermelon']
    const vegetable = ['tomato', 'carrot', 'lettuce']
    fruits.push(...vegetable)

    for (let i = 0; i < vegetable.length; i++) {
        console.assert(fruits[4] === 'tomato', 'add tomato')
        console.assert(fruits[5] === 'carrot', 'add carrot')
        console.assert(fruits[6] === 'lettuce', 'add lettuce')
    }

    //console.log(fruits)
}

{
    const fruits = ['apple', 'banana', 'strawberry', 'watermelon']
    fruits.push()
    console.assert(fruits.length === 4, 'no modifications')
    console.assert(fruits[0] === 'apple', 'fruits[0] is appple')
    console.assert(fruits[1] === 'banana', 'fruits[1] is banana')
    console.assert(fruits[2] === 'strawberry', 'fruits[2] is strawberry')
    console.assert(fruits[3] === 'watermelon', 'fruits[3] is watermelon')
}