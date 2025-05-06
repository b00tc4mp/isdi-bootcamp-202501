delete Array.prototype.push

Array.prototype.push = function () {
    for (let i = 0; i < arguments.length; i++)
        this[this.length] = arguments[i]

    return this.length
}

// adds elements to the end of an array
// returns length of new array

const pets = ['dog', 'cat', 'rabbit'];

const count = pets.push('parrot');
console.log(count);
// Expected output: 4
console.log(pets);
// Expected output: Array ['dog', 'cat', 'rabbit', 'parrot']

pets.push('snake', 'spider');
console.log(pets);
// Expected output: Array ['dog', 'cat', 'rabbit', 'parrot', 'snake', 'spider']