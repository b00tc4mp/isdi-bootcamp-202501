import { Router } from "express";
import { logic } from "../logic/index.js";
import {
  authHandler,
  jsonBodyParser,
  withErrorHandling,
} from "../handlers/index.js";
export const posts = Router();

posts.get("/", authHandler, jsonBodyParser, (req, res, next) => {
  withErrorHandling(next, () => {
    const { userId } = req;

    return logic.getPosts(userId).then((posts) => {
      res.status(200).json(posts).send();
    });
  });
});

posts.post(
  "/",
  authHandler,
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const { userId } = req;
    const { image, text } = req.body;

    return logic.addPost(userId, image, text).then(() => {
      res.status(201).send();
    });
  })
);

posts.delete(
  "/:postId",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req;

    const { postId } = req.params;

    return logic.deletePost(userId, postId).then(() => {
      res.status(202).send();
    });
  })
);

posts.patch(
  "/text/:id",
  authHandler,
  jsonBodyParser,
  withErrorHandling((req, res) => {
    const { userId } = req;

    const {
      params: { id },
      body: { text },
    } = req;

    return logic.updatePostText(userId, id, text).then(() => {
      res.status(200).send();
    });
  })
);

posts.patch(
  "/likes/:postId",
  authHandler,
  withErrorHandling((req, res) => {
    const { userId } = req;

    const { postId } = req.params;

    return logic.updatePostLikes(userId, postId).then(() => {
      res.status(204).send();
    });
  })
);
