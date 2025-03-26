delete Array.prototype.pop

Array.prototype.pop = function () {
    const element = this[this.length - 1]
    this.length -= 1
    return element

}

const characters = ['a', 'b', 'c', 'd', 'e']
const result = characters.pop()
console.log(characters, result)


const myFish = ["angel", "clown", "mandarin", "sturgeon"];

const popped = myFish.pop();

console.log(myFish); // ['angel', 'clown', 'mandarin' ]

console.log(popped); // 'sturgeon'