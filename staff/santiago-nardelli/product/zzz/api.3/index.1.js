import express, { json } from "express";
import cors from "cors";
import { errors } from "com";
import jwt from "jsonwebtoken";

import { data } from "./data/index.js";
import { logic } from "./logic/index.js";

const {
  SystemError,
  ValidateError,
  CredentialsError,
  NotFoundError,
  OwnershipError,
  DuplicityError,
} = errors;

const JWT_SECRET = "sergi te quiero";


const errorResponse = (res,error) => {
  console.error(error);

  let status = 500;
  let errorName = SystemError.name;

  if (error instanceof ValidateError) {
    status = 400;
    errorName = error.constructor.name;
  } else if (error instanceof CredentialsError) {
    status = 401;
    errorName = error.constructor.name;
  } else if (error instanceof NotFoundError) {
    status = 404;
    errorName = error.constructor.name;
  } else if (error instanceof OwnershipError) {
    status = 403;
    errorName = error.constructor.name;
  } else if (error instanceof DuplicityError) {
    status = 409;
    errorName = error.constructor.name;
  }

  res.status(status).json({ error: errorName, message: error.message });
};//==> Funcion que construye la respuesta de error

const handleManagerError = (res, callback) => {
  try {
    callback().catch((error) => {
       errorResponse(res,error);
      
    });
  } catch (error) {
    errorResponse(res,error);
  }
};//==> Funcion que maneja los errores

data
  .connect("mongodb://localhost:27017", "test")//==> Conecto a la base de datos
  .catch(console.error)
  .then(() => {
    const api = express();//==> Creo la API

    const port = 3000;//==> Puerto en el que escucha la API

    
    const jsonBodyParse = json();//==> Middleware que parsea el body de las peticiones a JSON

    
    api.use(cors());//==> Middleware que permite que se pueda acceder a la API desde cualquier origen

    // Ruta para obtener los posts
    api.get("/posts", (req, res) => {
      handleManagerError(res, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getPosts(userId).then((posts) => res.json(posts));
      });
    });

    //Ruta para obtener User Name
    api.get("/users/self/name", (req, res) => {
      handleManagerError(res, () => {
        const { authorization } = req.headers;
        const token = authorization.slice(7);
        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getUserName(userId).then((name) => {
          res.json({ name });
        });
      });
    });

    // Ruta para autenticar usuarios
    api.post("/users/auth", jsonBodyParse, (req, res) => {
      handleManagerError(res, () => {
        const { email, password } = req.body;

        return logic.authenticateUser(email, password).then((id) => {
          const token = jwt.sign({ sub: id }, JWT_SECRET);
          res.json({ token });
        });
      });
    });

    // Ruta para registrar usuarios
    api.post("/user/register", jsonBodyParse, (req, res) => {
      handleManagerError(res, () => {
        const { name, email, password } = req.body;
        return logic.registerUser(name, email, password).then(() => {
          res.status(201).send();
        });
      });
    });
    // Ruta para crear un post
    api.post("/posts", jsonBodyParse, (req, res) => {
      handleManagerError(res,()=>{

        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { image, title } = req.body;

      return  logic
          .createPost(userId, image, title)
          .then(() => {
            res.status(201).send();
          })
      })
          
    });
    // Ruta para modificar un post
    api.patch("/posts/:postId/title", jsonBodyParse, (req, res) => {
      handleManagerError(res, ()=>{


        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        const { title } = req.body;

       return logic
          .modifyPost(userId, postId, title)
          .then(() => {
            res.status(204).send();
          })
      })
        
    });
    //Ruta para los likes
    api.patch("/posts/:postId/likes", (req, res) => {
      handleManagerError(res, ()=>{


        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

      return  logic
          .toggleLikePost(userId, postId)
          .then(() => {
            res.status(204).send();
          })
      })
          
    });

    // Ruta para eliminar un post
    api.delete("/posts/:postId", (req, res) => {
      handleManagerError(res,()=>{

        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

       return logic
          .deletePost(userId, postId)
          .then(() => {
            res.status(204).send();
          })

      })
          
    });

    api.listen(port, () => {
      console.log(`Example api listening on port ${port}`);
    });
  });
