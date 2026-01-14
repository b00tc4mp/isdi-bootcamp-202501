//  join

/*
-El método JOIN() une los elementos de un arreglo en una sola cadena de texto, 
separándolos por un delimitador específico que nosotros elijamos (por defecto, 
será una coma sin espacio).
-No modifica el arreglo original, simplemente devuelve una cadena.
-Sintaxis:
array.join(separador)
*/

//Ejemplo sin añadir separador
{
let frutas = ['manzana', 'pera', 'plátano']

let resultado = frutas.join()
console.log(resultado)  // 'manzana,pera,plátano'
}

//Ejemplo con separador
{
let frutas = ['manzana', 'pera', 'plátano']

let resultado = frutas.join(' - ')
console.log(resultado) // 'manzana - pera - plátano'
}


