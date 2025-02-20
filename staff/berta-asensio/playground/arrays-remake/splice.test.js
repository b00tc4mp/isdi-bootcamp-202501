// splice
require('./splice.js')

console.info('TEST splice')


console.info('CASE Remove 1 element at index 2, and insert 1')

{
    const fruits = ['apple', 'banana', 'orange', 'mango'];
    const removed = fruits.splice(2, 1, 'pear');

    console.assert(fruits[0] === 'apple', 'fruits[0] is apple')
    console.assert(fruits[1] === 'banana', 'fruits[1] is banana')
    console.assert(fruits[2] === 'pear', 'fruits[2] is pear')
    console.assert(fruits[3] === 'mango', 'fruits[3] is mango')
    console.assert(fruits.length === 4, 'fruits.length is 4')

    console.assert(removed[0] === 'orange', 'removed[0] is orange')
    console.assert(removed.length === 1, 'removed.length is 1')
}

console.info('CASE Remove 2 elements at index 1, and insert 2 elements')

{
    const fruits = ['apple', 'banana', 'orange', 'mango'];
    const removed = fruits.splice(1, 2, 'pear', 'melon');

    console.assert(fruits[0] === 'apple', 'fruits[0] is apple')
    console.assert(fruits[1] === 'pear', 'fruits[1] is pear')
    console.assert(fruits[2] === 'melon', 'fruits[2] is melon')
    console.assert(fruits[3] === 'mango', 'fruits[3] is mango')

    console.assert(fruits.length === 4, 'fruits.length is 4')

    console.assert(removed[0] === 'banana', 'removed[0] is banana')
    console.assert(removed[1] === 'orange', 'removed[1] is orange')
    console.assert(removed.length === 2, 'removed.length is 2')
}







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
