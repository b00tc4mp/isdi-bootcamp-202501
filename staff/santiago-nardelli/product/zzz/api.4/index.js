import "dotenv/config";
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

const { JWT_SECRET, PORT, URL_MONGO, DB_NAME} = process.env; //==> Variables de entorno que se utilizan en el proyecto para configurar la API

const withErrorHandling = (callback) => {
  return (req, res, next) => {
    try {
      callback(req, res).catch((error) => {
        next(error);
      });
    } catch (error) {
      next(error);
    }
  };
}; //==> Funcion que recibe un callback y retorna un nuevo callback que maneja los errores que se puedan producir en el callback original y los pasa al siguiente middleware que maneja errores (errorHandler) para que este construya la respuesta de error en base al error que se recibe como parametro en la funcion errorHandler y la envie al cliente que realizo la peticion a la API 
/**
 * Ventajas:

Centraliza el manejo de errores.
Reduce la duplicación de código en las rutas.
Permite manejar tanto errores síncronos como asíncronos de manera uniforme.
 */

data
  .connect(URL_MONGO, DB_NAME) //==> Conecto a la base de datos
  .catch(console.error)
  .then(() => {
    const api = express(); //==> Creo la API
    const jsonBodyParse = json(); //==> Middleware que parsea el body de las peticiones a JSON

    api.use(cors()); //==> Middleware que permite que se pueda acceder a la API desde cualquier origen

    // Ruta para obtener los posts
    api.get(
      "/posts",
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getPosts(userId).then((posts) => res.json(posts));
      })
    );

    //Ruta para obtener User Name
    api.get(
      "/users/self/name",
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;
        const token = authorization.slice(7);
        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        return logic.getUserName(userId).then((name) => {
          res.json({ name });
        });
      })
    );

    // Ruta para autenticar usuarios
    api.post(
      "/users/auth",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { email, password } = req.body;

        return logic.authenticateUser(email, password).then((id) => {
          const token = jwt.sign({ sub: id }, JWT_SECRET);
          res.json({ token });
        });
      })
    );

    // Ruta para registrar usuarios
    api.post(
      "/user/register",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { name, email, password } = req.body;

        return logic.registerUser(name, email, password).then(() => {
          res.status(201).send();
        });
      })
    );

    // Ruta para crear un post
    api.post(
      "/posts",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { image, title } = req.body;

        return logic.createPost(userId, image, title).then(() => {
          res.status(201).send();
        });
      })
    );

    // Ruta para modificar un post
    api.patch(
      "/posts/:postId/title",
      jsonBodyParse,
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        const { title } = req.body;

        return logic.modifyPost(userId, postId, title).then(() => {
          res.status(204).send();
        });
      })
    );
    //Ruta para los likes
    api.patch(
      "/posts/:postId/likes",
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.toggleLikePost(userId, postId).then(() => {
          res.status(204).send();
        });
      })
    );

    // Ruta para eliminar un post
    api.delete(
      "/posts/:postId",
      withErrorHandling((req, res) => {
        const { authorization } = req.headers;

        const token = authorization.slice(7);

        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { postId } = req.params;

        return logic.deletePost(userId, postId).then(() => {
          res.status(204).send();
        });
      })
    );
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
    }; //==> Funcion que construye la respuesta de error en base al error que se recibe como parametro en la funcion errorHandler

    // Middleware para manejar errores (middleware de error creado por nosotros)
    api.use(errorHandler);

    api.listen(PORT, () => {
      console.log(`Example api listening on port ${PORT}`);
    });
  });
