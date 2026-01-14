// splice

/*
-El método splice() se utiliza para eliminar, reemplazar o agregar elementos de un array en una 
posición específica.
-SPLICE modifica el arreglo original y devuelve un nuevo array con los elementos eliminados (si hubo alguno).
-Sintaxis:
    array.splice(inicio, deleteCount, ...elements)
        -inicio: índice donde se comenzará a cambiar el array:
            -si es mayor que array.length, el inicio será la longitud del array.
            -si es negativo, empezará a contar desde el final.
        -deleteCount (opcional): número de elementos a eliminar.
            -si el número se omite o si es mayor que el número de elementos restantes desde start
            (arr.length - start), se eliminaran todos los elementos desde start hasta el final.
            -si es 0 o negativo, no se eliminará ningún elemento.
        -elementos(opcional): elementos que se agregarán al array desde start.
            -Si no se agrega ningun elemento, splice() solo eliminará elementos del array.
*/ 

//Ejemplo 1: eliminar 2 elementos empezando por i = 1 

{
    let frutas = ['manzana', 'banana', 'naranja', 'mango'];
    let eliminados = frutas.splice(1, 2);
    console.log(frutas);    // ['manzana', 'mango']
    console.log(eliminados); // ['banana', 'naranja']
}

//Ejemplo 2: agregar elementos. Desde la posición 1, se eliminan 0 elementos y se introducen 2.

{
    let frutas = ['manzana', 'banana', 'naranja'];
    frutas.splice(1, 0, 'kiwi', 'pera');
    console.log(frutas);    // ['manzana', 'kiwi', 'pera', 'banana', 'naranja']
}

//Ejemplo 3: reemplazar elementos. Desde la posición 1, eliminamos 1 elemento (banana) y agregamos 2.

{
    let frutas = ['manzana', 'banana', 'naranja'];
    frutas.splice(1, 1, 'fresa', 'mango');
    console.log(frutas);    // ['manzana', 'fresa', 'mango', 'naranja']
}