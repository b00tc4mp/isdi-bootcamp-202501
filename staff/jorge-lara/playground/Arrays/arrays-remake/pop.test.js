require('./pop.js');

console.info('TEST pop');

console.info('CASE: Removing last element from array');

{
    const arr = [1, 2, 3];
    const popped = arr.pop();

    console.assert(popped === 3, 'arr.pop() should return 3');
    console.assert(arr.length === 2, 'arr.length should be 2 after pop');
    console.assert(arr[0] === 1 && arr[1] === 2, 'Remaining elements should be [1, 2]');
}

console.info('CASE: Removing last element until array is empty');

{
    const arr = ['a', 'b'];
    arr.pop();
    arr.pop();

    console.assert(arr.length === 0, 'arr.length should be 0 after popping all elements');
}

console.info('CASE: Popping from an empty array');

{
    const arr = [];
    const popped = arr.pop();

    console.assert(popped === undefined, 'arr.pop() on an empty array should return undefined');
    console.assert(arr.length === 0, 'arr.length should remain 0 when popping an empty array');
}
