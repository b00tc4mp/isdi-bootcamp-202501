require('./pop')
// Aqui testearemos nuestro metodo pop
console.info('TEST pop')
// Descripcion del primer caso que vamos a testear de pop
console.info('CASE delete the las element from an array with elements')

{
    const myFish = ['angel','clown','mandarin','sturgeon'];
    console.assert(myFish.pop() === 'sturgeon', 'myFish.pop() is sturgeon');
    console.assert(myFish[0] === 'angel', "myFish[0] is angel");
    console.assert(myFish[1] === 'clown', "myFish[1] is clown");
    console.assert(myFish[2] === 'mandarin', "myFish[2] is mandarin");
}

// console.info('CASE delete the las element from an empty array')

// {
//     const myFish = [];

//     console.assert(myFish.pop() === 'undefined', 'myFish.pop() is undefined');
// }