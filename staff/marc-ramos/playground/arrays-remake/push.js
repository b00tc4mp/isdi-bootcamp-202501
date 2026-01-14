delete Array.prototype.push //eliminamos el metodo push

Array.prototype.push = function(arguments) { //creamos el metodo .push 
    for (let i = 0; i < arguments.length; i++) { // iteramos sobre la length de arguments
        this[this.length] = arguments[i] // añadimos los arguments al final del array

        return this.length
    }
}

var array = [1, 2]
array.push(3, 4)

// Array [1, 2, 3, 4]

const arrayLike = {
    length: 3,
    unrelated: "foo",
    2: 4,
  }

Array.prototype.push.call(arrayLike, 1, 2)
  console.log(arrayLike)

  // { '2': 4, '3': 1, '4': 2, length: 5, unrelated: 'foo' }

//------------------------------------------------------------------
  
delete Array.prototype.push

Array.prototype.push = function (element) {
    this[this.length] = element

    return this.length
}

const characters = ['a', 'b']

const length = characters.push('c')
console.log(length)
// 3
console.log(characters)
// [a,b,c]