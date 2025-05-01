import { Router } from "express";
import { jsonBodyParser } from "../middlewares/jsonBodyParser";
import {
  registerUserSchema,
  userAuthSchema,
  registerVanSchema,
} from "../data/schemas/zodSchemas";
import { registerUserHandler } from "../handlers/registerUserHandler";
import { validationHandler } from "../middlewares/validationHandler";
import authHandler from "../middlewares/authHandler";
import { registerVanHandler } from "../handlers/registerVanHandler";
import { getUserNameHandler } from "../handlers/getUserNameHandler";
import { authenticateUserHandler } from "../handlers/authenticateUserHandler";
import { getUserExchangesHandler } from "../handlers/getUserExchangesHandler";
import { getChatsHandler } from "../handlers/getChatsHandler";

export const userRouter = Router();

userRouter.post(
  "/",
  jsonBodyParser,
  validationHandler(registerUserSchema),
  registerUserHandler
);

userRouter.post(
  "/van",
  authHandler,
  jsonBodyParser,
  validationHandler(registerVanSchema),
  registerVanHandler
);

userRouter.post(
  "/auth",
  jsonBodyParser,
  validationHandler(userAuthSchema),
  authenticateUserHandler
);

userRouter.get("/self/username", authHandler, getUserNameHandler);

userRouter.get("/self/trips", authHandler, getUserExchangesHandler);

userRouter.get("/chats", authHandler, getChatsHandler);
