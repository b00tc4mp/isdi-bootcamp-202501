// SERVER CREADO CON NODE

//creamos una constante llamada http y requerimos el modulo http
const http = require('http')

//importo el modulo file sistem de node y requiero ese modulo
const fs = require('fs')

/*
-Utilizando este modulo creamos una función utilizando createServer 
y le pasaremos una función flecha con req y res y vamos a devolver
un archivo html
-Creo un readstream con el modulo fs para poder leer nuestro 
archivo html y lo guardaremos todo en una constante llamada read
-A medida que vaya leyendo read, le paso una funcion pipe para que
responda al cliente, para que lo lleve todo a front
-Lo guardamos todo en una constante llamada server y este server
lo voy a tener escuchando en el puerto 3000.
-Con esto ya tenemos creado un servidor.
*/

const server = http.createServer((req, res) => {
    const read = fs.createReadStream('./static/index.html')
    read.pipe(res)
})

server.listen(3000)
console.log(`Server on port ${3000}`)



