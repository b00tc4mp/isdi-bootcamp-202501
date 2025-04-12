import { Router } from "express";
import { jsonBodyParser } from "../middlewares/jsonBodyParser";
import {
  registerUserSchema,
  userAuthSchema,
  registerVanSchema,
} from "../data/schemas/zodSchemas";
import { registerUserHandler } from "../handlers/registerUserHandler";
import { validationHandler } from "../middlewares/validationHandler";
import { registerVanHandler } from "../handlers/registerVanHandler";
import { getUserUsernameHandler } from "../handlers/getUserUsernameHandler";

export const userRouter = Router();

userRouter.post(
  "/",
  jsonBodyParser,
  validationHandler(registerUserSchema),
  registerUserHandler
);

userRouter.post(
  "/van",
  //authHandler,
  jsonBodyParser,
  validationHandler(registerVanSchema),
  registerVanHandler
);

userRouter.post("/auth", jsonBodyParser, validationHandler(userAuthSchema));

userRouter.get(
  "/self/username",
  jsonBodyParser,
  //authHandler,
  getUserUsernameHandler
);
