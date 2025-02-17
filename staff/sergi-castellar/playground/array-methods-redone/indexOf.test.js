delete Array.prototype.indexOf

Array.prototype.indexOf = function (element, index) {
    let localIndex = 0
    if (index) {
        if (index > 0) {
            localIndex = index
        } else if (index < 0) {
            localIndex = this.length + index
        }
    }

    for (let i = localIndex; i < this.length; i++) {
        if (this[i] === element)
            return i
    }
    return -1
}

const characters = ['a', 'b', 'c', 'd', 'e']
const result = characters.indexOf('p')
console.log(result)

const array = [2, 9, 9];
console.log(
    array.indexOf(2), // 0
    array.indexOf(7), // -1
    array.indexOf(9, 2), // 2
    array.indexOf(2, -1), // -1
    array.indexOf(2, -3) // 0
)