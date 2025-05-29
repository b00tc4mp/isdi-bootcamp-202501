import { Router } from "express";
import { logic } from "../logic/index.js";
import {
  authHandler,
  withErrorHandling,
  jsonBodyParse,
} from "../handlers/index.js";

export const postsRouter = Router(); //==> Creo el router de posts

// Ruta para obtener los posts
postsRouter.get(
  "/",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req; //==> Obtengo el id del usuario de la request que fue agregado en el middleware de autenticacion

    return logic.getPosts(userId).then((posts) => res.json(posts));
  })
);

// Ruta para crear un post
postsRouter.post(
  "/",
  jsonBodyParse,
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req; //==> Obtengo el id del usuario de la request que fue agregado en el middleware de autenticacion

    const { image, title } = req.body;

    return logic.createPost(userId, image, title).then(() => {
      res.status(201).send();
    });
  })
);

// Ruta para modificar un post
postsRouter.patch(
  "/:postId/title",
  jsonBodyParse,
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req;

    const { postId } = req.params;

    const { title } = req.body;

    return logic.modifyPost(userId, postId, title).then(() => {
      res.status(204).send();
    });
  })
);
//Ruta para los likes
postsRouter.patch(
  "/:postId/likes",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req;
    const { postId } = req.params;

    return logic.toggleLikePost(userId, postId).then(() => {
      res.status(204).send();
    });
  })
);

// Ruta para eliminar un post
postsRouter.delete(
  "/:postId",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req;
    const { postId } = req.params;

    return logic.deletePost(userId, postId).then(() => {
      res.status(204).send();
    });
  })
);
