delete Array.prototype.indexOf

Array.prototype.indexOf = function (element, index) {
    let startIndex
    let elementIndex

    if (index)
        startIndex = index > -1 ? index : this.length + index
    else
        startIndex = 0

    for (let i = startIndex; i < this.length && !elementIndex; i++) {
        if (element === this[i])
            elementIndex = i
    }

    if (!elementIndex)
        elementIndex = -1
    return elementIndex
}

// search for the first index of an element
// returns the index or -1 if it doesn't exist
// in second position can include an index to start from

const animals = ["ant", "bison", "camel", "duck", "bison"];

console.log(animals.indexOf("bison"));
// Expected output: 1

// Start from index 2
console.log(animals.indexOf("bison", 2));
// Expected output: 4

console.log(animals.indexOf("giraffe"));
// Expected output: -1

console.log(animals.indexOf("bison", -2))