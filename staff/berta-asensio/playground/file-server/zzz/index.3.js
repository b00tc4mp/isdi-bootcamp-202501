// SERVER CREADO CON EXPRESS

//creamos una constante llamada express y requerimos el modulo express
const express = require('express')

//La constante app es nuestro server
const app = express()


/*La función sendFile ya está hecha y  nos sirve para poder leer un archivo.
Le pudo que lea la carpeta static y que envie el archivo index.html
En esta función por eso, debo pasarle otro parámetro para que sepa de donde viene
ese archivo asi que le marcamos el root __dirname(que ya viene con el node y 
significa todo el recorrido que hace el archivo hasta mi proyecto) */
app.get('/', (req, res) => {
    res.sendFile('./static/index.html', {
        root: __dirname
    })
})

//Desde app, quiero que escuches el puerto 3000
app.listen(3000)
console.log(`Server on port ${3000}`)









