require('./push')
// Aqui testearemos nuestro metodo pop
console.info('TEST push')
// Descripcion del primer caso que vamos a testear de pop
console.info('CASE add a elemnent on the end of an array')

{
    const myFish = ['angel','clown','mandarin','sturgeon'];
    console.assert(myFish.push('sword') === 5 , 'myFish.push() return length 5');
    console.assert(myFish[4] === 'sword', "myFish[4] is sword");
  
}

// console.info('CASE delete the las element from an empty array')

// {
//     const myFish = [];

//     console.assert(myFish.pop() === 'undefined', 'myFish.pop() is undefined');
// }