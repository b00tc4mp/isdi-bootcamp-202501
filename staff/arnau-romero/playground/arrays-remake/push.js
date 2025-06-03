
Array.prototype.push = function (element) {
/* hay que iterar un array y añadir un elemento al final de este
   retornar el muevo length del array
*/
    for (let i = 0 ; i < arguments.length ; i++ ){ //arguments son los argumentos que pasemos a la funcion
        const currentElement = arguments[i]
        this[this.length] = currentElement //this apuntara al array en el cual estamos aplicando el metodo. 
        // array[5] = al argumento, el length siempre es uno mas que la posicion asi que nos lo assignara al final
      
        return this.length // devolvemos el length final igual que el metodo push
    }

}