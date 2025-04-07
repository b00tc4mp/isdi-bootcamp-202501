const express = require('express') // importamos express

const api = express() // inicializamos la aplicación, creamos una instancia de la aplicación para manejar rutas, peticiones y respuestas

const PORT = 8080 // especificamos que nuestro servidor trabajara con el puerto 8080

const users = [ // declaramos variable users para trabajar con ello
    { name: "Marc", age: 25 },
    { name: "Sots", age: 26 }
]

api.use(express.json()) // Aquí usamos el middleware de Express llamado express.json(). Este middleware permite que Express pueda interpretar los cuerpos de las solicitudes (requests) que estén en formato JSON. Esto es necesario para manejar datos que vienen desde un formulario o cliente que envía JSON.


api.get('/buscar', (req, res) => {
    const nombre = req.query.nombre  // Accedemos al parámetro de consulta 'nombre'
    const edad = req.query.edad      // Accedemos al parámetro de consulta 'edad'
    res.send(`Buscando a: ${nombre}, Edad: ${edad}`)
})

api.get('/users', (req, res) => { // get con el endpoint /users, req es lo que le pedimos al server, res es lo que recibimos 
    res.json(users)
})

api.post('/add-user', (req, res) => { // endpoint = api.post('/add-user'
    const { name, age } = req.body

    if(!name || !age) {
        return res.status(400).json({ error: 'Faltan datos' })
    }

    const newUser = { name, age };
    users.push(newUser); // Agregar al array

    res.json({ message: 'Usuario agregado', user: newUser });
})

api.listen(PORT, () => console.log(`API running on port ${PORT}`)) // la api 
