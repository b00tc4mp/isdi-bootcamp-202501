// removes the last element from an array
// return deleted element

delete Array.prototype.pop

Array.prototype.pop = function () {
 /* hay que acceder al ultimo elemento de un array, eliminarlo y retornalo.
*/
    let lastElement = this[this.length-1]
    this.length -= 1

  return lastElement
}
