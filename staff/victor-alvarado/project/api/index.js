import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Habilitar CORS
app.use(cors());

// Definir una ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});