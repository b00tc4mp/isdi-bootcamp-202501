require('./pop')

console.info('TEST pop')

console.info('CASE 1: pop() empty array return undefined')
{
    const emptyArray = []
    const returnedelement = emptyArray.pop()
    console.assert(returnedelement === undefined, 'empty array return undefined')
}


console.info('CASE 2: Removing te last element of an array')
{
    const myFish = ["angel", "clown", "mandarin", "sturgeon"]

    const popped = myFish.pop()

    console.assert(myFish.length === 3, 'myFish.length is 3')
    console.assert(myFish[0] === "angel", 'myFish[0] is angel')
    console.assert(myFish[1] === "clown", 'myFish[1] is clown')
    console.assert(myFish[2] === "mandarin", 'myFish[2] is mandarin')
    console.assert(popped === 'sturgeon', "element popped is sturgeon")
}


console.info('CASE 3: Calling pop() on non-array objects')
/*
{
    const arrayLike = {
        length: 3,
        unrelated: "foo",
        2: 4,
    };
    console.log(Array.prototype.pop.call(arrayLike));
    // 4
    console.log(arrayLike);
    // { length: 2, unrelated: 'foo' }

    const plainObj = {};
    // There's no length property, so the length is 0
    Array.prototype.pop.call(plainObj);
    console.log(plainObj);
    // { length: 0 }
}
*/


console.info('CASE 4: Using an object in an array-like fashion')
/*
{
    const collection = {
        length: 0,
        addElements(...elements) {
            // obj.length will be incremented automatically
            // every time an element is added.

            // Returning what push returns; that is
            // the new value of length property.
            return [].push.call(this, ...elements)
        },
        removeElement() {
            // obj.length will be decremented automatically
            // every time an element is removed.

            // Returning what pop returns that is
            // the removed element.
            return [].pop.call(this)
        },
    }

    collection.addElements(10, 20, 30)
    console.assert(collection.length === 3) // 3
    let newCollection = collection.removeElement()
    console.log(newCollection) // 2
}
*/