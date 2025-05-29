import "dotenv/config";
import express from "express";
import cors from "cors";

import { data } from "./data/index.js";
import {  errorHandler } from "./handlers/index.js";
import { usersRouter, postsRouter } from "./routes/index.js";

const {  PORT, URL_MONGO, DB_NAME } = process.env; 

data
  .connect(URL_MONGO, DB_NAME) //==> Conecto a la base de datos
  .catch(console.error)//==> Si hay un error al conectar a la base de datos, lo muestro por consola
  .then(() => {
    const api = express(); //==> Creo la API
   
    api.use(cors()); //==> Middleware que permite que se pueda acceder a la API desde cualquier origen

    api.use('/user', usersRouter); //==> Middleware que permite acceder a las rutas de usuarios

    api.use('/posts', postsRouter); //==> Middleware que permite acceder a las rutas de posts
    
    api.use(errorHandler);//==> Middleware que maneja los errores de la API

    api.listen(PORT, () => {
      console.log(`Example api listening on port ${PORT}`);
    });//==> Inicio el servidor en el puerto que tengo en las variables de entorno (PORT)
  });
