delete Array.prototype.pop

Array.prototype.pop = function () {
    const lastElement = this[this.length - 1]

    this.length = this.length - 1

    return lastElement
}

// removes the last element from an array
// return deleted element

const vegetables = ['tomato', 'potato', 'carrot', 'eggplant', 'onion'];

console.log(vegetables.pop());
// Expected output: 'onion'

console.log(vegetables);
// Expected output: Array ['tomato', 'potato', 'carrot', 'eggplant']

vegetables.pop();

console.log(vegetables);
// Expected output: Array ['tomato', 'potato', 'carrot']