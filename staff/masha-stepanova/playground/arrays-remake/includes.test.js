delete Array.prototype.includes

Array.prototype.includes = function (element, index) {
    let found = false
    let startIndex

    if (index)
        startIndex = index > -1 ? index : this.length + index
    else
        startIndex = 0

    for (let i = startIndex; i < this.length && !found; i++) {
        if (element === this[i])
            found = true
    }

    return found
}

// search the element in the array
// returns true or false

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

const pets = ["cat", "dog", "bat"];

console.log(pets.includes("cat"));
// Expected output: true

console.log(pets.includes("at"));
// Expected output: false