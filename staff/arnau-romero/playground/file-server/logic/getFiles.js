const fs = require('fs'); // Importamos el modulo de node JS para trabajar con archivos del sistema

const getFiles = () => {
    const json = fs.readFileSync('data/files.json', 'utf8'); // Traemos los archivos de la ruta data/files.json

    const files = JSON.parse(json); // Lo convertimos en un objeto

    return files; // Retornamos el objeto
}

module.exports = getFiles;