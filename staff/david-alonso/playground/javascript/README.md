# javascript

![js logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png)

## Saludo
```sh
console.log("¡Hola, mundo!");
```
## Suma
```sh
const suma = 10 + 15 
```
## Multiplicar
```sh
var numbers = [2, 4, 6, 8]

function multipyByTwo (numbers) {
    var result = numbers.map(function(number) {
        return number * 2
    })
    return result
}

multipyByTwo(numbers)
```
## Longitud de cadena
```sh 
let NameLength = 0;
const Name = "Lovelace";

NameLength = Name.length;
```
## Push
```sh
let frutas = ["manzana", "banana", "cereza"];
frutas.push("naranja");
console.log(frutas); // ["manzana", "banana", "cereza", "naranja"]
```
## Arreglo
```sh
let arr = ["Pablo", "Lucas", "Juan",];
console.log(arr[0]); // Pablo
console.log(arr[2]); // Juan
```
## Map
```sh
let usuarios = [
  {firstName : "Susan", lastName: "Steward"},
  {firstName : "Daniel", lastName: "Longbottom"},
];

let nombresCompletos = usuarios.map(function(elemento) {
    return `${elemento.firstName} ${elemento.lastName}`;
});

console.log(nombresCompletos);
// ["Susan Steward", "Daniel Longbottom"]
```
## 
