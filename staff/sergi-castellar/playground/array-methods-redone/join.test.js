delete Array.prototype.join

Array.prototype.join = function (symbol) {
    let separator
    if (!symbol && symbol !== '')
        separator = ','
    else
        separator = symbol

    let string = ''
    for (let i = 0; i < this.length; i++) {
        if (i !== this.length - 1)
            string += this[i] + separator
        else
            string += this[i]
    }
    return string
}

const characters = ['a', 'b', 'c', 'd', 'e']
const result = characters.join('')
console.log(result)

const a = ["Wind", "Water", "Fire"];
console.log(
    a.join(), // 'Wind,Water,Fire'
    a.join(", "), // 'Wind, Water, Fire'
    a.join(" + "), // 'Wind + Water + Fire'
    a.join("") // 'WindWaterFire'
)