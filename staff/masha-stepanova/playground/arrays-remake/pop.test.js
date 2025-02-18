require('./pop')

console.info('TEST pop')

console.info('CASE delete the las element from an array with elements')

{
    const vegetables = ['tomato', 'potato', 'carrot', 'eggplant', 'onion'];

    console.assert(vegetables.pop() === 'onion', 'vegetables.pop() is onion');
    console.assert(vegetables === Array['tomato', 'potato', 'carrot', 'eggplant'], "vegetables is Array ['tomato', 'potato', 'carrot', 'eggplant']");
}

console.info('CASE delete the las element from an empty array')

{
    const vegetables = [];

    console.assert(vegetables.pop() === 'undefined', 'vegetables.pop() is undefined');
}