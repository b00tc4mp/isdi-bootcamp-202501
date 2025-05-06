require('./splice')

console.info('TEST splice')

console.info('CASE Remove 1 element starting at index 2, and insert "trumpet"')


{
    const myFish = ['angel', 'clown', 'drum', 'sturgeon']
    const removed = myFish.splice(2, 1, 'trumpet')

    console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
    console.assert(myFish[1] === 'clown', 'myFish[1] is clown')
    console.assert(myFish[2] === 'trumpet', 'myFish[2] is trumpet')
    console.assert(myFish[3] === 'sturgeon', 'myFish[3] is sturgeon')
    console.assert(myFish.length === 4, 'myFish.length is 4')

    console.assert(removed.length === 1, 'removed.length is 1')
    console.assert(removed[0] === 'drum', 'removed[0] is drum')
}

console.info('CASE Remove 1 element starting at index 2, and insert "trumpet"')

{
    const myFish = ['angel', 'clown', 'drum', 'sturgeon']
    const removed = myFish.splice(2, 1, 'trumpet')

    console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
    console.assert(myFish[1] === 'trumpet', 'myFish[1] is trumpet')
    console.assert(myFish[2] === 'clarinet', 'myFish[2] is clarinet')
    console.assert(myFish[3] === 'sturgeon', 'myFish[3] is sturgeon')
    console.assert(myFish.length === 4, 'myFish.length is 4')

    console.assert(removed.length === 2, 'removed.length is 2')
    console.assert(removed[0] === 'clown', 'removed[0] is clown')
    console.assert(removed[1] === 'drum', 'removed[1] is drum')
}

console.info('CASE Remove 1 element starting at index 2')

{
    const myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']
    const removed = myFish.splice(2, 2)

    console.assert(myFish[0] === 'parrot', 'myFish[0] is parrot')
    console.assert(myFish[1] === 'anemone', 'myFish[1] is anemone')
    console.assert(myFish[2] === 'sturgeon', 'myFish[2] is sturgeon')
    console.assert(myFish.length === 3, 'myFish.length is 3')

    console.assert(removed.length === 2, 'removed.length is 2')
    console.assert(removed[0] === 'blue', 'removed[0] is blue')
    console.assert(removed[1] === 'trumpet', 'removed[1] is trumpet')
}

console.info('CASE Remove 3 elements starting at index 1')

{
    const myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']
    const removed = myFish.splice(1, 3)

    console.assert(myFish[0] === 'parrot', 'myFish[0] is parrot')
    console.assert(myFish[1] === 'sturgeon', 'myFish[1] is sturgeon')
    console.assert(myFish.length === 2, 'myFish.length is 2')

    console.assert(removed.length === 3, 'removed.length is 3')
    console.assert(removed[0] === 'anemone', 'removed[0] is anemone')
    console.assert(removed[1] === 'blue', 'removed[1] is blue')
    console.assert(removed[2] === 'trumpet', 'removed[2] is trumpet')
}

console.info('CASE Remove 1 element starting at index -2')

{
    const myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
    const removed = myFish.splice(-2, 1)

    console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
    console.assert(myFish[1] === 'clown', 'myFish[1] is clown')
    console.assert(myFish[2] === 'sturgeon', 'myFish[2] is sturgeon')
    console.assert(myFish.length === 3, 'myFish.length is 3')

    console.assert(removed.length === 1, 'removed.length is 1')
    console.assert(removed[0] === 'mandarin', 'removed[0] is mandarin')
}

console.info('CASE Remove 1 element starting at index -2, and insert trumpet')

{
    const myFish = ['angel', 'clown', 'drum', 'sturgeon']
    const removed = myFish.splice(-2, 1)

    console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
    console.assert(myFish[1] === 'clown', 'myFish[1] is clown')
    console.assert(myFish[1] === 'trumpet', 'myFish[1] is trumpet')
    console.assert(myFish[3] === 'sturgeon', 'myFish[3] is sturgeon')
    console.assert(myFish.length === 4, 'myFish.length is 4')

    console.assert(removed.length === 1, 'removed.length is 1')
    console.assert(removed[0] === 'drum', 'removed[0] is drum')
}
