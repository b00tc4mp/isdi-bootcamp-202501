require('./join')

console.info('TEST join')

console.info('CASE join elements by comma')

{
    const wordHello = ['h', 'e', 'l', 'l', 'o']

    console.assert(wordHello.join() === 'h,e,l,l,o', 'wordHello.join() is h,e,l,l,o')
}

console.info('CASE join elements all together')

{
    const wordHello = ['h', 'e', 'l', 'l', 'o']

    console.assert(wordHello.join('') === 'hello', 'wordHello.join("") is hello')
}

console.info('CASE join elements by -')

{
    const wordHello = ['h', 'e', 'l', 'l', 'o']

    console.assert(wordHello.join('-') === 'h-e-l-l-o', 'wordHello.join("-") is h-e-l-l-o')
}
