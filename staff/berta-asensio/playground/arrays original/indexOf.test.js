// indexOf

/*
-IndexOf comprueba/encuentra el índice de la primera aparición de un elemento en un array.
-Toma un elemento como parámetro y cuando lo llama, devuelve su índice.
-En el caso que no lo encuentre, devuelve -1.
-Sensible a mayusculas y minúsculas.
-Sintaxis:
    array.indexOf(elemento, índice)

    -elemento: elemento a encontrar dentro del array.
    -índice (opcional): indica el índice por el que empezamos a buscar:
        -Por defecto es 0.
        -Si indice >= a la longitud del array, devuelve -1.
        -Si el valor es negativo, se toma restando posiciones desde el final
        del array.        
*/

//Ejemplo básico: 
{
    const frutas = ['manzana', 'kiwi', 'pera', 'plátano']

    console.log(frutas.indexOf('plátano'))  // 3
    
    console.log(frutas.indexOf('uva')) // -1 porque no existe
}


//Ejemplo usando el índice:
{
    const frutas = ['manzana', 'kiwi', 'pera', 'plátano']

    console.log(frutas.indexOf('kiwi', 1)) // 1 
    
    console.log(frutas.indexOf('kiwi', 2))  // -1 : no lo encuentra porque empieza a contar desde la posición 2
}

