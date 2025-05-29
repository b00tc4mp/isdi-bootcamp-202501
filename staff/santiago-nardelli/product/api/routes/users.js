  import { Router } from "express";
import { logic } from "../logic/index.js";
import { authHandler, withErrorHandling, jsonBodyParse } from "../handlers/index.js";
import 'dotenv/config';
import jwt from "jsonwebtoken"; 

const{ JWT_SECRET } = process.env; 


export const usersRouter = Router(); //==> Creo el router de usuarios

// Ruta para autenticar usuarios
usersRouter.post(
  "/auth",
  jsonBodyParse,
  withErrorHandling((req, res) => {
    const { email, password } = req.body;

    return logic.authenticateUser(email, password).then((id) => {
      const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: "1h" }); 
      res.json({ token });
    });
  })
); 

// Ruta para registrar usuarios
usersRouter.post(
  "/register",
  jsonBodyParse,
  withErrorHandling((req, res) => {
    const { name, email, password } = req.body;

    return logic.registerUser(name, email, password)
    .then(() => {
      res.status(201).send();
    });
  })
);

//Ruta para obtener User Name
usersRouter.get(
  "/self/username",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req; 

    return logic.getUserUsername(userId).then((username) => {
      res.json({ username });
    });
  })
);

// Ruta para obtener los posts de un usuario
usersRouter.get(
  "/:userSearchId/posts",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req; //==> Obtengo el id del usuario de la request que fue agregado en el middleware de autenticacion

    const { userSearchId } = req.params; //==> Obtengo el id del usuario que busco los posts

    return logic.getUserPosts(userId, userSearchId).then((posts) => res.json(posts));
  })
);
// Ruta para buscar usuarios por nombre
usersRouter.get(
  "/search/:query",
  authHandler,
  withErrorHandling((req, res) => {
    const { query } = req.params; //==> Obtengo el nombre del usuario que busco

    return logic.searchUsers(query).then((users) => res.json(users)); //==> Devuelvo los usuarios encontrados
  })
);
