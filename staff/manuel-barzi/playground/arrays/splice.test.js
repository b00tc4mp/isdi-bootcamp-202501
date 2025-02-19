console.info('TEST splice')

console.info('CASE remove 1 element at index 2, and insert trumpet')

{
    const myFish = ['angel', 'clown', 'drum', 'sturgeon']
    const removed = myFish.splice(2, 1, 'trumpet')

    // console.log(myFish)
    // myFish is ['angel', 'clown', 'trumpet', 'sturgeon']
    console.assert(myFish.length === 4, 'myFish.length is 4')
    console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
    console.assert(myFish[1] === 'clown', 'myFish[1] is clown')
    console.assert(myFish[2] === 'trumpet', 'myFish[2] is trumpet')
    console.assert(myFish[3] === 'sturgeon', 'myFish[3] is sturgeon')
    // console.log(removed)
    // removed is ['drum']
    console.assert(removed.length === 1, 'removed.length is 1')
    console.assert(removed[0] === 'drum', 'removed[0] is drum')
}

console.info('CASE remove 2 elements at index 1, and insert trumpet')

{
    const myFish = ['angel', 'clown', 'drum', 'sturgeon']
    const removed = myFish.splice(1, 2, 'trumpet', 'clarinet')

    console.assert(myFish.length === 4, 'myFish.length is 4')
    console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
    console.assert(myFish[1] === 'trumpet', 'myFish[1] is trumpet')
    console.assert(myFish[2] === 'clarinet', 'myFish[2] is clarinet')
    console.assert(myFish[3] === 'sturgeon', 'myFish[3] is sturgeon')

    console.assert(removed.length === 2, 'removed.length is 2')
    console.assert(removed[0] === 'clown', 'removed[0] is clown')
    console.assert(removed[1] === 'drum', 'removed[1] is drum')
}