/**
 * Info sobre server express:
 * Qué es Express
Express es un framework para Node.js que te permite construir aplicaciones web y API de manera fácil y rápida. Básicamente, es una herramienta que simplifica la creación de un servidor en Node.js. Si piensas en Node.js como el motor que permite ejecutar código JavaScript en el servidor, Express es la capa adicional que hace que construir una API o un sitio web sea más organizado y eficiente.

2. Cómo funciona un servidor
Un servidor es como un "recepcionista" que recibe las solicitudes (solicitudes HTTP) de los usuarios (por ejemplo, cuando un navegador pide una página web) y devuelve una respuesta (como una página HTML, datos JSON, etc.).

Imagina el flujo de cómo funciona un servidor con Express:

Solicitud del cliente: Un usuario hace una solicitud, como acceder a una página web o enviar datos.
El servidor recibe la solicitud: Express recibe esa solicitud y decide qué hacer con ella (a dónde redirigirla o qué responder).
El servidor procesa la solicitud: Esto puede implicar hacer consultas a la base de datos, realizar operaciones o lógica en el servidor.
El servidor responde: Finalmente, el servidor responde con los datos o recursos solicitados, ya sea un archivo HTML, una API que devuelve datos JSON, o una redirección.

3. Rutas y Middleware en Express
Las rutas y los middleware son dos conceptos claves en Express.

Rutas: Son los puntos de entrada donde el servidor "escucha" las solicitudes. Por ejemplo:


api.get('/api/usuarios', (req, res) => {
    res.send('Lista de usuarios');
});
Aquí, cuando un usuario hace una solicitud GET a /api/usuarios, el servidor responderá con la lista de usuarios.

Middleware: Son funciones que se ejecutan durante el ciclo de vida de la solicitud, antes de llegar a la ruta final. Por ejemplo, puedes usar middleware para verificar si el usuario está autenticado antes de permitirle acceder a ciertas rutas:


app.use((req, res, next) => {
    console.log('Middleware ejecutado');
    next();  // Llama al siguiente middleware o ruta
});
4. Metodologías HTTP
Es importante comprender los métodos HTTP, que indican qué tipo de operación quieres realizar:

GET: Solicita información del servidor.
POST: Envía información al servidor para crear algo (por ejemplo, un nuevo usuario).
PUT: Actualiza un recurso existente.
DELETE: Elimina un recurso.

5. Trabajo con Base de Datos
En tu stack MERN, el servidor Express se conecta con MongoDB a través de una base de datos. Usualmente, esto se hace mediante un modelo de datos (por ejemplo, usando Mongoose) que te permite hacer operaciones sobre la base de datos (leer, escribir, actualizar, eliminar).

6. Estudiar con Práctica
La mejor manera de aprender a manejar un servidor es practicando. Te recomiendo seguir un tutorial básico de Express, y después intentar construir tus propias aplicaciones y APIs. Aquí te dejo una pequeña estructura básica de un servidor con Express:


const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para analizar JSON
app.use(express.json());

// Ruta simple
app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});

// Ruta con parámetros
app.get('/saludo/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.send(`¡Hola, ${nombre}!`);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
Este ejemplo tiene lo básico:

Crear una aplicación Express.
Definir rutas (como / y /saludo/:nombre).
Iniciar el servidor en un puerto específico.

7. Documentación y recursos
Aquí te dejo algunos recursos útiles que puedes consultar:

Documentación oficial de Express: https://expressjs.com/
Tutoriales en línea: Hay muchos tutoriales interactivos donde puedes practicar con Express.
Videos o cursos: Puedes buscar en plataformas como YouTube, Udemy, o freeCodeCamp.
8. Errores comunes
Es normal que al principio te encuentres con errores, como rutas mal definidas o problemas al hacer solicitudes a la base de datos. La clave es leer los mensajes de error con atención y, si no sabes qué significa algo, buscar en la documentación o en foros como Stack Overflow.

Resumen
En pocas palabras:

Express te ayuda a gestionar las solicitudes HTTP y crear servidores.
Las rutas son los puntos de entrada para las solicitudes.
Los middleware permiten hacer tareas adicionales antes de procesar una solicitud.
Práctica y documentación son esenciales para entender cómo funcionan los servidores.


=====================INFO SOBRE CURL=====================

curl es una herramienta de línea de comandos utilizada para transferir datos desde o hacia un servidor, utilizando uno de los muchos protocolos soportados (HTTP, HTTPS, FTP, etc.). Con curl, puedes realizar solicitudes HTTP para interactuar con APIs, descargar archivos, enviar datos a un servidor, entre otras acciones.

Por ejemplo, si estás utilizando curl para hacer una solicitud GET a una API, el comando podría verse así:

Este comando realiza una solicitud GET a la URL especificada y devuelve la respuesta del servidor.

Si necesitas enviar datos en una solicitud POST, podrías usar un comando como el siguiente:

En este caso, curl envía una solicitud POST a la URL especificada, con un cuerpo de datos en formato JSON.

curl es una herramienta muy poderosa y flexible, ampliamente utilizada en scripts y automatizaciones para interactuar con servicios web. Puedes encontrar más información y ejemplos en la documentación oficial de curl: https://curl.se/docs/

1. Hacer una solicitud GET a una URL:
curl http://example.com
Esto devolverá el contenido de la página http://example.com.

2. Hacer una solicitud POST con datos JSON:
curl -X POST -H "Content-Type: application/json" -d '{"name": "John"}' http://example.com/api/users
Esto enviará una solicitud POST con un objeto JSON a la URL http://example.com/api/users.

3. Hacer una solicitud con autenticación básica:
curl -u username:password http://example.com
Esto enviará una solicitud GET a la URL http://example.com con autenticación básica.

4. Guardar la respuesta en un archivo:
curl http://example.com -o output.txt
Esto guardará la respuesta de la solicitud GET en un archivo llamado output.txt.

5. Ver información detallada de la solicitud:
curl -v http://example.com
Esto mostrará información detallada de la solicitud y la respuesta.




 */
