# JS MANUAL

## MÉTODO **.MAP**
Herramienta para trabajar con arreglos sin modificar el arreglo original. Permite crear un nuevo arreglo a través de una función de transformación a cada elemento del arreglo

*Ejemplo:*

*Arreglo original*
```
const people = [
        {name: "Paula", age: 24},
        {name: "Marc", age: 39}
    ] 
``` 
*usamos .map para extraer sólo los nombres:*
```
    const newArray = people.map(newName=>newName.name) 
    console.log(newArray)
```

## FUNCIÓN FLECHA
Una función flecha se compone de: un paréntesis, una flecha y unas llaves
**() => {}**.
Hace falta almacenarlas dentro de una variable y ya no necesitan la palabra function ni return. 

```
let saludo2 = nombre 0> {Saludos " + nombre}
```

## MÉTODO JOIN()
Éste método se utiliza para unir elementos de un arreglo creando una cadena de texto. Se necesita un argumento para especificar el delimitador a utilizar para separar los elementos del arreglo en la cadena.

```
const arr = ["Hello", "World"]
const str = arr.join("  ")
```
**str** tendrá una cadena con valor Hello World.


