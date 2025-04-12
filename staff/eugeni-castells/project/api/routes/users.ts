import { Router } from "express";
import { jsonBodyParser } from "../middlewares/jsonBodyParser";
import { registerUserSchema, userAuthSchema } from "../data/schemas/zodSchemas";
import { registerUserHandler } from "../handlers/registerUserHandler";
import { validationHandler } from "../middlewares/validationHandler";

export const userRouter = Router();

userRouter.post(
  "/",
  jsonBodyParser,
  validationHandler(registerUserSchema),
  registerUserHandler
);

userRouter.post("/", jsonBodyParser, validationHandler(userAuthSchema));
