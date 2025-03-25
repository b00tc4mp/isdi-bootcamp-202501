console.info('TEST splice')

console.info('CASE quita 1 elemento del index 2, y inserta trumpet')

{

const myFish = ['angel', 'clown', 'drum', 'sturgeon'] 
const removed = myFish.splice(2, 1, 'trumpet')

console.assert(myFish.length === 4, 'myFish is 4')
console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
console.assert(myFish[1] === 'clown', 'myFish[1] is clown')
console.assert(myFish[2] === 'trumpet', 'myFish[2] is trumpet')
console.assert(myFish[3] === 'sturgeon', 'myFish[3] is sturgeon')

console.assert(removed.length === 1, 'removed is 1')
console.assert(removed[0] === 'drum', 'removed is drum')

}