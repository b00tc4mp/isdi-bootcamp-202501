// 1
//Forma rápida de crear una promesa:
//para mostrarlo por la terminal: node staff/berta-asensio/playground/promises-demos/main.js
/*
Promise.resolve(10)
    .then(value => Promise.resolve(value + 10))
    .then(value => new Promise((resolve, reject) => reject(value + 10)))
    .catch(error => console.error(error))
*/
/*
OUTPUT: 30
-La primera promesa al ser resolve passará al then 1.
-El then 1 crea una nueva promesa que suma el valor más 10.
-Pasará al then 2 y crea una nueva promesa que se rejecta con el valor + 10
-Al rejectarse se irá al catch, que imprimirá el error, que será igual al valor total (30).
*/

//2
/*
Promise.resolve(10)
    .then(value => Promise.resolve(value + 10))
    .then(value => new Promise((resolve, reject) => reject(value + 10)))
    .catch(error => {
        console.error('E', error)
        
        return Promise.resolve(error + 10)
        .then(value => Promise.reject(value + 10))
        .then(value => new Promise((resolve, reject) => reject(value + 10)))
    })
    .then(value => Promise.resolve(value + 10)
        .then(value => Promise.resolve(value + 10))
        .then(value => new Promise((resolve, reject) => resolve(value + 10))))
    .catch(error => {console.error('E', error)
    })
    .then(value => console.log(value))
*/
/*
OUTPUT:
    E30
    E50
    -La primera promesa se resuelve (valor 10)
    -Se pasa al primer then que le suma 10 al valor (20)
    -Se pasa al segunfo then que crea una nueva promesa REJECT y le suma 10 al valor (30)
    -Pasamos al primer catch que imprime E y el valor (30).
    -Se devuelve una nueva promesa que se resuelve con el valor de error (30) + 10 -> 40.
    -Pasamos al siguiente then (dentro de return), que crea una promesa reject con el valor + 10 (50).
    -Al ser reject la promesa anterior, nos saltamos todos los siguientes then para ir a parar al siguiente
    catch. Este catch imprime E y el valor de error = E 50.

*/

// 3
Promise.resolve(10)
    .then(value => Promise.resolve(value + 10))
    .then(value => new Promise((resolve, reject) => reject(value + 10)))
    .catch(error => {
        console.error('E', error)
        
        return Promise.resolve(error + 10)
        .then(value => Promise.reject(value + 10))
        .then(value => new Promise((resolve, reject) => reject(value + 10)))
    })
    .then(value => Promise.resolve(value + 10)
        .then(value => Promise.resolve(value + 10))
        .then(value => new Promise((resolve, reject) => resolve(value + 10))))
    .catch(error => {
        console.error('E', error)

        return error + 10
    })
    .then(value => {
        console.log(value)
        /*el promise.all permite que las dos promesas principales se ejecuten a la vez. Que la primera espere a la segunda. 
        Las dos ramas se ejecutaran por separado. Y es o todo o nada. Si hubiera un reject entre medio se pararía ahi, no 
        entraría en la segunda rama.*/
        return Promise.all([
            Promise.resolve(value + 10)
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10)),
            Promise.resolve(value + 10)
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => new Promise((resolve, reject) => resolve(value + 10)))
                .then(value => Promise.resolve(value + 10))
        ])
        .then(([value1, value2]) => {
            console.log(value1, value2)
        })
        .catch(error => console.error('E', error))
    })

    /*
    OUTPUT:
        E30
        E50
        60
        110 130
    */
