// includes por dentro


Array.prototype.myIncludes = function (element, fromIndex) {
    if(!fromIndex) fromIndex = 0
    if(fromIndex < 0) fromIndex = this.length + fromIndex 

    for (; fromIndex < this.length; fromIndex++) {
        if(this[fromIndex] === element) return true
    }
    return false

}

var colors = ['blue', 'green', 'black', 'white']

colors.myIncludes('green')
//true

colors.myIncludes('green', 2) // false: porque va a buscar green a partir del indice 2

colors.myIncludes('green', -5) // devuelve true: porque this.length = 4, fromIndex = -5 -> 4-5 = -1, empezamos desde -1 y vamos incrementando posiciones, en la 1 encontrará green.

