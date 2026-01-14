// implementación PUSH

// 1. CASE add multiple elements

Array.prototype.push = function (...elementos) {
    
    for (let i = 0; i < elementos.length; i++) {
         this[this.length] = elementos[i]
    }
    return this.length 
  }

















  /*
-function(...elementos): función anónima que usa el operador de propagación para almacenar tantos
números de argumentos como queramos y almacenarlos en el parámetro elementos. Asi que elementos será un arreglo
con todos los elementos que pasemos al método push.
-bucle for: recorremos elementos, el cual contiene todos los argumentos pasados a push. De ésta manera podremos 
agregar de forma individual cada elemento al array.
-this[this.length]: this.length nos da la longitud actual del array, es decir, el índice donde se debe agregar 
el nuevo elemento.  Si el arreglo tiene 3 elementos, this.length será 3 por lo que el siguiente elemento irá en el índice 3.
-elementos[i]: accedemos al elemento i del arreglo elementos, es decir, al nuevo elemento que quiero agregar.
-return: devolvemos el nuevo length
*/