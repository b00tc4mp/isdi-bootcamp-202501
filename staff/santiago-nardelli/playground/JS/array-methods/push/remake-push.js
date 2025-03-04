Array.prototype.push = function (){
    // los arguments son un objeto similar a un array correspondiente a los argumentos pasados a una función, en este caso son los que me pasen por parametro para agregar al array, aqui los recorro y los agrego al array
    for (let i = 0; i < arguments.length; i++) {
        // this.length me da la longuitud del array y le agrego los argumentos que me pasaron por parametro para agregar al array 
        this[this.length] = arguments[i];
    }
    // retorno la longuitud del array
    return this.length;
    
}



const numbers = [1, 2, 3, 4, 5];

// Llamo a mi método push para agregar elementos al array
numbers.push(6, 7, 8);

// Imprimo el array modificado en la consola
console.log(numbers); 

