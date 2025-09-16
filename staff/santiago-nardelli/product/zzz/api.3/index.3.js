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

const JWT_SECRET = "sergi te quiero"; //==> Clave secreta para firmar los JWT

const ErrorHandling = (callback) => {
  return (req, res, next) => {
    try {
      callback(req, res).catch((error) => {
        next(error);
      });
    } catch (error) {
      next(error);
    }
  };
}; //==> Funcion que maneja los errores

data
  .connect("mongodb://localhost:27017", "test") //==> Conecto a la base de datos
  .catch(console.error)
  .then(() => {
    const api = express(); //==> Creo la API

    const port = 3000; //==> Puerto en el que escucha la API

    const jsonBodyParse = json(); //==> Middleware que parsea el body de las peticiones a JSON

    api.use(cors()); //==> Middleware que permite que se pueda acceder a la API desde cualquier origen

    // Ruta para obtener los posts
    api.get("/posts", (req, res, next) => {
      handleManagerError(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getPosts(userId).then((posts) => res.json(posts));
      });
    });

    //Ruta para obtener User Name
    api.get("/users/self/name", (req, res, next) => {
      handleManagerError(next, () => {
        const { authorization } = req.headers;
        const token = authorization.slice(7);
        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getUserName(userId).then((name) => {
          res.json({ name });
        });
      });
    });

    // Ruta para autenticar usuarios
    api.post("/users/auth", jsonBodyParse, (req, res, next) => {
      handleManagerError(next, () => {
        const { email, password } = req.body;

        return logic.authenticateUser(email, password).then((id) => {
          const token = jwt.sign({ sub: id }, JWT_SECRET);
          res.json({ token });
        });
      });
    });

    // Ruta para registrar usuarios
    api.post("/user/register", jsonBodyParse, ErrorHandling((req, res) => {
      const { name, email, password } = req.body

      return logic.registerUser(name, email, password)
      .then(() => { res.status(201).send();});
    }))

    // Ruta para crear un post
    api.post("/posts", jsonBodyParse, (req, res, next) => {
      handleManagerError(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { image, title } = req.body;

        return logic.createPost(userId, image, title).then(() => {
          res.status(201).send();
        });
      });
    });
    // Ruta para modificar un post
    api.patch("/posts/:postId/title", jsonBodyParse, (req, res, next) => {
      handleManagerError(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        const { title } = req.body;

        return logic.modifyPost(userId, postId, title).then(() => {
          res.status(204).send();
        });
      });
    });
    //Ruta para los likes
    api.patch("/posts/:postId/likes", (req, res, next) => {
      handleManagerError(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.toggleLikePost(userId, postId).then(() => {
          res.status(204).send();
        });
      });
    });

    // Ruta para eliminar un post
    api.delete("/posts/:postId", (req, res, next) => {
      handleManagerError(next, () => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.deletePost(userId, postId).then(() => {
          res.status(204).send();
        });
      });
    });
    const errorHandler = (error, req, res, next) => {
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
    }; //==> Funcion que construye la respuesta de error

    // Middleware para manejar errores
    api.use(errorHandler);

    api.listen(port, () => {
      console.log(`Example api listening on port ${port}`);
    });
  });
/*Paso a paso de la implementación:

1. **Conexión a la base de datos**:
   - Se conecta a MongoDB utilizando `data.connect`.
   - Si ocurre un error durante la conexión, se captura con `.catch(console.error)`.

2. **Creación de la API**:
   - Se inicializa una instancia de Express (`const api = express()`).
   - Se configura el puerto en el que la API escuchará (`const port = 3000`).
   - Se agrega el middleware `cors` para permitir solicitudes desde cualquier origen.
   - Se agrega el middleware `jsonBodyParse` para parsear el cuerpo de las solicitudes en formato JSON.

3. **Uso de `handleManagerError`**:
   - `handleManagerError` encapsula la lógica de cada ruta y maneja los errores de manera centralizada.
   - Si ocurre un error dentro de la lógica de la ruta (ya sea síncrono o asíncrono), este se pasa al middleware de manejo de errores utilizando `next`.

4. **Rutas implementadas**:
   - **GET /posts**:
     - Obtiene los posts del usuario autenticado.
     - Extrae el token JWT del encabezado `Authorization` y verifica el `userId`.
     - Llama a `logic.getPosts` para obtener los posts y los devuelve como respuesta JSON.
   - **GET /users/self/name**:
     - Obtiene el nombre del usuario autenticado.
     - Extrae el token JWT, verifica el `userId` y llama a `logic.getUserName`.
     - Devuelve el nombre del usuario como respuesta JSON.
   - **POST /users/auth**:
     - Autentica al usuario con su email y contraseña.
     - Llama a `logic.authenticateUser` y genera un token JWT con el `userId` como `sub`.
     - Devuelve el token como respuesta JSON.
   - **POST /user/register**:
     - Registra un nuevo usuario.
     - Llama a `logic.registerUser` con los datos del usuario.
     - Devuelve un código de estado 201 si el registro es exitoso.
   - **POST /posts**:
     - Crea un nuevo post para el usuario autenticado.
     - Extrae el token JWT, verifica el `userId` y llama a `logic.createPost` con los datos del post.
     - Devuelve un código de estado 201 si el post se crea correctamente.
   - **PATCH /posts/:postId/title**:
     - Modifica el título de un post existente.
     - Extrae el token JWT, verifica el `userId` y llama a `logic.modifyPost` con el `postId` y el nuevo título.
     - Devuelve un código de estado 204 si la modificación es exitosa.
   - **PATCH /posts/:postId/likes**:
     - Alterna el "like" de un post (añade o elimina el like).
     - Extrae el token JWT, verifica el `userId` y llama a `logic.toggleLikePost` con el `postId`.
     - Devuelve un código de estado 204 si la operación es exitosa.
   - **DELETE /posts/:postId**:
     - Elimina un post del usuario autenticado.
     - Extrae el token JWT, verifica el `userId` y llama a `logic.deletePost` con el `postId`.
     - Devuelve un código de estado 204 si el post se elimina correctamente.

5. **Middleware de manejo de errores (`errorHandler`)**:
   - Captura cualquier error que ocurra en las rutas y construye una respuesta adecuada.
   - Determina el tipo de error (por ejemplo, `ValidateError`, `NotFoundError`, etc.) y asigna un código de estado HTTP correspondiente.
   - Devuelve una respuesta JSON con el nombre del error y un mensaje descriptivo.

6. **Inicio del servidor**:
   - La API comienza a escuchar en el puerto configurado (`port = 3000`).
   - Se imprime un mensaje en la consola indicando que la API está lista.

Resumen:
- `handleManagerError` centraliza el manejo de errores en las rutas.
- `errorHandler` se encarga de construir respuestas consistentes para los errores.
- Las rutas están organizadas para manejar diferentes operaciones relacionadas con usuarios y posts.
*/
